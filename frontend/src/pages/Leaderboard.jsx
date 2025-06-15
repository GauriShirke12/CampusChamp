import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/leaderboard")
      .then((res) => res.json())
      .then((data) => setLeaderboard(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load leaderboard.");
      });

    socket.on("leaderboardUpdated", (data) => {
      setLeaderboard(data);
    });

    return () => socket.off("leaderboardUpdated");
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Leaderboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ol>
        {leaderboard.map((user, index) => (
          <li key={user._id || index}>
            <strong>{user.name}</strong> – {user.points} points
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
