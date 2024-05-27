import React, { useState } from "react";
import { Link } from "react-router-dom";



const Login = () => {
  const [authorData, setAuthorData] = useState({
    email: "",
    password: "",
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
        <h3>The stars are calling. Log in and answer the cosmos.</h3>
        <form>
          <p className="form-error">Error Message</p>

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

          <button type="submit" className="btn primary">
            Register
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
