import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";

export function Profile() {
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
        <Card color="transparent" shadow={false}>
          <CardHeader
            color="transparent"
            shadow={false}
            floated={false}
            className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
          >
            <Typography variant="h6" color="blue-gray">
            Project Infomation
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
              >
                An attendance system for university students using Esp32
              </Typography>            
            </CardBody>
          </Card>
          <Card color="transparent" className="flex flex-row justify-center items-center" shadow={false}>
            <div className="flex-grow my-10">
                <div className="flex items-center gap-6 mb-5">
                  <Avatar src="/img/Dan.png" alt="bruce-mars" size="xxl" variant="rounded" className="rounded-lg shadow-lg shadow-blue-gray-500/40" />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      Nguyễn Thế Dân
                    </Typography>
                    <Typography variant="small" className="font-normal text-blue-gray-600">
                      Backend
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Avatar src="/img/cuong.jpg" alt="bruce-mars" size="xxl" variant="rounded" className="rounded-lg shadow-lg shadow-blue-gray-500/40" />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      Lê Xuân Cương
                    </Typography>
                    <Typography variant="small" className="font-normal text-blue-gray-600">
                      FrontEnd
                    </Typography>
                  </div>
                </div>
              </div>

            <div className="flex-grow my-10">
                <div className="flex items-center gap-6 mb-5">
                  <Avatar src="/img/Hieu.jpg" alt="bruce-mars" size="xxl" variant="rounded" className="rounded-lg shadow-lg shadow-blue-gray-500/40" />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      Lê Trí Hiếu
                    </Typography>
                    <Typography variant="small" className="font-normal text-blue-gray-600">
                      FrontEnd
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Avatar src="/img/dung.png" alt="bruce-mars" size="xxl" variant="rounded" className="rounded-lg shadow-lg shadow-blue-gray-500/40" />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      Nguyễn Tuấn Dũng
                    </Typography>
                    <Typography variant="small" className="font-normal text-blue-gray-600">
                      Support / Designer
                    </Typography>
                  </div>
                </div>
              </div>
          </Card>
          <Link to="/sign-in">
            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">LogOut</button>
          </Link>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
