// src/utils/auth.js

import { jwtDecode } from 'jwt-decode';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ApiBaseUrl = ' https://z16gkj2csh.execute-api.eu-west-2.amazonaws.com'

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

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('idToken');
    const decode = token && jwtDecode(token);
    setUser(() => ({
      given_name: decode.given_name,
      email: decode.email,
      preferable_activity: decode['custom:preferable_activity'],
      target: decode['custom:target']
    }))
  }, [])

  return { user };
}

export const getToken = () => {
  return localStorage.getItem('idToken');
}