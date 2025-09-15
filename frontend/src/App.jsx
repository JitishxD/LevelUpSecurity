import { Routes, Route } from "react-router-dom";

import LandingPage from "./Components/LevelUpSecurity";
import AuthPage from "./Components/AuthPage";
import LearnMorePage from "./Components/LearnMore";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Components/Home";

import DeveloperPage from "./Components/Content/DeveloperPage";
import MarketerPage from "./Components/Content/Marketer";
import StudentPage from "./Components/Content/Student";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/:mode" element={<AuthPage />} />
          <Route path="/learnmore" element={<LearnMorePage />} />

          <Route element={<ProtectedRoute/>}>
            <Route path="/home" element={<Home/>} />
            <Route path="/home/developer" element={<DeveloperPage/>} />
            <Route path="/home/marketer" element={<MarketerPage/>} />
            <Route path="/home/student" element={<StudentPage/>} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
