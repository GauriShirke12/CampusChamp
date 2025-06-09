import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("/api/leaderboard");
        setLeaders(res.data);
      } catch (err) {
        console.error("Error fetching leaderboard", err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center text-green-400 mb-10">
        🏆 Leaderboard
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-gray-800 rounded-xl shadow-md">
          <thead>
            <tr className="bg-gray-700 text-gray-300 text-left">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">College</th>
              <th className="py-3 px-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((user, index) => (
              <tr
                key={user._id}
                className={`hover:bg-gray-700 ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}`}
              >
                <td className="py-3 px-4 font-semibold text-yellow-300">{index + 1}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4 text-gray-400">{user.collegeName}</td>
                <td className="py-3 px-4 font-bold text-green-400">{user.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
