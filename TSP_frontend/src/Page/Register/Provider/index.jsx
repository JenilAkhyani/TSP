import "./style.css";
import { useState } from "react";
import fetchUtil from "../../../Services/fetchutil";

const ProviderRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    pass: "",
    address: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchUtil('/auth/provider/signup', 'POST', formData);
      if(response.status===1){console.log('Registetration successful', response);}
      else{
        console.log('Registetration failed', response);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="pregister-container">
      <div className="title">Provider Registration</div>
      <div className="content"> 
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Full Name</span>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input
                type="text"
                id="number"
                placeholder="Enter your number"
                required
                value={formData.number}
                onChange={handleChange}
              />
            </div>
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
            <div className="input-box">
              <span className="details">Address</span>
              <textarea
                id="address"
                placeholder="Enter your address"
                required
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="button">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderRegister;
