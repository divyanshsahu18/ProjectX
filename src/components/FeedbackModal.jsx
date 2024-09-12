import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Avatar,
  Rating,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { ApiBaseUrl, getToken, useAuth } from "../utils/auth";
import axios from "axios";
import { toast } from "react-toastify";

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    padding: "14px",
  },
}));

const CloseIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    style={{ cursor: "pointer" }}
  >
    <path
      d='M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z'
      fill='#6C6F80'
    />
  </svg>
);

const StarIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M7.52175 2.30229C7.6754 1.991 7.75223 1.83535 7.85653 1.78562C7.94728 1.74236 8.0527 1.74236 8.14345 1.78562C8.24775 1.83535 8.32458 1.991 8.47823 2.30229L9.93602 5.2556C9.98138 5.3475 10.0041 5.39345 10.0372 5.42913C10.0666 5.46072 10.1018 5.48631 10.1409 5.5045C10.185 5.52503 10.2357 5.53244 10.3371 5.54726L13.598 6.02389C13.9414 6.07408 14.113 6.09917 14.1925 6.18304C14.2616 6.25601 14.2941 6.35628 14.281 6.45593C14.2659 6.57047 14.1416 6.69153 13.893 6.93367L11.5343 9.23103C11.4608 9.30264 11.424 9.33845 11.4003 9.38106C11.3793 9.41878 11.3658 9.46022 11.3606 9.50309C11.3547 9.5515 11.3634 9.60208 11.3807 9.70324L11.9373 12.9482C11.996 13.2904 12.0253 13.4615 11.9702 13.5631C11.9222 13.6514 11.8369 13.7134 11.738 13.7317C11.6244 13.7528 11.4707 13.672 11.1634 13.5104L8.24823 11.9773C8.1574 11.9295 8.11199 11.9057 8.06414 11.8963C8.02178 11.888 7.9782 11.888 7.93584 11.8963C7.888 11.9057 7.84258 11.9295 7.75175 11.9773L4.8366 13.5104C4.52926 13.672 4.37559 13.7528 4.26196 13.7317C4.1631 13.7134 4.07779 13.6514 4.0298 13.5631C3.97465 13.4615 4.004 13.2904 4.0627 12.9482L4.61924 9.70324C4.63659 9.60208 4.64526 9.5515 4.63939 9.50309C4.6342 9.46022 4.62072 9.41878 4.59972 9.38106C4.57599 9.33845 4.53923 9.30264 4.4657 9.23103L2.10702 6.93367C1.85842 6.69153 1.73412 6.57047 1.719 6.45593C1.70584 6.35628 1.73835 6.25601 1.80748 6.18304C1.88694 6.09917 2.05863 6.07408 2.40201 6.02389L5.66285 5.54726C5.76426 5.53244 5.81497 5.52503 5.85912 5.5045C5.89822 5.48631 5.93342 5.46072 5.96277 5.42913C5.99592 5.39345 6.0186 5.3475 6.06396 5.2556L7.52175 2.30229Z'
      fill='#FDD63B'
      stroke='#FDD63B'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const SubmitButton = styled(Button)({
  width: "100%",
  height: "56px",
  padding: "16px 0px",
  borderRadius: "8px",
  background: "#9EF300",
  color: "#323A3A",
  fontFamily: "Lexend",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "24px",
  textAlign: "center",
  "&:hover": {
    background: "#8ED900",
  },
});

const FeedbackModal = ({ open, onClose, workout }) => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const handleSubmit = async () => {
    console.log("Submitting feedback:", { rating, comment });
    const baseURL = `${ApiBaseUrl}/api/client/feedback`;
    try {
      const token = getToken();
      const value = {
        booking_id: workout?.id,
        feedback_id: workout?.id,
        rating: rating || 0,
        notes: comment,
        createdDate: workout?.date || new Date().toISOString(),
      };
      const response = await axios.post(baseURL, value, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);

      toast.success("Thank You For Your Feedback !");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box>
          <DialogTitle sx={{ fontWeight: 500, padding: "0" }}>
            Workout feedback
          </DialogTitle>
          <Typography
            variant='body2'
            sx={{
              fontFamily: "Lexend",
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: "24px",
              color: "#4B5563",
              marginLeft: "24px",
            }}
          >
            Please rate your experience below
          </Typography>
        </Box>
        <Box onClick={onClose} sx={{ cursor: "pointer" }}>
          <CloseIcon />
        </Box>
      </Box>
      <DialogContent>
        <Box display='flex' marginBottom={3}>
          <Avatar src={workout.trainer.image} sx={{ width: 64, height: 64 }} />
          <Box marginLeft='18px'>
            <Typography variant='body1'>{workout.trainer.name}</Typography>
            <Typography
              variant='body2'
              sx={{ fontWeight: 300, marginTop: "4px" }}
            >
              Certified personal {workout?.type?.toLowerCase()} trainer
            </Typography>
            <Box display='flex' alignItems='center' marginTop={2}>
              <Typography
                variant='body2'
                sx={{ fontWeight: 300, marginRight: "4px" }}
              >
                {workout?.trainer?.rating}
              </Typography>
              <StarIcon />
            </Box>
          </Box>
          <Box marginLeft={6} display='flex' flexDirection='column'>
            <Typography variant='body2' sx={{ fontWeight: 300 }}>
              <strong>Type:</strong> {workout?.type}
            </Typography>
            <Typography
              variant='body2'
              sx={{ fontWeight: 300, margin: "0.8rem 0" }}
            >
              <strong>Time:</strong> {workout?.time}h
            </Typography>
            <Typography variant='body2' sx={{ fontWeight: 300 }}>
              <strong>Date:</strong> {workout?.date}
            </Typography>
          </Box>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          marginTop={5}
        >
          <Rating
            name='feedback-rating'
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            size='large'
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            variant='outlined'
            placeholder='Add your comments'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{
              marginTop: "2rem",
              fontFamily: "Lexend",
              width: "100%",
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <SubmitButton onClick={handleSubmit}>Submit feedback</SubmitButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default FeedbackModal;
