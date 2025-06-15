import React, { useEffect, useState } from "react";
import axios from "axios";

const TeamMatch = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get("/api/student/match-teammates", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(res.data);
      } catch (err) {
        console.error("Error fetching teammates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const sendInvite = async (receiverId) => {
    try {
      await axios.post(
        "/api/invite",
        { receiverId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Invite sent!");
    } catch (err) {
      console.error("Invite error:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        👥 Recommended Teammates
      </h2>

      {loading ? (
        <p className="text-center">Loading recommendations...</p>
      ) : matches.length === 0 ? (
        <p className="text-center text-gray-500">No suitable matches found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((student) => (
            <div
              key={student._id}
              className="bg-white rounded-xl shadow-lg p-5 border hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-blue-600">
                {student.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {student.collegeName}, {student.city}
              </p>

              <div className="mt-3">
                <strong className="text-sm">Skills:</strong>
                <div className="flex flex-wrap gap-2 mt-1 text-sm">
                  {student.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 rounded-md text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <strong className="text-sm">Roles:</strong>
                <div className="flex flex-wrap gap-2 mt-1 text-sm">
                  {student.rolePreferences.map((role, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-green-100 rounded-md text-green-700"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                Match Score: <strong>{student.score}</strong>
              </p>

              <button
                className="mt-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                onClick={() => sendInvite(student._id)}
              >
                Invite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMatch;
