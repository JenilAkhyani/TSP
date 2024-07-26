import "./style.css";
import { useState } from "react";
import fetchUtil from "../../../Services/fetchutil";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchUtil("/auth/user/login", "POST", formData);
      if (response.status === 1) {
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("type",0);
        localStorage.setItem("user",response.data.email)

        console.log("Login successful", response);
        navigate("/");
      } else {
        console.log("Registetration failed", response);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="ulogin-container">
      <div className="title">user Login</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                id="pass"
                placeholder="Enter your password"
                required
                value={formData.pass}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="button">
            <input type="submit" value="Register" />
          </div>
        </form>
        <p>Don't have an account? <Link to="/user/Register">Register here</Link></p>
      </div>
    </div>
  );
};

export default UserLogin;
