import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";


import {

  projectsTableData,
  
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

export function Home() {
  return (
    <div className="mt-12">
      <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        Add new student
      </button>      
      <div className="mb-4 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">    
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  {["ID", "Student name", "Gender", "Email", "Card UID", "Date", "Major"].map(
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
                {projectsTableData.map(
                  ({ serialnumber, username, gender, email, card_uid, user_date, device_dep }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
                    const FormatDate = new Date(user_date).toLocaleDateString('en-GB')
                    console.log('>>> FormatDate: ', FormatDate)
                    return (
                      <tr key={username}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {serialnumber}
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {username}
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {gender}
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {email}
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {card_uid.length > 0 ? card_uid : "None"}
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {FormatDate}
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {device_dep}
                          </div>
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
    </div>
  );
}

export default Home;
