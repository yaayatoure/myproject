import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Navbar from './views/Navbar';
import Registerpage from './views/Registerpage';

import PasswordResetRequest from './components/PasswordResetRequest';
import PasswordReset from './components/PasswordReset';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  const location = useLocation();
  const noNavbar = location.pathname === '/dashboard' || location.pathname === '/login'  || location.pathname === '/register'  || location.pathname.includes('password') ; // you can expand this condition later
  console.log('location',location);
  return (
    <>
    
      {noNavbar ? (
        // Pages without navbar
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/request/password_reset" element={<PasswordResetRequest/>}/>
          <Route path="/password-reset/:token" element={<PasswordReset/>}/>
        </Routes>
      ) : (
        // Pages with navbar
        <Navbar
          content={
            <Routes>
             <Route element={<ProtectedRoute/>}> 
             
             <Route path="/" element={<Dashboard />} />
             </Route>
              
              
              {/* Avoid this route — you don’t want to render Navbar inside itself */}
              {/* <Route path="/navbar" element={<Navbar />} /> */}
            </Routes>
          }
        />
      )}
    </>
  );
}

export default App;
