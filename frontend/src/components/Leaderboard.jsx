import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "./Leaderboard.css";

const socket = io("http://localhost:5000");

const getRankIcon = (rank) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return rank;
};

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaderboard");
      setLeaderboard(res.data);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();

    socket.on("leaderboardUpdated", (data) => {
      setLeaderboard(data);
    });

    return () => socket.off("leaderboardUpdated");
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No data available</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>DSA Score</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {leaderboard.map((student, index) => (
                <motion.tr
                  key={student._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    backgroundColor: index === 0 ? "#ffeaa7" : "transparent",
                  }}
                  exit={{ opacity: 0, y: 10 }}
                  layout
                  transition={{ duration: 0.3 }}
                >
                  <td>{getRankIcon(index + 1)}</td>
                  <td>{student.name}</td>
                  <td>{student.dsaScore}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
