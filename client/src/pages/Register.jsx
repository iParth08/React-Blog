import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [authorData, setAuthorData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuthorData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        authorData
      );

      const newUser = await response.data;

      if (!newUser) {
        setErrorMsg("Could not register user. Please try again.");
      }
      navigate("/login");
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="container form-page">
        <h1 className="page-heading">
          Unlock the universe. <span>Register</span> now to explore.
        </h1>
        <form onSubmit={registerUser}>
          {errorMsg && <p className="form-error">{errorMsg}</p>}
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
