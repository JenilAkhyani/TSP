import React, { useState } from 'react';
import './LoginToken.css';

export default function LoginToken() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleAvatarClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSignOut = () => {
    localStorage.clear();
    window.location.reload(); // or redirect to a sign-in page
  };

  const user = localStorage.getItem("user") || "";
  const initial = user.charAt(0).toUpperCase();

  return (
    <div className="logintoken">
      <div className="avatar" onClick={handleAvatarClick}>
        {initial}
      </div>
      <div className={`dropdown ${dropdownVisible ? 'active' : ''}`}>
        <div className="dropdown-item" onClick={handleSignOut}>
          Sign Out
        </div>
      </div>
    </div>
  );
}
