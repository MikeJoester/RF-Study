import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import {
  getDevicesInfo,
} from "@/API"
import {
  ModalCreateDevice,
  ModalUpdateDevice,
  ModalDeleteDevice,
} from "@/widgets/popup";

export function Devices() {
  const [showModal, setShowModal] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [devices, setDevicesData] = useState(null);
  const [itemId, setItemId] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDevicesInfo();
        setDevicesData(data);
      } catch (e) {
        console.error('Error fetching user data:', e);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleShowDeleteModal = (id, event) => {
    if (event) event.stopPropagation();
    if(id) {
      setItemId(id)
    }
    setShowDeleted(!showDeleted)
  }

  const handleShowUpdateModal = (id, event) => {
    if (event) event.stopPropagation();
    if(id) {
      setItemId(id)
    }
    setShowUpdate(!showUpdate)
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Devices
          </Typography>
        </CardHeader>
        <div className="flex left-0 p-6">
          <button id="defaultModalButton" onClick={toggleModal} data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="button">
            Add New Devices
          </button>
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID", "Name Devices", "Major", "Device UID", "Device Mode", "Actions"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-6 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
                {devices.map(
                  ({_id, device_name, department, device_mode, device_uid }, key) => {
                    const className = `py-3 px-5 ${
                      key === devices.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
                    return (
                        <tr key={_id}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {key + 1}
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {device_name}
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {department}
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {device_uid}
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {device_mode ? 'Normal Class' : 'Exam'}
                            </div>
                          </td>
                          <td className="flex space-x-3 mt-1">
                            <button onClick={(e) => handleShowUpdateModal(_id, e)} className="flex p-2 bg-green-500 rounded-xl hover:rounded-3xl hover:bg-green-600 transition-all duration-300 text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button onClick={(e) => handleShowDeleteModal(_id, e)} className="flex p-2 bg-red-400 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex items-center text-white-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                    );
                  }
                )}
              </tbody>
          </table>
        </CardBody>
      </Card>
      {showModal && (
        <ModalCreateDevice onClose={toggleModal} />
      )}
      {showUpdate && (
        <ModalUpdateDevice onClose={handleShowUpdateModal} itemId={itemId}/>
      )}
      {showDeleted && (
        <ModalDeleteDevice onClose={handleShowDeleteModal} itemId={itemId}/>
      )}
    </div>
  );
}

export default Devices;
