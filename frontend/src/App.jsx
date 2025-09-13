import { Routes, Route } from "react-router-dom";

import LandingPage from "./Components/LevelUpSecurity";
import AuthPage from "./Components/AuthPage";
import LearnMorePage from "./Components/LearnMore";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/auth/:mode" element={<AuthPage/>}/>
        <Route path="/learnmore" element={<LearnMorePage/>}/>
      </Routes>
    </>
  );
}

export default App;
