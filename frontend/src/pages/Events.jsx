import React, { useState } from 'react';
import { EventAvailable } from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
} from '@mui/material';

const eventCategories = ['Coding Challenges', 'Hackathons', 'Quizzes', 'Workshops'];

const eventsData = [
  {
    title: 'React Challenge',
    date: 'June 10, 2025',
    type: 'Coding Challenges',
    status: 'Upcoming',
    description: 'React-based frontend task.',
  },
  {
    title: 'Campus Hackathon',
    date: 'June 12, 2025',
    type: 'Hackathons',
    status: 'Live',
    description: '48-hour team hackathon.',
  },
  {
    title: 'JS Quiz',
    date: 'Always Available',
    type: 'Quizzes',
    status: 'Anytime',
    description: 'Play anytime, test your JS skills.',
  },
  {
    title: 'Web Dev Workshop',
    date: 'June 16, 2025',
    type: 'Workshops',
    status: 'Past',
    description: 'Full-stack bootcamp.',
  },
  {
    title: 'Algo Challenge',
    date: 'June 9, 2025',
    type: 'Coding Challenges',
    status: 'Live',
    description: 'Improve your DSA.',
  },
  {
    title: 'HTML Quiz',
    date: 'Always Available',
    type: 'Quizzes',
    status: 'Anytime',
    description: 'Available 24/7 for self-assessment.',
  },
  {
    title: 'Design Workshop',
    date: 'June 18, 2025',
    type: 'Workshops',
    status: 'Upcoming',
    description: 'UI/UX beginner session.',
  },
];

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('Coding Challenges');
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setTab(0);
  };

  const tabLabels = ['Upcoming', 'Live', 'Past'];

  let filteredEvents = [];

  if (selectedCategory === 'Quizzes') {
    filteredEvents = eventsData.filter(e => e.type === 'Quizzes');
  } else {
    const currentStatus = tabLabels[tab];
    filteredEvents = eventsData.filter(
      e => e.type === selectedCategory && e.status === currentStatus
    );
  }

  return (
    <Container>
      {/* Animated Heading */}
      <Box textAlign="center" mt={6} mb={4}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
            <EventAvailable sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h4" fontWeight="bold">
              Explore Events
            </Typography>
          </Box>
        </motion.div>
      </Box>

      {/* Category Filter */}
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2} mb={4}>
        {eventCategories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            color="primary"
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              py: 1,
            }}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </Box>

      {/* Status Tabs */}
      {selectedCategory !== 'Quizzes' && (
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
          sx={{ mb: 4 }}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Upcoming" />
          <Tab label="Live" />
          <Tab label="Past" />
        </Tabs>
      )}

      {/* Events Grid */}
      <Grid container spacing={4}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
              >
                <Card
                  sx={{
                    backgroundColor: '#f9f9f9',
                    boxShadow: 3,
                    transition: '0.3s',
                    '&:hover': { transform: 'scale(1.03)' },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      📅 {event.date}
                    </Typography>
                    <Typography variant="body1" mb={2}>
                      {event.description}
                    </Typography>
                    <Button variant="contained" sx={{ backgroundColor: '#1E2A38' }}>
                      Register
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ mt: 4, mx: 'auto' }}>
            No events found in this category.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Events;
