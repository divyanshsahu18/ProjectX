import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ApiBaseUrl = 'https://f1ejdv5ij2.execute-api.eu-west-2.amazonaws.com'

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useCallback(() => {
    localStorage.removeItem('idToken');
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('idToken');
    const decode = token && jwtDecode(token);
    const tokenExpiry = new Date(decode['exp'] * 1000)
    if (new Date() > tokenExpiry) {
      logout();
    }
  }, [logout])

  return logout;
};

export const useAuth = () => {

  const [user, setUser] = useState(
    () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  );

  const fetchProfile = useCallback(async () => {
    try {
      localStorage.removeItem('user');  
      const token = getToken();
      const response = await axios.get(`${ApiBaseUrl}/api/profile`, { headers: { Authorization: `Bearer ${token}` } })

      const profile = response?.data
      console.log(profile);
      localStorage.setItem('user', JSON.stringify(response?.data))

      setUser(() => ({
        fullName: profile['fullName'],
        email: profile['email'],
        preferableActivity: profile['preferableActivity'],
        target: profile['target']
      }))

    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }

  }, [])

  useEffect(() => {
    if (!user) {
      fetchProfile()
    }
  }, [fetchProfile, user])

  return { user, refetchProfile: fetchProfile };
}

export const getToken = () => {
  return localStorage.getItem('idToken');
}