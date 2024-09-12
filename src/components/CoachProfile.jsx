import React, { useState } from 'react';
import { Grid, Box, Button, Typography, Chip, Avatar } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import axios from 'axios';

import '../assets/CalendarStyles.css'; // Ensure this file contains the custom scrollbar styles

import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
// import NavigateNextOutlined from "@mui/icons-material/NavigateNextOutlined";


const CoachProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {person} = location.state;
  console.log("coach email:", person.email);
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeSlots, setTimeSlots] = useState([
    { time: '8:00 - 9:00 AM', available: true },
    { time: '9:30 - 10:30 AM', available: false },
    { time: '11:00 - 12:00 PM', available: true },
    { time: '2:00 - 3:00 PM', available: true }
  ]);

  console.log(selectedDate);
  const availableSlots = timeSlots.filter(slot => slot.available).length;

  const handleDateChange = (date) => setSelectedDate(date);

  const handleTimeSlotClick = (slot) => {
    if (slot.available) setSelectedTimeSlot(slot.time);
  };

  const handleBookWorkout = () => {
    if (selectedDate && selectedTimeSlot) {
      const payload = {
        "coachEmail": "ortis@gmail.com" , // Replace with dynamic value if needed
        "date": "2024-10-08T13:30:00Z", // Format date as needed
        // time: selectedTimeSlot,
        "duration": "1",
        "workoutType": "Yoga"
      };
 
      const token = localStorage.getItem('idToken');
      if (!token) {
        console.error("No token found!");
        return;
      }
 
      console.log("Payload:", payload); // Verify the payload
 
      axios.post('https://xwiz0jhcab.execute-api.eu-west-2.amazonaws.com/api/booksession',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      )
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
 


//       console.log(`Date: ${payload.date} Time Slot: ${payload.timeSlot}`);
//       // axios.post('/api/book-workout', payload) // Replace with your actual API endpoint
//     }
//   };

  const isBookButtonDisabled = !(selectedDate && selectedTimeSlot);

  const upcomingWorkouts = [
    { workout: 'Yoga', date: 'July 7, 12:30' }
  ];

  const testimonials = [
    { name: 'Amanda',
      date: '6/8/2024', 
      review: 'I have been attending classes with Kristin Watson for six months, and the transformation in my flexibility and overall well-being has been incredible. Her calm demeanor anad expert guidance make each session a refreshing experience. Highly recommend for anyone looking to enhance their yoga practice!',
      rating: 5, 
      imgSrc: '/path/to/amanda.jpg' },
    { name: 'Ester',
      date: '/23/2024', 
      review: 'Kristin Watson is a fantastic instructor who makes every class enjoyable and challenging. Her attention to detail and personalized adjustments have helped me improve my form and find greater balance in my practice. The positive energy she brings to each session is truly uplifting!',
      rating: 5, 
      imgSrc: '/path/to/amanda.jpg' },
    { name: 'Jenny',
      date: '9/15/2023', 
      review: 'I’ve tried several yoga classes before, but Kristin Watson stands out for her ability to create a supportive and inclusive environment. She offers modifications for all levels and always encourage us to listen to our bodies. I leave each class feeling rejuvenated and centered.',
      rating: 5, 
      imgSrc: '/path/to/amanda.jpg' },
    { name: 'Amanda',
      date: '6/8/2024', 
      review: 'I have been attending classes with Kristin Watson for six months, and the transformation in my flexibility and overall well-being has been incredible. Her calm demeanor anad expert guidance make each session a refreshing experience. Highly recommend for anyone looking to enhance their yoga practice!',
      rating: 5, 
      imgSrc: '/path/to/amanda.jpg' },
    { name: 'Amanda',
      date: '6/8/2024', 
      review: 'I have been attending classes with Kristin Watson for six months, and the transformation in my flexibility and overall well-being has been incredible. Her calm demeanor anad expert guidance make each session a refreshing experience. Highly recommend for anyone looking to enhance their yoga practice!',
      rating: 5, 
      imgSrc: '/path/to/amanda.jpg' },
    { name: 'Amanda',
      date: '6/8/2024', 
      review: 'I have been attending classes with Kristin Watson for six months, and the transformation in my flexibility and overall well-being has been incredible. Her calm demeanor anad expert guidance make each session a refreshing experience. Highly recommend for anyone looking to enhance their yoga practice!',
      rating: 5, 
      imgSrc: '/path/to/amanda.jpg' },
    { name: 'Amanda',
      date: '6/8/2024', 
      review: 'I have been attending classes with Kristin Watson for six months, and the transformation in my flexibility and overall well-being has been incredible. Her calm demeanor anad expert guidance make each session a refreshing experience. Highly recommend for anyone looking to enhance their yoga practice!',
      rating: 5, 
      imgSrc: '/path/to/amanda.jpg' },
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
    letterSpacing: '0.1rem',
    textDecoration: 'none',
    fontFamily: 'Lexend',
    fontSize: '15px',
    fontWeight: '300',
    lineHeight: '24px',
    letterSpacing: '0.03em',
    textAlign: 'left',
    color: 'black',
  }

  return (
    <>
   
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} lg={3} style={{ position: 'sticky', top: 0, height: '100vh' }} marginLeft={'2%'}>
        <div style={{ marginTop:'40px', marginLeft: '10px', marginBottom: '5%'}}>
          <Breadcrumbs aria-label="breadcrumb">
            <Button onClick={() => navigate('/coaches')} style={{ color: 'black', fontSize: '16px',textTransform:'none' }}>
              Coaches {'>'} {person.name}
            </Button>
          </Breadcrumbs>
        </div>
          <Card sx={{ maxWidth: 316, minWidth: 250, borderRadius: '16px', margin: 1 , height:'550px', boxShadow: '0px 0px 11px 0px #0000001F'}}>
            <CardMedia component="img" image={person.image} height={270} alt="Gym Trainer" />
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">{person.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>{person.rating}</Typography>
    
              <Rating
                name="overall-rating"
                value={Number(person.rating)/10}
                max={1} // no. of stars
                precision={0.5}
                readOnly
              />
           
                  {/* <Rating value={person.rating} precision={0.1} readOnly /> */}
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
              <Button type="submit" variant="contained" sx={btnStyle} onClick={handleBookWorkout} disabled={isBookButtonDisabled}>
                Book Workout
              </Button>
              <Button
                type="submit"
                variant="outlined"
                sx={{ ...btnStyle, "&:hover": { borderColor: 'black', backgroundColor: "#9EF300" }, border: '1px solid black', backgroundColor: '#FFFFFF' }}
              >
                Repeat Previous Workout
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={8} lg={8} sx={{ marginLeft: '0%', marginTop:'90px' , marginBottom:'3%'}}>
          <Typography variant="h6" gutterBottom>Schedule</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row'}}>
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

            <Box sx={{ flex: 1, maxHeight: '42vh', marginLeft: '5%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #BDBDBD', paddingBottom: '10px', paddingTop: '10px', marginBottom: '10px', fontWeight: '300', fontSize: '18px', lineHeight: '24px', fontFamily: 'Lexend' }}>
                <Typography sx={scheduleStyle}>
                  {`${selectedDate.toLocaleString('default', { month: 'short' })} ${selectedDate.getDate()}`}
                </Typography>
                <Typography sx={scheduleStyle}>
                  {`${availableSlots} Slots Available`}
                </Typography>
              </Box>

              <Box sx={{ maxHeight: '32vh', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', '&::-webkit-scrollbar': { display: 'none' }, padding: '10px' }}>
                {timeSlots.map((slot, index) => (
                  <Box
                    key={index}
                    onClick={() => handleTimeSlotClick(slot)}
                    sx={{
                      mb: 2,
                      p: 2,
                      backgroundColor: slot.available ? '#E5F9E0' : '#f5f5f5',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '5px',
                      padding: '15px',
                      cursor: slot.available ? 'pointer' : 'not-allowed',
                      opacity: selectedTimeSlot === slot.time ? 1 : 0.6
                    }}
                  >
                    <Typography style={scheduleStyle}>{slot.time}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Typography variant='h6' gutterBottom sx={{ ...scheduleStyle, mt: 4 }}>Upcoming Workouts</Typography>
          <Box sx={{ borderLeft: '4px solid #4EB7FC', borderRadius: '4px' }}>
            {upcomingWorkouts.map((workout, index) => (
              <Box key={index} sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mb: 2, 
                p: 2, 
                background: index % 2 === 0 ? '#F0F4F8' : '#ffffff' }}>
                <Typography variant='body1'>{workout.workout}</Typography>
                <Typography variant='body2'>{workout.date}</Typography>
              </Box>
            ))}
          </Box>

          <Typography variant='h6' gutterBottom sx={{ ...scheduleStyle, mt: 4 }}>
  Testimonials
</Typography>
<Box
//Testimonial Card styling
  sx={{
    // marginBottom: '0px',
    display: 'flex',
    overflowX: 'auto',
    gap: 2,
    padding: '10px',
    '&::-webkit-scrollbar': { display: 'none' },
    ...scheduleStyle
  }}
>
  {testimonials.map((test, index) => (
    <Box
    key={index}
    sx={{
        maxWidth: '316px', 
        maxHeight: '448px', // Fixed height
        borderRadius: '16px', // Border radius
        backgroundColor: '#FFFFFF', // Background color
        boxShadow: '0px 0px 11px 0px rgba(0, 0, 0, 0.12)', // Box shadow
        p: 2,
        padding: '24px',
      // gap: '13px',
      // opacity: 1 // Opacity adjustment
    }}
  >
     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexDirection: 'row' }}>
  <Avatar src={test.imgSrc} alt={test.name} sx={{ width: 56, height: 56 }} />
  <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>
    {/* Row for name and rating */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Typography variant="body1" fontWeight="bold" sx={scheduleStyle}>
        {test.name}
      </Typography>
      <Rating value={test.rating} readOnly />
    </Box>

    {/* Date below name */}
    <Typography variant="body2" sx={scheduleStyle}>
      {test.date}
    </Typography>
  </Box>
</Box>

      <Typography
        variant="body2"
        sx={{
          fontFamily: 'Lexend',
          fontSize: '14px', // Font size
          fontWeight: 300, // Font weight
          lineHeight: '24px', // Line height
          textAlign: 'left', // Text alignment
          color: '#323A3AF', // Text color (assuming you want the text to be white on a dark background)
        //   p: 2,
          marginTop: '0px',
        //   radius: '8px', // Optional: rounding the edges slightly
        }}
      >
        {test.review}
      </Typography>
    </Box>
  ))}
</Box>


      </Grid>
    </Grid>
  </>
  );
};

export default CoachProfile;
