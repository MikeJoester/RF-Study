import React, { useState, useEffect} from 'react'
import {
    getUserInfo,
    updateUser,
  } from "@/API"

export function ModalUpdateStd ({ onClose, itemId }) {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [serial, setSerial] = useState('');
    const [cardId, setCardId] = useState('');
    const [device_uid, setDevice_uid] = useState('');
    const [error, setError] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getUserInfo(itemId);
            setName(data.name);
            setDepartment(data.department);
            setSerial(data.serial);
            setCardId(data.cardId);
            setDevice_uid(data.device_uid);
          } catch (e) {
            console.error('Error fetching user data:', e);
          }
          finally {
            setIsLoading(false);
          }
        };
        fetchData();
    }, [itemId]);
    
    const handleUpdateUser  = async (e) => {
        e.preventDefault();
        const formData = {
            "name" : name,
            "serial" : serial,
            "cardId" :  cardId,
            "device_uid" : device_uid,
            "department" : department,
        }
        try {
            console.log(formData);
            await updateUser(formData, itemId);
            window.location.reload( true )
            onClose()
        } catch (err) {
            setError(true)
            console.error('Error creating user:', error);
        }
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
        <>
            <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-filter backdrop-blur-sm z-40">
                <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto absolute flex z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
                    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Update Student
                                </h3>
                                <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form onSubmit={handleUpdateUser}>
                                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student name <span className="text-red-500">*</span></label>
                                        <input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Enter full name" required/>                   
                                    </div>
                                    <div>
                                        <label htmlFor="major" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Major <span className="text-red-500">*</span></label>
                                        <input 
                                            type="text"
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                            name="major"
                                            id="major"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Enter major" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="serial"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Serial Number <span className="text-red-500">*</span></label>
                                        <input 
                                            type="number"
                                            value={serial}
                                            onChange={(e) => setSerial(e.target.value)}
                                            name="serial"
                                            id="serial"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Serial Number" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="cardId"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Card Id <span className="text-red-500">*</span></label>
                                        <input 
                                            type="number"
                                            value={cardId}
                                            onChange={(e) => setCardId(e.target.value)}
                                            name="cardId"
                                            id="cardId"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Card Id" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="device_uid"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Device UID <span className="text-red-500">*</span></label>
                                        <input 
                                            type="number"
                                            value={device_uid}
                                            onChange={(e) => setDevice_uid(e.target.value)}
                                            name="device_uid"
                                            id="device_uid"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Device UID" required/>
                                    </div>
                                    
                                </div>
                                {error ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-medium">ERROR!</span> Please fill in completely.
                                </div> : ''}
                                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalUpdateStd