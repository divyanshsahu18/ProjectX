import React from 'react';
import { Box, Typography } from '@mui/material';

const UpcomingWorkouts = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 0 11px rgba(0,0,0,0.1)',
        padding: '24px',
        marginBottom: '24px',
      }}
    >
      <Typography variant="h6" color="#323A3A" gutterBottom>
        Upcoming Workouts
      </Typography>
      <Box sx={{ padding: '16px', backgroundColor: '#F0F8FF', borderRadius: '8px' }}>
        <Typography variant="body1" color="#00796B">
          Yoga - July 7, 12:30 PM
        </Typography>
        <Typography variant="body2" color="#757575">
          1 hour
        </Typography>
      </Box>
    </Box>
  );
};

export default UpcomingWorkouts;
