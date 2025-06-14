import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Button, Typography
} from '@mui/material';

const LeaderboardControl = () => {
  const [students, setStudents] = useState([]);
  const [editingScores, setEditingScores] = useState({});

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get('/api/admin/leaderboard');
      setStudents(res.data);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  const handleScoreChange = (id, value) => {
    setEditingScores(prev => ({ ...prev, [id]: value }));
  };

  const updateScore = async (id) => {
    try {
      await axios.put(`/api/admin/score/${id}`, { dsaScore: editingScores[id] });
      fetchLeaderboard();
    } catch (err) {
      console.error('Failed to update score:', err);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Leaderboard Control</Typography>
      <TableContainer component={Paper}>
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
                    value={editingScores[student._id] ?? student.dsaScore}
                    onChange={(e) => handleScoreChange(student._id, e.target.value)}
                    sx={{ width: '100px' }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => updateScore(student._id)}
                  >
                    Update
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
