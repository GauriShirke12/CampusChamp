import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
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
  const [tab, setTab] = useState(0); // 0 - Upcoming, 1 - Live, 2 - Past

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // Tab label mapping
  const tabLabels = ['Upcoming', 'Live', 'Past'];

  // Determine which events to show
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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Events
      </Typography>

      {/* Filter Chips */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        {eventCategories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => {
              setSelectedCategory(category);
              setTab(0); // reset tab to Upcoming
            }}
            color={selectedCategory === category ? 'primary' : 'default'}
            sx={{
              fontSize: '1rem',
              borderRadius: '999px',
              padding: '12px 18px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          />
        ))}
      </Box>

      {/* Conditional Tabs */}
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
