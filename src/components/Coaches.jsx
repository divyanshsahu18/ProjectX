import React, { useEffect, useState } from 'react';
import Render from './Render';
import axios from 'axios';
 
const CoachesPage = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const token = localStorage.getItem('idToken');
        if (!token) {
          throw new Error('Token is missing');
        }
 
        const res = await axios.get("https://hh4p1l8j0b.execute-api.eu-west-2.amazonaws.com/api/coaches", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
 
        if (!res.data || !Array.isArray(res.data)) {
          throw new Error('Unexpected response format');
        }
 
        const formattedData = res.data.map(coach => ({
          name: coach.name,
          role: coach.shortSummary,
          description: coach.expertiseDescription,
          rating: coach.rating,
          image: coach.profilePicture
        }));
 
        setCoaches(formattedData);
      } catch (error) {
        console.error('Error fetching coaches:', error.response ? error.response.data : error.message);
      }
      finally {
        setLoading(false);
      }
    };
 
    fetchCoaches();
  }, []);
 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading coaches: {error.message}</div>;
 
  return (
    <Render list={coaches} />
  );
};
 
export default CoachesPage;
 