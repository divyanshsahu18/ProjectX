import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { CalendarToday as CalendarIcon } from "@mui/icons-material";
import CancelWorkoutModal from "./CancelWorkoutModal";
import FeedbackModal from "./FeedbackModal";
import { ApiBaseUrl, useAuth } from "../utils/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(331.61deg, #628D12 -99.16%, #8ED902 142.87%)",
  padding: theme.spacing(4),
  color: "white",
}));

const WorkoutCard = styled(Card)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const ButtonContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  width: "292px",
  height: "40px",
}));

const CancelButton = styled(Button)(() => ({
  width: "140px",
  height: "40px",
  padding: "8px 16px",
  borderRadius: "8px 0px 0px 0px",
  border: "1px solid #323232",
  background: "#FFFFFF",
  color: "#323232",
  "&:hover": {
    background: "#F5F5F5",
  },
}));

const FinishButton = styled(Button)(() => ({
  width: "136px",
  height: "40px",
  padding: "8px 16px",
  borderRadius: "8px 0px 0px 0px",
  background: "#9EF300",
  color: "#323232",
  "&:hover": {
    background: "#8ED900",
  },
}));

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [workouts, setWorkouts] = useState([]);
  const [workoutsLoading, setWorkoutsLoading] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCancelClick = (workout) => {
    setSelectedWorkout(workout);
    setCancelModalOpen(true);
  };

  const handleFinishClick = (workout) => {
    setSelectedWorkout(workout);
    setFeedbackModalOpen(true);
  };

  const handleCloseCancelModal = () => {
    setCancelModalOpen(false);
    setSelectedWorkout(null);
  };

  const handleCloseFeedbackModal = () => {
    setFeedbackModalOpen(false);
    setSelectedWorkout(null);
  };

  const handleCancelWorkout = () => {
    console.log("Canceling workout:", selectedWorkout);
    handleCloseCancelModal();
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setWorkoutsLoading(true);
        const token = localStorage.getItem("idToken");
        if (!token) {
          throw new Error("Token is missing");
        }

        const res = await axios.get(`${ApiBaseUrl}/api/workouts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWorkouts(res?.data?.data?.workouts);
      } catch (error) {
        console.error(
          "Error fetching workouts:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setWorkoutsLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <Box>
      <SubHeader>
        <Typography variant={isMobile ? "h5" : "h4"}>
          Hello, {user?.given_name || "User"}!
        </Typography>
      </SubHeader>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {workoutsLoading && (
            <Grid item xs={12}>
              <WorkoutCard>
                <CardContent>
                  <div style={{ textAlign: "center" }}>
                    <Typography variant='h6'>
                      Loading workouts details.
                    </Typography>
                  </div>
                </CardContent>
              </WorkoutCard>
            </Grid>
          )}
          {!workoutsLoading && workouts.length === 0 ? (
            <Grid item xs={12}>
              <WorkoutCard>
                <CardContent>
                  <div style={{ textAlign: "center" }}>
                    <Typography variant='h6'>No Workouts Available</Typography>
                    <Button
                      variant='contained'
                      onClick={() => navigate("/coaches")}
                    >
                      Go to coaches
                    </Button>
                  </div>
                </CardContent>
              </WorkoutCard>
            </Grid>
          ) : (
            workouts.map((workout) => (
              <Grid item xs={12} sm={6} key={workout?.id}>
                <WorkoutCard>
                  <CardContent>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      mb={2}
                    >
                      <Typography variant='h6'>
                        {workout?.workoutType}
                      </Typography>
                      <Chip
                        label={workout?.status}
                        color={
                          workout?.status === "Scheduled"
                            ? "primary"
                            : workout?.status === "Finished"
                            ? "success"
                            : workout?.status === "Cancelled"
                            ? "error"
                            : "default"
                        }
                        size='small'
                      />
                    </Box>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      paragraph
                    >
                      Enhance your flexibility and balance with this calming{" "}
                      {workout?.workoutType?.toLowerCase()} session. Flow
                      through a series of poses designed to stretch and
                      strengthen your entire body while promoting relaxation.
                    </Typography>
                    {workout?.date && (
                      <Box display='flex' alignItems='center' mb={2}>
                        <CalendarIcon fontSize='small' sx={{ mr: 1 }} />
                        <Typography variant='body2'>{workout?.date}</Typography>
                      </Box>
                    )}
                  </CardContent>
                  {workout?.status !== "Finished" || workout?.status !== "Cancelled" (
                    <Box p={2} pt={0}>
                      {workout?.status === "Scheduled" && (
                        <ButtonContainer>
                          <CancelButton
                            onClick={() => handleCancelClick(workout)}
                          >
                            Cancel Workout
                          </CancelButton>
                          <FinishButton
                            onClick={() => handleFinishClick(workout)}
                          >
                            Finish Workout
                          </FinishButton>
                        </ButtonContainer>
                      )}
                      {workout?.status !== "Scheduled" && (
                        <Button
                          variant='outlined'
                          color='inherit'
                          fullWidth
                          sx={{ height: "40px" }}
                          onClick={() => handleFinishClick(workout)}
                        >
                          Leave Feedback
                        </Button>
                      )}
                    </Box>
                  )}
                </WorkoutCard>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
      <CancelWorkoutModal
        open={cancelModalOpen}
        onClose={handleCloseCancelModal}
        onCancel={handleCancelWorkout}
      />
      {selectedWorkout && (
        <FeedbackModal
          open={feedbackModalOpen}
          onClose={handleCloseFeedbackModal}
          workout={{
            id: selectedWorkout?.id,
            type: selectedWorkout.workoutType,
            time: selectedWorkout.duration,
            date: selectedWorkout?.date,
            trainer: {
              name: selectedWorkout?.coachEmail,
              image: "/placeholder.svg?height=56&width=56",
              rating: 4.96,
            },
          }}
        />
      )}
    </Box>
  );
};

export default Dashboard;
