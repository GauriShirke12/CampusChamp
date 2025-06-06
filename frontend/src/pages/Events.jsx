import React, { useState, useEffect } from 'react';
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
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
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

const getTimeLeft = (dateString) => {
  const now = dayjs();
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

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const timer = setInterval(() => setNow(dayjs()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleTabChange = (event, newValue) => setTab(newValue);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setTab(0);
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({ name: '', email: '' });
  };

  const handleSubmit = () => {
    console.log('Registration:', formData, 'for event:', selectedEvent);
    alert(`Registered for ${selectedEvent?.title}!`);
    handleCloseModal();
  };

  const tabLabels = ['Upcoming', 'Live', 'Past'];

  const filteredEvents =
    selectedCategory === 'Quizzes'
      ? eventsData.filter((e) => e.type === 'Quizzes')
      : eventsData.filter(
          (e) => e.type === selectedCategory && e.status === tabLabels[tab]
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

                    {/* Countdown */}
                    {event.status === 'Upcoming' && (
                      <Typography variant="body2" color="secondary" mb={1}>
                        ⏳ {getTimeLeft(event.date) || 'Starting soon!'}
                      </Typography>
                    )}

                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#1E2A38',
                        transition: '0.3s',
                        '&:hover': {
                          backgroundColor: '#263242',
                          transform: 'scale(1.05)',
                        },
                      }}
                      onClick={() => handleOpenModal(event)}
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

      {/* Registration Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Register for {selectedEvent?.title}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Events;
