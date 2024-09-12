import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  Button,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { styled } from '@mui/system';
import {
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import icon from '../assets/icon.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth, useLogout } from '../utils/auth';

const StyledAppBar = styled(AppBar)(() => ({
  background: '#FFFFFF',
  boxShadow: 'none',
  borderBottom: '1px solid #E0E0E0',
}));

const Logo = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
}));

const NavItem = styled(({ isActive, ...props }) => <Typography {...props} />)(({ isActive, theme }) => ({
  color: '#323A3A',
  cursor: 'pointer',
  marginRight: theme.spacing(3),
  position: 'relative',
  textDecoration: 'none',
  padding: '0px 0px 8px 0px',
  height: '32px',
  whiteSpace: 'nowrap',
  '&::after': {
    content: '""',
    display: isActive ? 'block' : 'none',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: '#9EF300',
    transition: 'width 0.3s ease',
  },
}));


export default function Header() {
  const navigateTo = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [anchorElUser, setAnchorElUser] = useState(null);
  const logout = useLogout();
  const { user } = useAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isActive = (path) => pathname === path;

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };
  return (
    <StyledAppBar position='static'>
      <Toolbar>
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 5, flexGrow: 1 }}
        >
          <Logo component={Link} to='/'>
            <img
              src={icon}
              alt='EnergyX Icon'
              style={{ width: '24px', height: '24px' }}
            />
            <Typography variant='h6' component='div' sx={{ color: '#323A3A' }}>
              EnergyX
            </Typography>
          </Logo>
          <Box>
          <NavItem component={Link} to='/dashboard' isActive={isActive('/dashboard')}>
              Workouts
            </NavItem>
            <NavItem component={Link} to='/coaches' isActive={isActive('/coaches')}>
              Coaches
            </NavItem>
          </Box>
        </Box>
        <Box>
          <IconButton color='inherit'>
            <NotificationsIcon />
          </IconButton>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Box sx={{ px: 3, py: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <div>{user?.fullName || 'user'}</div>
                <small>{user?.email || 'johnsondoe@nomail.com'}</small>
              </Box>
              <hr />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  handleCloseUserMenu();
                  navigateTo('/account');
                }}
              >
                <TuneIcon />
                <div>
                  <div>My Account</div>
                  <small>Edit Account Profile</small>
                </div>
              </Box>
              <hr />
              <Box sx={{ textAlign: 'center' }}>
                <Button variant='outlined' fullWidth onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
