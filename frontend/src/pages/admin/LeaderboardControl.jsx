import React, { useEffect, useState } from "react";
import {
  Container, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const LeaderboardControl = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchLeaderboard = async () => {
    const res = await axios.get("/api/admin/leaderboard", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setStudents(res.data);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleEdit = (student) => {
    setEditing(student);
    setOpen(true);
  };

  const handleUpdate = async () => {
    await axios.put(`/api/admin/leaderboard/${editing._id}`, {
      dsaScore: editing.dsaScore,
      quizScore: editing.quizScore,
      dsaRank: editing.dsaRank
    }, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setOpen(false);
    fetchLeaderboard();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Leaderboard Control</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>College</TableCell>
            <TableCell>DSA Score</TableCell>
            <TableCell>Quiz Score</TableCell>
            <TableCell>DSA Rank</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((s) => (
            <TableRow key={s._id}>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.collegeName}</TableCell>
              <TableCell>{s.dsaScore}</TableCell>
              <TableCell>{s.quizScore}</TableCell>
              <TableCell>{s.dsaRank}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(s)}><Edit /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Student Scores</DialogTitle>
        <DialogContent>
          <TextField
            label="DSA Score" type="number" fullWidth margin="dense"
            value={editing?.dsaScore || 0}
            onChange={(e) => setEditing({ ...editing, dsaScore: e.target.value })}
          />
          <TextField
            label="Quiz Score" type="number" fullWidth margin="dense"
            value={editing?.quizScore || 0}
            onChange={(e) => setEditing({ ...editing, quizScore: e.target.value })}
          />
          <TextField
            label="DSA Rank" type="number" fullWidth margin="dense"
            value={editing?.dsaRank || 0}
            onChange={(e) => setEditing({ ...editing, dsaRank: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LeaderboardControl;
