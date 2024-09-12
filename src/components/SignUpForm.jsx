import { useState } from 'react';
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
  Stack,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import gymImg from '../assets/Image.jpg';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { ApiBaseUrl } from '../utils/auth';

const validationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name is required')
    .max(20, 'Name must be 1-20 characters long')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .regex(/(?=.*[a-z])/, 'Password must include at least one lowercase letter')
    .regex(/(?=.*[A-Z])/, 'Password must include at least one uppercase letter')
    .regex(/(?=.*\d)/, 'Password must include at least one number')
    .regex(/(?=.*[@$!%?&])/, 'Password must include at least one special character'),
  target: z.string().nonempty('Please select a target'),
  preferableActivity: z.string().nonempty('Please select a preferable activity'),
});

function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [target, setTarget] = useState('');
  const [activity, setActivity] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [targets] = useState([
    { value: 'lose_weight', label: 'Lose weight' },
    { value: 'build_muscle', label: 'Build muscle' },
    { value: 'improve_endurance', label: 'Improve endurance' },
  ]);

  const [activities] = useState([
    { value: 'yoga', label: 'Yoga' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'strength_training', label: 'Strength Training' },
  ]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    try {
      validationSchema.parse({
        name,
        email,
        password,
        target,
        preferableActivity: activity,
      });
      setErrors({});
      return true;
    } catch (error) {
      const fieldErrors = error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const apiRegister =
      `${ApiBaseUrl}/api/signup`;

    const userData = {
      fullName: name,
      email: email,
      password: password,
      target: target,
      preferableActivity: activity,
    };

    try {
      const response = await axios.post(apiRegister, userData);
      alert('User created successfully! Check the console for API response.');
    } catch (error) {
      alert('Failed to create user. Check the console for details.');
    }
  };

  return (
    <Container maxWidth='lg'>
      <Grid container padding={2}>
        {/* Left Side - Form */}
        <Grid item xs={12} md={6}>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            height={'100%'}
          >
            <Box sx={{ px: { xs: 0, sm: 10 } }}>
              <Typography
                variant='h6'
                gutterBottom
                sx={{ color: '#757575', fontSize: '12px', fontWeight: 300 }}
              >
                LET&apos;S GET YOU STARTED
              </Typography>
              <Typography
                variant='h5'
                gutterBottom
                sx={{ fontSize: '24px', fontWeight: 500 }}
              >
                Create an Account
              </Typography>
              <Box
                component='form'
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit}
              >
                <TextField
                  fullWidth
                  label='Your Name'
                  margin='normal'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant='outlined'
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  fullWidth
                  label='Email'
                  margin='normal'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant='outlined'
                  type='email'
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  fullWidth
                  label='Password'
                  margin='normal'
                  variant='outlined'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label='Your target'
                  margin='normal'
                  variant='outlined'
                  select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  error={!!errors.target} // Display target error
                  helperText={errors.target}
                >
                  {targets.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label='Preferable Activity'
                  margin='normal'
                  variant='outlined'
                  select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  error={!!errors.preferableActivity} // Display activity error
                  helperText={errors.preferableActivity}
                >
                  {activities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
                  Create An Account
                </Button>
                <Typography variant='body2' align='center'>
                  Already have an account?{' '}
                  <Typography
                    sx={{
                      fontSize: '12.8px',
                      fontWeight: 600,
                      color: '#212121',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                    component={Link} // Use Link component here
                    to='/login'
                    variant='body2'
                  >
                    LOGIN HERE
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>

        {/* Right Side - Image and Quote */}
        <Grid item xs={0} md={6}>
          <Box
            sx={{
              height: '94vh',
              width: '100%',
              backgroundImage: `url(${gymImg})`,
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
              “The path to triumph is paved with{' '}
              <span style={{ color: '#A1F522' }}>strength to train hard</span>{' '}
              and the perseverance to{' '}
              <span style={{ color: '#A1F522' }}> rise to the challenge</span>.”
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUpForm;
