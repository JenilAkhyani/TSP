import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function LoginSignup() {
  const navigate = useNavigate();
  const handleLogin = (type) => {
    if (type === "user") {
      navigate("/user/login");
    } else if (type === "provider") {
      navigate("/provider/login");
    }
  };

  const handleRegister = (type) => {
    if (type === "user") {
      navigate("/user/register");
    } else if (type === "provider") {
      navigate("/provider/register");
    }
  };
  return (
    <>
      <div className="dropdown">
        <button >
          log in
        </button>
        {(
          <div className="dropdown-menu">
            <div onClick={() => handleLogin("user")}>User</div>
            <div onClick={() => handleLogin("provider")}>Provider</div>
          </div>
        )}
      </div>
      <div className="dropdown">
        <button
        >
          sign up
        </button>
        {(
          <div className="dropdown-menu">
            <div onClick={() => handleRegister("user")}>User</div>
            <div onClick={() => handleRegister("provider")}>Provider</div>
          </div>
        )}
      </div>
    </>
  );
}

export default LoginSignup;
