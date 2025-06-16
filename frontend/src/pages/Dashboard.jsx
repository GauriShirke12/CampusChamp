// src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Users, BarChart } from 'lucide-react';


const Dashboard = () => {
  const [invites, setInvites] = useState([]);
  const [team, setTeam] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchInvites(), fetchTeam(), fetchProfile()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const fetchInvites = async () => {
    try {
      const res = await axios.get("/api/invites/my-invites", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setInvites(res.data);
    } catch (error) {
      console.error("Error fetching invites", error);
    }
  };

  const fetchTeam = async () => {
    try {
      const res = await axios.get("/api/teams/my-team", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTeam(res.data);
    } catch (error) {
      console.error("Error fetching team", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/api/student/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProfile(res.data);
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const respondToInvite = async (id, status) => {
    try {
      await axios.put(
        `/api/invites/respond/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchInvites();
      fetchTeam();
    } catch (err) {
      console.error("Failed to respond to invite", err);
    }
  };

  if (loading) {
    return (
      <p className="text-white text-center mt-10 animate-pulse">
        Loading your dashboard...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10 max-w-6xl mx-auto space-y-10">

      {/* Profile Section */}
      {profile && (
        <motion.div
          className="bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 p-6 rounded-xl shadow-md flex items-center space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-20 rounded-full bg-green-600 text-white text-2xl flex items-center justify-center font-bold">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-gray-300">{profile.email}</p>
            <p className="text-gray-400 text-sm">
              {profile.collegeName}, {profile.city}
            </p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Performance Section */}
        {profile && (
          <motion.div
            className="bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-green-400 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" /> Performance Overview
            </h2>
            <ul className="grid grid-cols-2 gap-y-2 text-gray-300 text-sm">
              <li><strong>DSA Score:</strong> {profile.dsaScore || "N/A"}</li>
              <li><strong>DSA Rank:</strong> {profile.dsaRank || "N/A"}</li>
              <li><strong>Quiz Score:</strong> {profile.quizScore || 0}</li>
              <li><strong>Workshops:</strong> {profile.workshops?.join(", ") || "None"}</li>
            </ul>

            {/* Progress Bars */}
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-sm text-gray-400 mb-1">DSA Progress</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min(profile.dsaScore || 0, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Quiz Progress</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${Math.min(profile.quizScore || 0, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pending Invites Section */}
        <motion.div
          className="bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
            <MailCheck className="w-5 h-5" /> Team Invites
          </h2>
          {invites.length === 0 ? (
            <p className="text-gray-400">No invites at the moment.</p>
          ) : (
            invites.map((invite) => (
              <div
                key={invite._id}
                className="border border-gray-700 p-4 mb-4 rounded-lg bg-gray-700 transition-transform hover:scale-[1.01] duration-200"
              >
                <p><strong>From:</strong> {invite.inviter.name}</p>
                <p><strong>Event:</strong> {invite.hackathonTitle}</p>
                <div className="mt-2 space-x-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                    onClick={() => respondToInvite(invite._id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    onClick={() => respondToInvite(invite._id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </motion.div>

        {/* Hackathon Team Section */}
        <motion.div
          className="bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-2">
            <Users className="w-5 h-5" /> Your Hackathon Team
          </h2>
          {team?.members?.length > 0 ? (
            <ul className="list-disc pl-6 text-gray-300 space-y-1 text-sm">
              {team.members.map((member) => (
                <li key={member._id}>{member.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">You're not part of any team yet.</p>
          )}
        </motion.div>

      </div>

      {/* Footer Navigation */}
      <div className="text-center">
        <Link
          to="/invites"
          className="text-blue-400 hover:text-blue-500 transition duration-200 text-lg"
        >
          View All Team Invites →
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
