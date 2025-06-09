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

  const getBadge = (score) => {
    if (score >= 1000)
      return <span className="text-yellow-400 font-semibold">🌟 Legend</span>;
    if (score >= 750)
      return <span className="text-red-400 font-semibold">🔥 Expert</span>;
    if (score >= 500)
      return <span className="text-blue-400 font-semibold">⭐ Intermediate</span>;
    if (score >= 250)
      return <span className="text-green-300 font-semibold">🔰 Beginner</span>;
    return <span className="text-gray-400 font-semibold">🎓 Newbie</span>;
  };

  const getRankEmoji = (index) => {
    return index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1;
  };

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
              <th className="py-3 px-4">Profile</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">College</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4">Badge</th>
            </tr>
          </thead>
          <tbody>
            {leaders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No leaderboard data available.
                </td>
              </tr>
            ) : (
              leaders.map((user, index) => (
                <tr
                  key={user._id}
                  className={`transition duration-300 ease-in-out hover:bg-gray-700 ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                  }`}
                >
                  <td className="py-3 px-4 font-semibold text-yellow-300">
                    {getRankEmoji(index)}
                  </td>
                  <td className="py-3 px-4">
                    <img
                      src={user.avatarUrl || "/default-avatar.png"}
                      alt="avatar"
                      className="w-10 h-10 rounded-full border-2 border-green-400"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{user.name}</td>
                  <td className="py-3 px-4 text-gray-400">{user.collegeName}</td>
                  <td className="py-3 px-4 font-bold text-green-400">{user.totalScore}</td>
                  <td className="py-3 px-4">{getBadge(user.totalScore)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
