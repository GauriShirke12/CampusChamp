import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Grid, List, ListItem } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const DashboardInsights = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, eventStats: [] });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get("/api/admin/dashboard-stats", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setStats(res.data);
    };
    fetchStats();
  }, [user]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard Insights</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Registered Users</Typography>
              <Typography variant="h4">{stats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Participants</Typography>
              <Typography variant="h4">{stats.activeUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Event Registration Stats</Typography>
              <List>
                {stats.eventStats.map((event, index) => (
                  <ListItem key={index}>
                    {event.name}: {event.registrations} registrations
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardInsights;
