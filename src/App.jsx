import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import MyAccount from "./components/MyAccount";
import Home from "./components/Home";
import CoachesPage from "./components/Coaches";
import CoachProfile from "./components/CoachProfile";

import { useState, useEffect } from "react";

import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import { ToastContainer } from "react-toastify";

const theme = createTheme({
  typography: {
    fontFamily: "Lexend, sans-serif",
  },
  palette: {
    primary: {
      main: "#B8FF3B", // Neon green color from the design
    },
    background: {
      default: "#ffffff", // White background for the whole app
    },
    text: {
      primary: "#000000", // Black primary text color
      secondary: "#757575", // Grey secondary text color
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("idToken");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position='top-center'
        autoClose={3000} // Toast will disappear after 3 seconds
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/signup' element={<SignUpForm />} />
          <Route path='/login' element={<Login />} />
          <Route path='/coachprofile' element={<CoachProfile />} />
          <Route
            path='/'
            element={
              isAuthenticated ? <Home /> : <Navigate to='/login' replace />
            }
          >
            <Route index element={<Navigate to='/dashboard' replace />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='account' element={<MyAccount />} />
            <Route path='coaches' element={<CoachesPage />} />
            <Route path='/coach/:name' element={<CoachProfile />} />
          </Route>
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
