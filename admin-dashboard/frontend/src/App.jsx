import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import StudentDashboard from "./pages/dashboard/student-dashboard";
import { SignIn } from "./pages/auth";

function App() {
  return (
    <Routes>
      <Route path="/" element = {<StudentDashboard/>}/>
      <Route path="/home/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/sign-in" element={<SignIn/>}/>
    </Routes>
  );
}

export default App;
