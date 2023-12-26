import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardBody,
  Input
} from "@material-tailwind/react";
import {
  ModalCreateStd,
  ModalDeleteUser,
  ModalUpdateStd,
  ModalLogUser
} from "@/widgets/popup";
import {
  getUserInfo,
} from "@/API"

export function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [userData, setUserData] = useState([]);
  const [itemId, setItemId] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo();
        setUserData(data);
      } catch (e) {
        console.error('Error fetching user data:', e);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUserData = userData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleShowLogModal = (id) => {
    if(id){
      setItemId(id)
    }
    setShowLog(!showLog);
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
    <div className="mt-2">
      <div className="flex justify-between">
          <button id="defaultModalButton" onClick={toggleModal} data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="button">
            Add New Student
          </button>
          <div className=" md:w-56">
          <Input label="Search" value={searchTerm} onChange={handleSearchChange}/>
          </div>
      </div>
      
           
       
      <div className="mb-4 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">    
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  {["ID", "Student name", "Major", "Card ID", "Device UID", "Actions"].map(
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
                {filteredUserData?.map(
                  ({_id, serial, name, cardId, department, device_uid }, key) => {
                    const className = `py-3 px-5 ${
                      key === userData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
                    return (
                        <tr key={_id} onClick={() => handleShowLogModal(_id)} className="hover:text-blue-600 cursor-pointer">
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {serial}
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {name}
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {department}
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {cardId}
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {device_uid}
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
      </div>
      {showModal && (
        <ModalCreateStd onClose={toggleModal} />
      )}
      {showLog && (
        <ModalLogUser onClose={handleShowLogModal} itemId={itemId}/>
      )}
      {showUpdate && (
        <ModalUpdateStd onClose={handleShowUpdateModal} itemId={itemId}/>
      )}
      {showDeleted && (
        <ModalDeleteUser onClose={handleShowDeleteModal} itemId={itemId}/>
      )}
    </div>
  );
}

export default Home;
