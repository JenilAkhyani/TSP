import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../Toast/ShowToast";
import LoginToken from "../LoginToken/LoginToken";
import LoginSignup from "../LoginSignup/LoginSignup";
import "./Navbar.css";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();

  const handleOptions = (actionInput) => {
    if(actionInput === "home"){
      setMenu("home");
      navigate("/");
    }
    if (!localStorage.getItem("user")) {
      showToast("Please Login to access this feature", "error");
    } else {
      if (actionInput === "menu") {
        setMenu("menu");
        if (localStorage.getItem("type") === "0") {
          navigate("/user/menu");
        } else {
          navigate("/provider/menu");
        }
      } else if (actionInput === "order") {
        setMenu("order");
        // Navigate to order page if needed
      } else if (actionInput === "cart") {
        setMenu("cart");
        navigate("/cart");
      } else if(actionInput==="contact"){
        setMenu("contact");
        // Navigate to contact page if needed
      }
    }
  };

  return (
    <div className="navbar">
      <div className="logo">Meal Mate</div>
      <ul className="navbar-menu">
        <li
          onClick={() => handleOptions("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => handleOptions("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </li>
        <li
          onClick={() => handleOptions("order")}
          className={menu === "order" ? "active" : ""}
        >
          Order
        </li>
        <li
          onClick={() => handleOptions("cart")}
          className={menu === "cart" ? "active" : ""}
        >
          Cart
        </li>
        <li
          onClick={() => handleOptions("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          Contact
        </li>
      </ul>
      <div className="navbar-right">
        {localStorage.getItem("token") ? (
          <LoginToken />
        ) : (
          <LoginSignup />
        )}
      </div>
    </div>
  );
};

export default Navbar;
