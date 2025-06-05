import React from "react";
import { Box, Typography, Button, Grid, Card, CardContent, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../assets/hero-illustration.png";


const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "#1E2A38",
          color: "#fff",
          py: { xs: 8, md: 12 },
          px: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Welcome to CampusChamp
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 500, mx: "auto", mb: 4 }}>
              Compete. Learn. Lead. A platform to level up your skills through coding, quizzes, and hackathons.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/events" sx={{ mx: 1 }}>
              Explore Events
            </Button>
            <Button variant="outlined" color="inherit" component={Link} to="/leaderboard" sx={{ mx: 1 }}>
              View Leaderboard
            </Button>
          </motion.div>
        </Box>

        <Box sx={{ flex: 1, textAlign: "center", mt: { xs: 4, md: 0 } }}>
          <motion.img
            src={heroImage}
            alt="Hero"
            style={{ maxWidth: "100%", height: "auto" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, px: 3, backgroundColor: '#f4f6f8' }}>
        <Typography variant="h4" textAlign="center" mb={5} fontWeight={500}>
          What We Offer
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[{ title: 'Coding Contests' }, { title: 'Hackathons' }, { title: 'Quizzes' }, { title: 'Workshops' }].map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>{item.title}</Typography>
                    <Typography variant="body2" mt={1}>Participate and sharpen your skills</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* How It Works */}
      <Box sx={{ py: 8, px: 3 }}>
        <Typography variant="h4" textAlign="center" mb={5} fontWeight={500}>
          How It Works
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            'Sign Up / Login',
            'Explore Challenges',
            'Compete & Earn Points',
            'Track Progress on Dashboard',
          ].map((step, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Typography variant="h5" color="primary">Step {i + 1}</Typography>
                    <Typography variant="body1" mt={1}>{step}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Leaderboard Preview */}
      <Box sx={{ py: 6, px: 3, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" textAlign="center" mb={3} fontWeight={500}>Top Performers</Typography>
        <Grid container spacing={2} justifyContent="center">
          {[{ name: 'Aditi' }, { name: 'Rahul' }, { name: 'Sneha' }].map((user, index) => (
            <Grid item xs={10} sm={4} key={index}>
              <Card sx={{ textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="body2">#{index + 1}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center" mt={3}>
          <Button variant="text" component={Link} to="/leaderboard">View Full Leaderboard</Button>
        </Box>
      </Box>

      {/* Newsletter / Join Section */}
      <Box sx={{ py: 6, px: 3, textAlign: 'center', backgroundColor: '#1E2A38', color: 'white' }}>
        <Typography variant="h5" mb={2}>Join Our Mailing List</Typography>
        <Typography variant="body1" mb={3}>Stay updated with upcoming events and competitions</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <TextField placeholder="Your Email" variant="filled" size="small" sx={{ backgroundColor: 'white', borderRadius: 1 }} />
          <Button variant="contained">Subscribe</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
