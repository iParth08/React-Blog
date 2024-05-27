import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";


const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        {/* logo and way to home */}
        <Link to="/" className="nav-logo">
          <img src={Logo} alt="logo" />
          <h1>
            Cosmos<span>.blog</span>
          </h1>
        </Link>

        {/* Error Message */}
        <h2>
          Error <span>404</span> : Page Not Found
        </h2>
      </div>
    </div>
  );
};

export default ErrorPage;
