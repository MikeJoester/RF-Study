import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import StudentDashboard from "./pages/dashboard/student-dashboard";

function App() {
  return (
    <Routes>
      <Route path="/student-dashboard" element = {<StudentDashboard/>}/>
      <Route path="/home/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/student-dashboard" replace />} />
    </Routes>
  );
}

export default App;