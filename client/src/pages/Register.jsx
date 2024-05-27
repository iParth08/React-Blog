import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/register.css"; // ? useless attempt
import "../styles/profile.css";

const Register = () => {
  const [authorData, setAuthorData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setAuthorData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="wrapper">
      <div className="container form-page">
        <h3>Unlock the universe. Register now to explore the stars with us.</h3>
        <form>
          <p className="form-error">Error Message</p>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={authorData.name}
          />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            value={authorData.email}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            value={authorData.password}
          />

          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={authorData.confirmPassword}
          />

          <button type="submit" className="btn primary">
            Register
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
