import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Container, styled } from "@mui/system";
import { ApiBaseUrl, getToken, useAuth, useLogout } from "../utils/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SubHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(331.61deg, #628D12 -99.16%, #8ED902 142.87%)",
  padding: theme.spacing(4),
  color: "white",
}));

const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: "0 auto",
}));

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Name is required")
    .min(2, "Name is required")
    .max(20, "Name must be 1-20 characters long")
    .matches(
      /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
      "Name can only contain letters and No leading and trailing spaces allowed"
    ),
  target: Yup.string().required("Please select a target"),
  preferableActivity: Yup.string().required(
    "Please select a preferable activity"
  ),
});

export default function MyAccount() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { user, refetchProfile } = useAuth();

  const logout = useLogout();

  const getNameInitials = (string = "") => {
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const handleUpdateProfile = async (values) => {
    console.log(values);
    const baseURL = `${ApiBaseUrl}/api/profile`;
    try {
      const token = getToken();
      const response = await axios.put(
        baseURL,
        { ...values },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      refetchProfile();
      toast.success("Profile updated successfully");
    } catch (error) {
      alert(error.message || error.response?.data?.message);
    }
  };

  const {
    values: { fullName, target, preferableActivity },
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      fullName: "johndoe",
      target: "build_muscle",
      preferableActivity: "yoga",
    },
    validationSchema,
    onSubmit: handleUpdateProfile,
  });

  useEffect(() => {
    setFieldValue("fullName", user?.fullName || "johndoe");
    setFieldValue("target", user?.target || "build_muscle");
    setFieldValue("preferableActivity", user?.preferableActivity || "yoga");
  }, [setFieldValue, user]);

  return (
    <Box>
      <SubHeader>
        <Typography variant={isMobile ? "h5" : "h4"}>My Account</Typography>
      </SubHeader>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Typography
                variant='h6'
                sx={{ padding: 2, mb: 3, borderLeft: "5px solid #8ED902" }}
                gutterBottom
              >
                GENERAL INFORMATION
              </Typography>
              <Box display='flex' justifyContent='space-between'>
                <Button variant='outlined' color='primary' onClick={logout}>
                  Log Out
                </Button>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Container maxWidth='md'>
                <Grid container spacing={3}>
                  <Grid item xs={9} display='flex' alignItems='center' mb={2}>
                    <Avatar sx={{ width: 64, height: 64, mr: 2 }}>
                      {getNameInitials(user?.fullName) || "JD"}
                    </Avatar>
                    <Box>
                      <Typography variant='h6'>
                        {user?.fullName || "Johnson Doe"}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {user?.email || "johnsondoe@nomail.com"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      label='Your Name'
                      variant='outlined'
                      name='fullName'
                      value={fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors?.fullName}
                      helperText={errors?.fullName}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <FormControl fullWidth variant='outlined'>
                      <InputLabel>Your target</InputLabel>
                      <Select
                        label='Your target'
                        name='target'
                        value={target}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors?.target}
                        helperText={errors?.target}
                      >
                        <MenuItem value='lose_weight'>Lose weight</MenuItem>
                        <MenuItem value='build_muscle'>Build muscle</MenuItem>
                        <MenuItem value='improve_fitness'>
                          Improve fitness
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={9}>
                    <FormControl fullWidth variant='outlined'>
                      <InputLabel>Preferable Activity</InputLabel>
                      <Select
                        label='Preferable Activity'
                        name='preferableActivity'
                        value={preferableActivity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors?.preferableActivity}
                        helperText={errors?.preferableActivity}
                      >
                        <MenuItem value='cardio'>Cardio</MenuItem>
                        <MenuItem value='yoga'>Yoga</MenuItem>
                        <MenuItem value='fitness'>Fitness</MenuItem>
                        <MenuItem value='rock-climbing'>Rock Climbing</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={9}>
                    <Box display='flex' justifyContent='flex-end'>
                      <Button variant='contained' color='primary' type='submit'>
                        Save Changes
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </form>
      </FormContainer>
    </Box>
  );
}
