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

export function Attendance() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">      
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Attendance
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID", "Student name", "Gender", "Email", "Card UID", "Date", "Device"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
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
                  ({ serialnumber, username, gender, email, card_uid, user_date, device_uid }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
                    const FormatDate = new Date(user_date).toLocaleDateString('en-GB')
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
                            {device_uid}
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
  );
}

export default Attendance;
