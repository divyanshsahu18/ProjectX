import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star'; 
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function CoachCard({ person }) {
  return (
    <Card
      sx={{
        width: '316px',
        height: '450px',
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 0px 11px 0px #0000001F',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={person.image}
        alt={person.name}
        sx={{ borderRadius: '16px 16px 0 0' }}
      />
      <CardContent sx={{ padding: '16px', flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant="h6" component="div" color="#4B5563">
            {person.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
           
            <Typography variant="body2" color="#4B5563">
              {person.rating}
            </Typography>
            {/* <StarIcon sx={{ color: '#FFD700', fontSize: '20px', marginRight: '4px' }} />   */}
            <Stack spacing={1}>
            <Rating
              name="overall-rating"
              value={Number(person.rating)/10}
              max={1} // no.of stars
              precision={0.5} //
              readOnly />
          </Stack>
          </Box>
        </Box>
        <Typography variant="body2" color="#4B5563" fontSize='12px' fontWeight='300' lineHeight='12px' sx={{ mt: 1 }}>
          {person.role}
        </Typography>
        <Typography variant="body2" color="#4B5563" fontSize='14px' fontWeight='300' lineHeight='24px' sx={{ mt: 1 }}>
          {person.description}
        </Typography>
      </CardContent>
      <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
        <Button
          sx={{
            width: '100%',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: '#9EF300',
            color: '#323A3A',
            fontWeight:'500',
            fontSize:'14px',
            lineHeight:'24px',
            textTransform: 'none',
            textAlign:'center'
          }}
          variant="contained"
        >
          Book Workout
        </Button>
      </Box>
    </Card>
  );
}

export default CoachCard;
