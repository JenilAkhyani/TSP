// src/components/Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = ['/user/login', '/user/register','/provider/login', '/provider/register'].includes(location.pathname);
  return (
    <div>
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
