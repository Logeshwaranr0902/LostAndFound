import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChoicePage from "./pages/ChoicePage";
import RegisterPage from "./pages/RegisterPage";
import ReportPage from "./pages/ReportPage";
import FindPage from "./pages/FindPage";
import RegLostPage from "./pages/RegLostPage";
import HomePage from "./pages/homePage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/ChoicePage" element={<ChoicePage />} />
          <Route path="/Registerpage" element={<RegisterPage />} />
          <Route path="/ReportPage" element={<ReportPage />} />
          <Route path="/FindPage" element={<FindPage />} />
          <Route path="/RegLostPage" element={<RegLostPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
