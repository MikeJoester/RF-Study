import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Devices, Attendance } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "home",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/dashboard",
        element: <Home />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "devices",
        path: "/devices",
        element: <Devices />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "attendance",
        path: "/attendance",
        element: <Attendance />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },

    ],
  },
];

export default routes;
