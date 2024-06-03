import React from "react";
import { Link } from "react-router-dom";

const categoryList = [
  "Uncategorized",
  "News and Discoveries",
  "Space Exploration",
  "Ancient Aliens",
  "Astrobiology",
  "Astronomical Events",
  "Cosmology",
  "Astrophysics",
  "Space Technology",
  "Space History",
  "Amateur Astronomy",
  "Future Mission",
];

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="container category-list">
        {categoryList.map((category, index) => (
          <li key={index}>
            <Link to={`/posts/category/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
      <div className="container copyright">
        <p>Copyright © 2022. All rights reserved, Space.blog</p>
      </div>
    </footer>
  );
};

export default Footer;
