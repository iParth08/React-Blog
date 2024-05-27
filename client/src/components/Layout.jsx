import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import "../styles/header.css";
import "../styles/footer.css";
import "../styles/post.css";
import "../styles/register.css";
import "../styles/errorpage.css";
import "../styles/profile.css";
import "../styles/dashboard.css";
import "../styles/author.css";
import "../styles/createpost.css";

import "../styles/responsive.css";



const Layout = () => {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;
