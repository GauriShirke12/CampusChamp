import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/leaderboard") 
      .then((res) => res.json())
      .then((data) => {
        console.log("Leaderboard fetched:", data); 
        if (Array.isArray(data)) {
          setLeaderboard(data);
        } else {
          setError("Leaderboard data is invalid.");
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
        console.warn("Received non-array leaderboard update:", data);
      }
    });

    return () => socket.off("leaderboardUpdated");
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Leaderboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {Array.isArray(leaderboard) && leaderboard.length > 0 ? (
        <ol>
          {leaderboard.map((user, index) => (
            <li key={user._id || index}>
              <strong>{user.name}</strong> – {user.dsaScore ?? user.points} points
            </li>
          ))}
        </ol>
      ) : (
        <p>No leaderboard data available.</p>
      )}
    </div>
  );
}

export default Leaderboard;
