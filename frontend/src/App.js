import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

//  Import new Team Builder pages
import TeamBuilderForm from "./pages/TeamBuilderForm";
import TeamMatchPage from "./pages/TeamMatchPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*  New Routes for Team Builder */}
        <Route path="/team-builder/:eventId" element={<TeamBuilderForm />} />
        <Route path="/team-builder/:eventId/match" element={<TeamMatchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
