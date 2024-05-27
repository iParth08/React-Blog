import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="container category-list">
        <li>
          <Link to="posts/category/Agriculture">Agriculture</Link>
        </li>
        <li>
          <Link to="posts/category/Mythology">Mythology</Link>
        </li>
        <li>
          <Link to="posts/category/Ancient-Aliens">Ancient Alien</Link>
        </li>
        <li>
          <Link to="posts/category/Goldilock">Goldilock</Link>
        </li>
        <li>
          <Link to="posts/category/Star-and-Nebula">Star and Nebula</Link>
        </li>
        <li>
          <Link to="posts/category/Observatory">Observatory</Link>
        </li>
        <li>
          <Link to="posts/category/Theory">Theory</Link>
        </li>
        <li>
          <Link to="posts/category/Space-Agency">Space Agency</Link>
        </li>
        <li>
          <Link to="posts/category/Future-Mission">Future Mission</Link>
        </li>
      </ul>
      <div className="container copyright">
        <p>Copyright © 2022. All rights reserved, Space.blog</p>
      </div>
    </footer>
  );
};

export default Footer;
