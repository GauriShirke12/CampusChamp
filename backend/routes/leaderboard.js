import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Backend server URL

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();

    socket.on("leaderboardUpdated", (data) => {
      if (Array.isArray(data)) {
        setLeaderboard(data);
      } else {
        console.warn("Received non-array leaderboard:", data);
      }
    });

    return () => socket.off("leaderboardUpdated");
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaderboard");
      if (Array.isArray(res.data)) {
        setLeaderboard(res.data);
      } else {
        console.warn("Unexpected response from API:", res.data);
        setLeaderboard([]);
      }
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setLeaderboard([]);
    }
  };

  return (
    <div>
      <h2>DSA Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ol>
          {leaderboard.map((student, i) => (
            <li key={student._id}>
              {i + 1}. {student.name} - {student.dsaScore} points
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default Leaderboard;
