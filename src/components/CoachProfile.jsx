import { useState } from 'react';
import { Grid, Box, Button, Typography, Chip } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import { ApiBaseUrl } from '../utils/auth';
 
const CoachProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { person } = location.state;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeSlots, setTimeSlots] = useState([
    { time: '8:00 - 9:00 AM', available: true },
    { time: '9:30 - 10:30 AM', available: false },
    { time: '11:00 - 12:00 PM', available: true },
    { time: '2:00 - 3:00 PM', available: true },
    { time: '3:30 - 4:30 PM', available: true }
  ]);
 
  const availableSlots = timeSlots.filter(slot => slot.available).length;
 
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
 
  const handleTimeSlotClick = (slot) => {
    if (slot.available) setSelectedTimeSlot(slot.time);
  };
 
  const convertToISO8601 = (date) => {
    const dateObject = new Date(date);
    if (isNaN(dateObject)) {
      throw new Error("Invalid Date");
    }
    return dateObject.toISOString();
  };
 
  const handleBookWorkout = () => {
    if (selectedDate && selectedTimeSlot) {
      const payload = {
        coachEmail: person.email,
        date: convertToISO8601(selectedDate),
        duration: 1,
        workoutType: person.role,
      };
      const token = localStorage.getItem('idToken');
      if (!token) {
        console.error("No token found!");
        return;
      }
      axios.post(`${ApiBaseUrl}/api/booksession`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        console.log("Booking successful:", response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error booking workout:");
        } else {
          console.error("Network or CORS error");
        }
      });
    }
  };
 
  const isBookButtonDisabled = !(selectedDate && selectedTimeSlot);
 
  const upcomingWorkouts = [
    { workout: 'Yoga', date: 'July 7, 12:30' }
  ];
 
  const testimonials = [
    { name: 'Amanda', date: '6/8/2024', review: 'I have been attending classes with Kristin Watson for six months...', rating: 5, imgSrc: '/path/to/amanda.jpg' },
    { name: 'Ester', date: '/23/2024', review: 'Kristin Watson is a fantastic instructor...', rating: 5, imgSrc: '/path/to/amanda.jpg' },
    { name: 'Jenny', date: '9/15/2023', review: 'I’ve tried several yoga classes before...', rating: 5, imgSrc: '/path/to/amanda.jpg' },
  ];
 
  const btnStyle = {
    width: '100%',
    backgroundColor: "#9EF300",
    color: "#000000",
    cursor: "pointer",
    "&:hover": { backgroundColor: "#9EF300" },
    textTransform: "none",
    borderRadius: "6px",
    marginBottom: '10px'
  };
 
  const scheduleStyle = {
    textDecoration: 'none',
    fontFamily: 'Lexend',
    fontSize: '15px',
    fontWeight: '300',
    lineHeight: '24px',
    letterSpacing: '0.03em',
    textAlign: 'left',
    color: 'black',
  };
 
  return (
    <>
      <Grid container spacing={2} sx={{ width: '100%', padding: '20px', position: { lg: 'fixed', xs: 'sticky', md: 'sticky' } }}>
        <Grid item xs={12} sm={4} lg={3.5} sx={{ position: { lg: 'fixed', xs: 'relative' }, top: 0, marginLeft: { lg: '2%', xs: '0' }, overflowY: 'auto' }} marginLeft={'2%'}>
          <div style={{ marginTop: '40px', marginLeft: '10px', marginBottom: '5%' }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Button onClick={() => navigate('/coaches')} style={{ color: 'black', fontSize: '16px', textTransform: 'none' }}>
                Coaches {'>'} {person.name}
              </Button>
            </Breadcrumbs>
          </div>
          <Card sx={{ maxWidth: 316, minWidth: 250, borderRadius: '16px', margin: 1, height: '550px', boxShadow: '0px 0px 11px 0px #0000001F' }}>
            <CardMedia component="img" image={person.image} height={270} alt="Gym Trainer" />
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">{person.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography>{person.rating}</Typography>
                  <Rating name="overall-rating" value={Number(person.rating) / 10} max={1} precision={0.5} readOnly />
                </Box>
              </Box>
              <Typography marginBottom={1} fontSize={15}>{person.shortSummary}</Typography>
              <Typography variant="body2" marginBottom={1}>
                {person.expertiseDescription}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="Yoga" />
                <Chip label="Personal Workout" />
                <Chip label="Group Workout" />
              </Box>
            </CardContent>
            <CardActions sx={{ flexDirection: 'column', alignItems: 'center' }}>
              <Button type="submit" variant="contained" sx={{ ...btnStyle }} onClick={handleBookWorkout} disabled={isBookButtonDisabled}>
                Book Workout
              </Button>
            </CardActions>
          </Card>
        </Grid>
 
        <Grid item xs={12} sm={8} lg={7.5} sx={{ marginLeft: { xs: '0', lg: '3%' }, marginTop: { xs: '20px', lg: '6%' } }}>
          <Typography variant="h6" gutterBottom>Schedule</Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Calendar
                value={selectedDate}
                onChange={handleDateChange}
                locale="en-US"
                prev2Label={null}
                next2Label={null}
                showNeighboringMonth={false}
                tileClassName={({ date, view }) =>
                  view === 'month' ? 'custom-day-tile' : null
                }
                formatMonthYear={(locale, date) =>
                  <span style={{ fontFamily: 'Lexend', fontWeight: '300', fontSize: '18px', lineHeight: '24px', textAlign: 'center' }}>
                    {date.toLocaleString(locale, { month: 'long', year: 'numeric' })}
                  </span>
                }
              />
            </Box>
 
            <Box sx={{ flex: 1, maxHeight: '42vh', marginLeft: { xs: 0, md: '5%' }, maxWidth: '100%', overflowY: 'auto', overflowX: 'auto', padding: '10px', '&::-webkit-scrollbar': { display: 'none' }, '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #BDBDBD', paddingBottom: '10px', paddingTop: '10px', marginBottom: '10px', fontWeight: '300', fontSize: '18px', lineHeight: '24px', textAlign: 'left' }}>
                <Typography>Available Time Slots</Typography>
                <Typography fontWeight='300'>{availableSlots} slots available</Typography>
              </Box>
              {timeSlots.map((slot, index) => (
                <Button
                  key={index}
                  onClick={() => handleTimeSlotClick(slot)}
                  disabled={!slot.available}
                  sx={{ ...scheduleStyle, backgroundColor: slot.available ? '#9EF300' : '#E0E0E0', color: '#000000', cursor: slot.available ? 'pointer' : 'not-allowed', borderRadius: '4px', marginBottom: '10px', width: '100%' }}
                >
                  {slot.time}
                </Button>
              ))}
            </Box>
          </Box>
 
          <Typography variant="h6" gutterBottom>Upcoming Workouts</Typography>
          {upcomingWorkouts.map((workout, index) => (
            <Box key={index} sx={{ borderBottom: '1px solid #BDBDBD', paddingBottom: '10px', paddingTop: '10px', marginBottom: '10px', fontWeight: '300', fontSize: '18px', lineHeight: '24px', textAlign: 'left' }}>
              <Typography>{workout.workout} - {workout.date}</Typography>
            </Box>
          ))}
 
          <Typography variant="h6" gutterBottom>Testimonials</Typography>
          {testimonials.map((testimonial, index) => (
            <Card key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '15px', padding: '10px', boxShadow: '0px 0px 11px 0px #0000001F' }}>
              <CardMedia component="img" sx={{ width: 60, height: 60, borderRadius: '50%' }} image={testimonial.imgSrc} alt={testimonial.name} />
              <Box sx={{ marginLeft: 2 }}>
                <Typography variant="body2" fontWeight="bold">{testimonial.name}</Typography>
                <Typography variant="body2" color="text.secondary">{testimonial.date}</Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>{testimonial.review}</Typography>
                <Rating name="testimonial-rating" value={testimonial.rating} max={5} readOnly sx={{ marginTop: 1 }} />
              </Box>
            </Card>
          ))}
        </Grid>
      </Grid>
    </>
  );
};
 
export default CoachProfile;