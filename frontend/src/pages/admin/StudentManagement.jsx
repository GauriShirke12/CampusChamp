import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../contexts/AuthContext";

const StudentManagement = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/students", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setStudents(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirm = window.confirm(`Are you sure you want to delete student "${name}"?`);
    if (!confirm) return;

    try {
      await axios.delete(`/api/admin/students/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete student");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [user]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>User Management</Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
      ) : students.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>No students found.</Typography>
      ) : (
        <Paper sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>College</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.collegeName}</TableCell>
                  <TableCell>{student.city}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(student._id, student.name)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default StudentManagement;
