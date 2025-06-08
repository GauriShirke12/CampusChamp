import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TeamMatchPage = () => {
  const { eventId } = useParams();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/student/match-teammates", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecommendations(res.data);
    };

    fetchMatches();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Suggested Teammates</h2>
      {recommendations.map((student) => (
        <div key={student._id} className="bg-white p-4 shadow-md mb-3 rounded-xl">
          <p><strong>{student.name}</strong> — {student.collegeName}</p>
          <p>Skills: {student.skills.join(", ")}</p>
          <p>Roles: {student.rolePreferences.join(", ")}</p>
          <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">Send Invite</button>
        </div>
      ))}
    </div>
  );
};

export default TeamMatchPage;
