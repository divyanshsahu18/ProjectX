import React from 'react';
import CoachCard from './CoachCard';
import { Box } from '@mui/material';

function Render({ list, onBookWorkout }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // 4 columns layout
        gap: '32px',
        maxWidth: '1360px',
        margin: '40px auto',
        padding: '0',
        height: 'auto',
        opacity: 1,
      }}
    >
      {list.map((person, index) => (
        <CoachCard key={index} person={person}/>
      ))}
    </Box>
  );
}

export default Render;
