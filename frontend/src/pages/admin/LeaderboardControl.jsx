import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Button,
  Typography, CircularProgress, Alert
} from "@mui/material";

const LeaderboardControl = () => {
  const [students, setStudents] = useState([]);
  const [editingScores, setEditingScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/leaderboard");
      setStudents(res.data);
    } catch (err) {
      setError("Failed to fetch leaderboard.");
    } finally {
      setLoading(false);
    }
  };

  const handleScoreChange = (id, value) => {
    if (isNaN(value)) return;
    setEditingScores(prev => ({ ...prev, [id]: value }));
  };

  const updateScore = async (id) => {
    const newScore = editingScores[id];
    if (newScore === undefined) return;

    try {
      setSavingId(id);
      await axios.put(`/api/admin/score/${id}`, { dsaScore: Number(newScore) });
      await fetchLeaderboard();
    } catch (err) {
      setError(`Failed to update score for student ${id}.`);
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Leaderboard Control
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>DSA Score</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="small"
                    value={
                      editingScores[student._id] !== undefined
                        ? editingScores[student._id]
                        : student.dsaScore
                    }
                    onChange={(e) => handleScoreChange(student._id, e.target.value)}
                    sx={{ width: "100px" }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => updateScore(student._id)}
                    disabled={savingId === student._id}
                  >
                    {savingId === student._id ? "Updating..." : "Update"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LeaderboardControl;
