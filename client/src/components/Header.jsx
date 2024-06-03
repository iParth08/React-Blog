import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import useUserContext from "../context/userContext";

import Logo from "../assets/images/logo.png";

const Header = () => {
  // ! loggedIn Author
  const { currentUser } = useUserContext();

  const authorID = currentUser?.id;
  const authorName = currentUser?.name;

  // pathname
  const { pathname } = useLocation();

  // mobile device, navbar toggle
  const [showNav, setShowNav] = useState(window.innerWidth > 900);

  // closeNav on small window
  const closeNavHandler = () => {
    if (window.innerWidth < 900) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", closeNavHandler);

    // Call handleResize initially to set correct state
    closeNavHandler();

    return () => {
      window.removeEventListener("resize", closeNavHandler);
    };
  }, []);

  // change to dark on scroll
  useEffect(() => {
    window.onscroll = function () {
      const nav = document.querySelector("nav");
      nav.classList.toggle("dark", window.scrollY > 100);
    };
  }, [window.scrollY]);

  //scroll on top :
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // display nav on big screen
  useEffect(() => {
    closeNavHandler();
  }, []);

  return (
    <nav>
      <div className="container navbar">
        {/* logo and way to home */}
        <Link to="/" className="nav-logo" onClick={() => closeNavHandler()}>
          <img src={Logo} alt="logo" />
          <h1>
            Cosmos<span>.blog</span>
          </h1>
        </Link>

        {/* links */}
        {authorID && showNav && (
          <ul className="nav-menu" onClick={() => closeNavHandler()}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={`/profile/${authorID}`}>{authorName}</Link>
            </li>
            <li>
              <Link to="/create">New Post</Link>
            </li>
            <li>
              <Link to="/authors">Authors</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        )}
        {!authorID && showNav && (
          <ul className="nav-menu" onClick={() => closeNavHandler()}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/authors">Authors</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
        {/* toggle bar for mobile view */}
        <div className="nav-toggle" onClick={() => setShowNav(!showNav)}>
          {showNav ? <AiOutlineClose /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Header;
