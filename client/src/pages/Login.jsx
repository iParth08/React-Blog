import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useUserContext from "../context/userContext";


const Login = () => {

  const [authorData, setAuthorData] = useState({
    email: "",
    password: "",
  });

  const { setCurrentUser } = useUserContext();

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuthorData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        authorData
      );
      const user = await response.data;
      if (!user) {
        setErrorMsg("Could not login user. Please try again.");
      }
      setCurrentUser(user.data);
      console.log(user);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };
  return (
    <div className="wrapper">
      <div className="container form-page">
        <h1>
          The stars are calling. <span>Log In</span> and answer the cosmos.
        </h1>
        <form onSubmit={loginUser}>
          {errorMsg && <p className="form-error">{errorMsg}</p>}

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
            Login
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
