import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import missionImage from '../assets/mission.jpg'; // Replace with your actual image
import visionImage from '../assets/vision.jpg';   // Replace with your actual image

const AboutUs = () => {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, backgroundColor: '#f9fafb' }}>
      {/* Headline */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4} color="#1E2A38">
        About CampusChamp
      </Typography>

      {/* Info Cards */}
      <Grid container spacing={3} justifyContent="center" mb={6}>
        {[
          { title: 'Empowering Students', text: 'We create opportunities for students to grow beyond academics.' },
          { title: 'Connecting Colleges', text: 'We build a network across institutions for collaboration and excellence.' },
          { title: 'Promoting Talent', text: 'We recognize and celebrate student achievements at every level.' }
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                height: '100%',
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#1E2A38">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mission Section */}
      <Grid container spacing={6} alignItems="center" mb={8}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#1E2A38">
            Our Mission
          </Typography>
          <Typography variant="body1" color="text.secondary">
            To foster a platform where students from various colleges can participate, engage, and shine in academic and extracurricular activities. We aim to create a unified digital space for intercollegiate growth.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={missionImage} alt="Our Mission" style={{ width: '100%', borderRadius: 16 }} />
        </Grid>
      </Grid>

      {/* Vision Section */}
      <Grid container spacing={6} alignItems="center" direction="row-reverse" mb={8}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#1E2A38">
            Our Vision
          </Typography>
          <Typography variant="body1" color="text.secondary">
            To become the go-to platform for inter-college collaboration, event participation, and student achievements. CampusChamp is more than just a leaderboard—it's a movement.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={visionImage} alt="Our Vision" style={{ width: '100%', borderRadius: 16 }} />
        </Grid>
      </Grid>

      {/* What We Provide */}
      <Box textAlign="center" maxWidth="900px" mx="auto">
        <Typography variant="h5" fontWeight="bold" gutterBottom color="#1E2A38">
          What We Provide
        </Typography>
        <Typography variant="body1" color="text.secondary">
          CampusChamp offers tools for event organization, participant tracking, real-time leaderboards, and a robust dashboard. We aim to simplify campus competitions and showcase talent across institutions.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutUs;
