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

export {
  getUserInfo,
  createUser,
  updateUser,
  deleteUser
};