// 📄 Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-10 max-w-5xl mx-auto">
      {profile && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-md flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-green-600 text-white text-2xl flex items-center justify-center font-bold">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-gray-300">{profile.email}</p>
            <p className="text-gray-400 text-sm">{profile.collegeName}, {profile.city}</p>
          </div>
        </div>
      )}

      {profile && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-400">📈 Performance</h2>
          <ul className="grid grid-cols-2 gap-y-2 text-gray-300">
            <li><strong>DSA Score:</strong> {profile.dsaScore || "N/A"}</li>
            <li><strong>DSA Rank:</strong> {profile.dsaRank || "N/A"}</li>
            <li><strong>Quiz Score:</strong> {profile.quizScore || 0}</li>
            <li><strong>Workshops:</strong> {profile.workshops?.join(", ") || "None"}</li>
          </ul>
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-yellow-400">🔔 Pending Invites</h2>
        {invites.length === 0 ? (
          <p className="text-gray-400">No invites at the moment.</p>
        ) : (
          invites.map((invite) => (
            <div key={invite._id} className="border border-gray-700 p-4 mb-4 rounded-lg bg-gray-700">
              <p><strong>From:</strong> {invite.inviter.name}</p>
              <p><strong>Event:</strong> {invite.hackathonTitle}</p>
              <div className="mt-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 mr-3 rounded"
                  onClick={() => respondToInvite(invite._id, "accepted")}
                >Accept</button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  onClick={() => respondToInvite(invite._id, "rejected")}
                >Reject</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-blue-400">👥 Your Hackathon Team</h2>
        {team?.members?.length > 0 ? (
          <ul className="list-disc pl-6 text-gray-300">
            {team.members.map((member) => (
              <li key={member._id}>{member.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">You're not part of any team yet.</p>
        )}
      </div>

      <div className="text-center">
        <Link to="/invites" className="text-blue-400 hover:underline text-lg">
          View All Team Invites →
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
