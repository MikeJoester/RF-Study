import React from 'react'
import { useState,useEffect } from 'react';
import { getUserInfo } from '@/API';
import { useLocation, Link } from "react-router-dom";

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
  } from "@material-tailwind/react";
  import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
  import { authorsTableData, projectsTableData } from "@/data";
import {
  Navbar,
  Button,
  IconButton,

  Input,

} from "@material-tailwind/react";
import {
  UserCircleIcon,

  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";

function StudentDashboard() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { fixedNavbar, openSidenav } = controller;
    const { pathname } = useLocation();
    const [layout, page] = pathname.split("/").filter((el) => el !== "");
    const [userData, setUserData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo();
        console.log(data)
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
    <div>
    <Navbar
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center px-12">
        <div className="capitalize text-gray-800">
          Board about attendance for student
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" value={searchTerm} onChange={handleSearchChange}/>
          </div>
     
          <Link to="/auth/sign-in">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex normal-case"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              Sign In
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link>
          
          
        </div>
      </div>
    </Navbar>
    <Card>
    <CardHeader variant="gradient" color="gray" className="mb-8 p-6 mt-6">
      <Typography variant="h6" color="white">
        Attendence Table
      </Typography>
    </CardHeader>
    <CardBody className="overflow-x-scroll px-6">
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
          {["ID", "Student name", "Major", "Card ID", "Device UID"].map(
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
                      <tr key={_id}>
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
  )
}

export default StudentDashboard