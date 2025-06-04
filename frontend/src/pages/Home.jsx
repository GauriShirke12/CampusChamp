import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        background: "linear-gradient(to bottom right, #1E2A38, #283E4A)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: 600, mb: 2 }}>
        Welcome to CampusChamp
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, maxWidth: 600 }}>
        Discover, Participate, and Compete in Campus Events. Elevate your profile with every challenge and track your progress on the leaderboard!
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
        <Button
          variant="contained"
          component={Link}
          to="/events"
          sx={{
            backgroundColor: "#90CAF9",
            color: "#000",
            "&:hover": {
              backgroundColor: "#64b5f6",
            },
          }}
        >
          Explore Events
        </Button>

        <Button
          variant="outlined"
          component={Link}
          to="/login"
          sx={{
            borderColor: "#90CAF9",
            color: "#90CAF9",
            "&:hover": {
              backgroundColor: "rgba(144,202,249,0.1)",
            },
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
