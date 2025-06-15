import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLeaderboard(data);
        } else {
          console.warn("Expected array but got:", data);
          setLeaderboard([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load leaderboard.");
      });

    socket.on("leaderboardUpdated", (data) => {
      if (Array.isArray(data)) {
        setLeaderboard(data);
      } else {
        console.warn("Received non-array leaderboard from socket:", data);
      }
    });

    return () => socket.off("leaderboardUpdated");
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Leaderboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ol>
        {leaderboard.length === 0 ? (
          <p>No data available</p>
        ) : (
          leaderboard.map((user, index) => (
            <li key={user._id || index}>
              <strong>{user.name}</strong> – {user.dsaScore} points
            </li>
          ))
        )}
      </ol>
    </div>
  );
}

export default Leaderboard;
