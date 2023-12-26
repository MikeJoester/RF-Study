import React, { useState } from 'react'
import {
    createDevice,
  } from "@/API"

export function ModalCreateDevice ({ onClose }) {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [deviceMode, setDeviceMode] = useState('');
    const [device_uid, setDevice_uid] = useState('');
    const [error, setError] = useState(false);

    const handleCreatDevice  = async (e) => {
        e.preventDefault();
        const formData = {
            "device_name" : name,
            "department" : department,
            "device_uid" : device_uid,
            "device_mode": deviceMode === 'normal' ? true : false,
        }
        try {
            console.log(formData);
            await createDevice(formData);
            window.location.reload( true )
            onClose()
        } catch (err) {
            setError(true)
            console.error('Error creating user:', error);
        }
    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-filter backdrop-blur-sm z-40">
                <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto absolute flex z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
                    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Add New Devices
                                </h3>
                                <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form onSubmit={handleCreatDevice}>
                                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Device name <span className="text-red-500">*</span></label>
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
                                    <div className="sm:col-span-2">
                                        <label htmlFor="device_mode"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Device Mode<span className="text-red-500">*</span></label>
                                        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input id="normal-class-radio" type="radio" onChange={() => setDeviceMode('normal')} value="normal" name="device_mode" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="normal-class-radio" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Normal Class</label>
                                        </div>
                                        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input id="exam-radio" type="radio" onChange={() => setDeviceMode('exam')} value="exam" name="device_mode" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="exam-radio" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Exam (Default)</label>
                                        </div>
                                    </div>
                                </div>
                                {error ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-medium">ERROR!</span> Please fill in completely.
                                </div> : ''}
                                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Add New Devices
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalCreateDevice