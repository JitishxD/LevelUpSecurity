import { Routes, Route } from "react-router-dom";

import LandingPage from "./Components/LevelUpSecurity";
import AuthPage from "./Components/AuthPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/auth/:mode" element={<AuthPage/>}/>
      </Routes>
    </>
  );
}

export default App;
