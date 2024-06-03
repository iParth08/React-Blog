import React, { useState } from "react";
import { Link } from "react-router-dom";
import profile from "../assets/images/profile.jpg";

const Author = ({ author }) => {
  const { _id: authorID, name, postCount, avatar: authorAvatar } = author;

  let avatar = profile;
  if (authorAvatar)
    avatar = `${import.meta.env.VITE_ASSETS_URL}/uploads/${author.avatar}`;

  return (
    <Link to={`/posts/authors/${authorID}`}>
      <div className="author-card">
        <div className="author-avatar">
          <img src={avatar} alt="profile picture" />
        </div>
        <div className="author-details">
          <h3>{name}</h3>
          <small>{postCount} Posts</small>
        </div>
      </div>
    </Link>
  );
};

export default Author;
