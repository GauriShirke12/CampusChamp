import React, { useState, useEffect } from 'react';
import { EventAvailable } from '@mui/icons-material';
import { motion } from 'framer-motion';
import RegistrationModal from '../components/RegistrationModal';
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
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const eventCategories = [
  { label: 'Coding Challenges', icon: '🖥' },
  { label: 'Hackathons', icon: '🚀' },
  { label: 'Quizzes', icon: '🧠' },
  { label: 'Workshops', icon: '🛠' },
];

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

const getTimeLeft = (dateString, now) => {
  const eventDate = dayjs(dateString);
  const diff = eventDate.diff(now);
  if (diff <= 0) return null;
  const d = dayjs.duration(diff);
  return `${d.days()}d ${d.hours()}h ${d.minutes()}m`;
};


const Events = () => {
  const theme = useTheme();

  const [selectedCategory, setSelectedCategory] = useState('Coding Challenges');
  const [tab, setTab] = useState(0);
  const [now, setNow] = useState(dayjs());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(dayjs()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleTabChange = (event, newValue) => setTab(newValue);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setTab(0);
  };

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const filteredEvents =
    selectedCategory === 'Quizzes'
      ? eventsData.filter((e) => e.type === 'Quizzes')
      : eventsData.filter(
          (e) => e.type === selectedCategory && e.status === ['Upcoming', 'Live', 'Past'][tab]
        );

  return (
    <Container>
      {/* Heading */}
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

      {/* Category Buttons */}
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2} mb={4}>
        {eventCategories.map(({ label, icon }) => (
          <Button
            key={label}
            variant={selectedCategory === label ? 'contained' : 'outlined'}
            color="primary"
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              py: 1,
              transition: '0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor:
                  selectedCategory === label
                    ? theme.palette.primary.dark
                    : theme.palette.action.hover,
              },
            }}
            onClick={() => handleCategoryClick(label)}
          >
            {icon} {label}
          </Button>
        ))}
      </Box>

      {/* Tabs */}
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

      {/* Event Cards */}
      <Grid container spacing={4}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <Card
                  sx={{
                    backgroundColor:
                      theme.palette.mode === 'dark' ? '#1e1e1e' : '#f9f9f9',
                    boxShadow: 3,
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: 6,
                    },
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

                    {event.status === 'Upcoming' && (
  <Typography variant="body2" color="secondary" mb={1}>
    ⏳ {getTimeLeft(event.date, now) || 'Starting soon!'}
  </Typography>
)}

                    <Button
                      variant="contained"
                      onClick={() => handleRegisterClick(event)}
                      sx={{
                        backgroundColor: '#1E2A38',
                        transition: '0.3s',
                        '&:hover': {
                          backgroundColor: '#263242',
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
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

      {/* Registration Modal Component */}
      <RegistrationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        event={selectedEvent}
      />
    </Container>
  );
};



export default Events;
