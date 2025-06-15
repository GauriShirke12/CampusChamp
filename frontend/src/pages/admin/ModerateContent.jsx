import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, IconButton, CircularProgress, Alert, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuth } from "../../contexts/AuthContext";

const ModerateContent = () => {
  const { user } = useAuth();
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFlaggedContent = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/flagged-content", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setContentList(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch content");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/admin/content/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setContentList(prev => prev.filter(content => content._id !== id));
    } catch (err) {
      alert("Failed to approve content");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this content?");
    if (!confirmed) return;
    try {
      await axios.delete(`/api/admin/content/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setContentList(prev => prev.filter(content => content._id !== id));
    } catch (err) {
      alert("Failed to delete content");
    }
  };

  useEffect(() => {
    fetchFlaggedContent();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Moderate Content</Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : contentList.length === 0 ? (
        <Typography>No flagged content to review.</Typography>
      ) : (
        <Paper sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contentList.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.user?.name || "Unknown"}</TableCell>
                  <TableCell>{item.text}</TableCell>
                  <TableCell>{item.reason || "N/A"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleApprove(item._id)} color="success">
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item._id)} color="error">
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

export default ModerateContent;
