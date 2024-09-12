import React, { useEffect, useState } from 'react';
import Render from './Render';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { Person } from '@mui/icons-material';

const CoachesPage = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Initialize navigate function

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const token = localStorage.getItem('idToken');
        if (!token) {
          throw new Error('Token is missing');
        }

        const res = await axios.get("https://4yo59jcpx0.execute-api.eu-west-2.amazonaws.com/api/coaches", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.data || !Array.isArray(res.data)) {
          throw new Error('Unexpected response format');
        }
        console.log(res.data);
        

        const formattedData = res.data.map(coach => ({
          // id: coach.id,  // Make sure the coach has an id
          name: coach.name,
          role: coach.shortSummary,
          description: coach.expertiseDescription,
          rating: coach.rating,
          image: coach.profilePicture,
          email: coach.email
        }));

        setCoaches(formattedData);
      } catch (error) {
        console.error('Error fetching coaches:', error.response ? error.response.data : error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  // function handleBookWorkout(person){
  //   // Redirect to the coach's profile page with the coachId
  //   console.log('something');
  //   console.log('coaches: ', person);
    
  //   navigate(`/coach/${person.name}`, {state: {person}});
  // };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading coaches: {error.message}</div>;

  return (
    <Render list={coaches}/>  // Pass the handleBookWorkout function as a prop
  );
};

export default CoachesPage;
