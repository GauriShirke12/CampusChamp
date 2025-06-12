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
import InvitesPage from "./pages/InvitesPage";
import TeamBuilderForm from "./pages/TeamBuilderForm";
import TeamMatchPage from "./pages/TeamMatchPage";

import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/admin/DashboardInsights';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          


          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/invites"
            element={
              <PrivateRoute>
                <InvitesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/team-builder/:eventId"
            element={
              <PrivateRoute>
                <TeamBuilderForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/team-builder/:eventId/match"
            element={
              <PrivateRoute>
                <TeamMatchPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="/admin/events" element={<PrivateRoute><managementEvent /></PrivateRoute>} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
