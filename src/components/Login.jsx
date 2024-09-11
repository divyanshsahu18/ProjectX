import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Container,
} from '@mui/material';
import loginImage from '../assets/Image.jpg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { ApiBaseUrl } from '../utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email address.'
    )
    .required('Email is Required'),
  password: Yup.string().required('Password is Required').min(5, ' '),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
      navigateTo('/dashboard');
    }
  }, [navigateTo]);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleLogin = async (values) => {
    const baseURL = `${ApiBaseUrl}/api/signin`;
    try {
      const response = await axios.post(baseURL, { ...values });
      const { idToken, message } = response.data;
      
      if (idToken) {
        localStorage.setItem('idToken', idToken);
        toast.success('Login successful!');
      
        // Delay navigation to give time for toast to show
        setTimeout(() => {
          navigateTo('/dashboard');
        }, 2000); // 2 seconds delay
      } else {
        toast.error('Login failed: ' + (message || 'Unknown error'));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <Container maxWidth='lg'>
       <ToastContainer 
        position="bottom-center"
        autoClose={3000} // Toast will disappear after 3 seconds
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Grid container padding={2}>
        <Grid item xs={12} sm={6}>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            height={'100%'}
          >
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, px: { sm: 10 } }}
            >
              <Typography
                component='div'
                variant='body1'
                sx={{ color: '#757575', fontSize: '12px', fontWeight: 300 }}
                gutterBottom
              >
                WELCOME BACK
              </Typography>
              <Typography
                component='div'
                variant='h5'
                sx={{
                  mb: 5,
                  fontSize: '24px',
                  fontWeight: 500,
                }}
                gutterBottom
              >
                Log in to Your Account
              </Typography>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email'
                placeholder='johnsondoe222@nomail.com'
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                placeholder='Enter Your Password'
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1,
                  backgroundColor: '#9EF300',
                  color: 'black',
                  ':hover': {
                    backgroundColor: '#9EF300',
                    opacity: 0.8,
                  },
                }}
              >
                Log In
              </Button>
              <Typography
                component={'div'}
                sx={{
                  textAlign: 'center',
                }}
              >
                {"Don't have an account? "}
                <Typography
                  sx={{
                    fontSize: '12.8px',
                    fontWeight: 600,
                    color: '#212121',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  component={Link}
                  to='/signup'
                  variant='body2'
                >
                  CREATE NEW ACCOUNT
                </Typography>
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={0} sm={6}>
          <Box
            sx={{
              height: '94vh',
              width: '100%',
              backgroundImage: `url(${loginImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography
              variant='h5'
              sx={{
                position: 'absolute',
                bottom: 20,
                left: 0,
                right: 0,
                textAlign: 'center',
                color: 'white',
                padding: '0 16px',
              }}
            >
              "The path to triumph is paved with{' '}
              <span style={{ color: '#A1F522' }}>strength to train hard</span>{' '}
              and the perseverance to{' '}
              <span style={{ color: '#A1F522' }}> rise each time you fall</span>
              ."
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
