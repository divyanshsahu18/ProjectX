
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    width: '552px',
    borderRadius: '16px 16px 16px 16px',
    border: '1px solid #D1D5DB',
    boxShadow: '0px 0px 11px 0px #0000001F',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(() => ({
  fontFamily: 'Lexend',
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '24px',
  textAlign: 'left',
  color: '#1F2937',
  padding: '24px 24px 0px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledDialogContent = styled(DialogContent)(() => ({
  padding: '24px',
}));

const StyledTypography = styled(Typography)(() => ({
  fontFamily: 'Lexend',
  fontSize: '14px',
  fontWeight: 300,
  lineHeight: '24px',
  textAlign: 'left',
  color: '#323A3A',
}));

const StyledDialogActions = styled(DialogActions)(() => ({
  padding: '24px',
  justifyContent: 'center',
}));

const ResumeButton = styled(Button)(() => ({
  padding: '8px 16px',
  borderRadius: '8px',
  border: '1px solid #323A3A',
  color: '#323A3A',
  fontFamily: 'Lexend',
  fontWeight: 500,
  textTransform: 'none',
}));

const CancelButton = styled(Button)(() => ({
  padding: '8px 16px',
  borderRadius: '8px',
  backgroundColor: '#9EF300',
  color: '#323A3A',
  fontFamily: 'Lexend',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#8ED900',
  },
}));

const CancelWorkoutModal = ({ open, onClose, onCancel }) => {
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md">
      <StyledDialogTitle>
        Cancel Workout
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        <StyledTypography>
          You're about to mark this workout as canceled. Are you sure you want to
          cancel this session? Any progress or data from this workout will not be
          saved.
        </StyledTypography>
      </StyledDialogContent>
      <StyledDialogActions>
        <Box display="flex" gap={2}>
          <ResumeButton onClick={onClose}>Resume Workout</ResumeButton>
          <CancelButton onClick={onCancel}>Cancel Workout</CancelButton>
        </Box>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default CancelWorkoutModal;