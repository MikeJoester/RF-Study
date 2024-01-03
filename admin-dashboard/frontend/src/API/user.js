const rootUrl = "https://rfstudy.onrender.com";

async function getUserInfo(id) {
  try {
    let response;
    if (id) {
      response = await fetch(`${rootUrl}/api/std/${id}`)
    } else {
      response = await fetch(`${rootUrl}/api/std`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('Error in getUserInfo: ', e.message);
  }
}

async function createUser(formData) {
  try {
    const response = await fetch(`${rootUrl}/api/std/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    console.log('Create success');
    return response.json();
  } catch (e) {
    console.error('Error in createUser: ', e.message);
  }
}

async function updateUser(formData, id) {
  try {
    const response = await fetch(`${rootUrl}/api/std/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    console.log('>> response update: ', formData)
    return response.json();
  } catch (e) {
    console.error('Error in updateUser: ', e.message);
  }
}

async function deleteUser(id) {
  try {
    const response = await fetch(`${rootUrl}/api/std/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('> delete user success')
    return response
  } catch (e) {
    console.log('failed to delete')
  }
}

async function getLogUser(id) {
  try {
    const response = await fetch(`${rootUrl}/api/std/${id}/logs`)
    const logs = await response.json();

    const offsetHours = 7;
    return logs.map(log => {

      const checkinDate = new Date(log.checkinDate);
      checkinDate.setHours(checkinDate.getHours() + offsetHours);
      const formattedCheckinDate = checkinDate.toISOString().replace('Z', '');

      const timein = adjustTime(log.timein, offsetHours, log.checkinDate);
      const timeout = adjustTime(log.timeout, offsetHours, log.checkinDate);

      return {
        ...log,
        checkinDate: formattedCheckinDate,
        timein,
        timeout
      };
    });
  } catch (e) {
    console.error('Error in getLogUser: ', e.message);
  }
}

function adjustTime(timeString, offsetHours, referenceDateISO) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  let referenceDate = new Date(referenceDateISO);
  let date = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate(), hours, minutes, seconds);
  date.setHours(date.getHours() + offsetHours);

  const formattedTime = [
    date.getHours().toString().padStart(2, '0'),
    date.getMinutes().toString().padStart(2, '0'),
    date.getSeconds().toString().padStart(2, '0')
  ].join(':');

  return formattedTime;
}

async function getDevicesInfo(id) {
  try {
    let response;
    if (id) {
      response = await fetch(`${rootUrl}/api/device/${id}`)
    } else {
      response = await fetch(`${rootUrl}/api/device`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('Error in getUserInfo: ', e.message);
  }
}

async function createDevice(formData) {
  try {
    const response = await fetch(`${rootUrl}/api/device/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    console.log('Create success');
    return response.json();
  } catch (e) {
    console.error('Error in createUser: ', e.message);
  }
}

async function updateDevice(formData, id) {
  try {
    const response = await fetch(`${rootUrl}/api/device/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    console.log('>> response update: ', formData)
    return response.json();
  } catch (e) {
    console.error('Error in updateUser: ', e.message);
  }
}

async function deleteDevice(id) {
  try {
    const response = await fetch(`${rootUrl}/api/device/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('> delete user success')
    return response
  } catch (e) {
    console.log('failed to delete')
  }
}

export {
  getUserInfo,
  createUser,
  updateUser,
  deleteUser,
  getLogUser,
  getDevicesInfo,
  createDevice,
  updateDevice,
  deleteDevice,
};