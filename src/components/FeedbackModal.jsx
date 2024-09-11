import { useState } from 'react';
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
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '552px',
    borderRadius: '16px 0px 0px 0px',
    border: '1px solid #D1D5DB',
    boxShadow: '0px 0px 11px 0px #0000001F',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

const ContentWrapper = styled(Box)({
  width: '504px',
  gap: '40px',
  display: 'flex',
  flexDirection: 'column',
});

const HeaderWrapper = styled(Box)({
  width: '504px',
  height: '64px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0px',
});

const SubmitButton = styled(Button)({
  width: '504px',
  height: '56px',
  padding: '16px 0px',
  borderRadius: '8px 0px 0px 0px',
  background: '#9EF300',
  color: '#323A3A',
  fontFamily: 'Lexend',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '24px',
  textAlign: 'center',
  '&:hover': {
    background: '#8ED900',
  },
});

const FeedbackModal = ({ open, onClose, workout }) => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    console.log('Submitting feedback:', { rating, comment });
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ padding: '24px 24px 0px 24px' }}>
        <HeaderWrapper>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Lexend',
                fontSize: '24px',
                fontWeight: 500,
                lineHeight: '40px',
                color: '#1F2937',
              }}
            >
              Workout feedback
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Lexend',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: '24px',
              color: '#4B5563',
            }}
          >
            Please rate your experience below
          </Typography>
        </HeaderWrapper>
      </DialogTitle>
      <DialogContent>
        <ContentWrapper>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={workout.trainer.image} sx={{ width: 56, height: 56 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {workout.trainer.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Certified personal {workout.type.toLowerCase()} trainer
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="body2" mr={0.5}>
                  {workout.trainer.rating}
                </Typography>
                <Rating value={workout.trainer.rating} readOnly size="small" />
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="body2">
              <strong>Type:</strong> {workout.type}
            </Typography>
            <Typography variant="body2">
              <strong>Time:</strong> {workout.time}
            </Typography>
            <Typography variant="body2">
              <strong>Date:</strong> {workout.date}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" mb={1}>
              4/5 stars
            </Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Add your comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </ContentWrapper>
      </DialogContent>
      <DialogActions>
        <SubmitButton onClick={handleSubmit}>Submit feedback</SubmitButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default FeedbackModal;