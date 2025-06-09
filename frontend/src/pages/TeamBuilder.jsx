// frontend/pages/TeamBuilder.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TeamBuilder() {
  const { eventId } = useParams();
  const [myTeam, setMyTeam] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [teamName, setTeamName] = useState("");

  const token = localStorage.getItem("token"); // or useContext/AuthHook

  useEffect(() => {
    // Fetch current team
    axios
      .get(`/api/teams/my/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMyTeam(res.data))
      .catch((err) => console.error(err));
  }, [eventId]);

  const handleCreateTeam = async () => {
    try {
      const res = await axios.post(
        "/api/teams/create",
        { name: teamName, eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMyTeam(res.data.team);
    } catch (err) {
      console.error("Create team error", err);
    }
  };

  const loadRecommendations = async () => {
    try {
      const res = await axios.get("/api/student/match-teammates", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecommended(res.data);
    } catch (err) {
      console.error("Recommendation error", err);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Team Builder</h2>

      {myTeam ? (
        <div className="bg-green-100 p-4 rounded shadow mb-4">
          <h3 className="font-semibold">Your Team: {myTeam.name}</h3>
          <ul>
            {myTeam.members.map((m) => (
              <li key={m._id}>
                {m.name} – {m.skills.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Team Name"
            className="border px-2 py-1 mr-2"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            onClick={handleCreateTeam}
          >
            Create Team
          </button>
        </div>
      )}

      <div>
        <h4 className="text-xl font-semibold mt-6 mb-2">
          🔍 Suggested Teammates
        </h4>
        <ul className="space-y-2">
          {recommended.map((stu) => (
            <li key={stu._id} className="border p-2 rounded shadow">
              <div className="font-medium">{stu.name} ({stu.city})</div>
              <div>Skills: {stu.skills.join(", ")}</div>
              <div>Roles: {stu.rolePreferences.join(", ")}</div>
              {/* 🔜 Invite button can go here */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamBuilder;
