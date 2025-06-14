import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Change to your backend domain if hosted

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Initial fetch (optional)
    fetch("/api/admin/leaderboard")
      .then(res => res.json())
      .then(data => setLeaderboard(data));

    // Listen for real-time updates
    socket.on("leaderboardUpdated", (data) => {
      setLeaderboard(data);
    });

    return () => socket.off("leaderboardUpdated");
  }, []);

  return (
    <div>
      <h2>🏆 Live Leaderboard</h2>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={user._id}>
            {index + 1}. {user.name} – {user.dsaScore}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
