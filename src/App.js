import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from './store/userSlice';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import EditProfile from './components/EditProfile';
import OtpSignUp from './components/OtpSignUp';
import PasswordReset from './components/PasswordReset';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (accessToken && userData) {
      dispatch(updateUser(userData));
    }
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/validate-otp" element={<ProtectedRoute><OtpSignUp /></ProtectedRoute>} />
        <Route path="/password-reset" element={<ProtectedRoute><PasswordReset /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
