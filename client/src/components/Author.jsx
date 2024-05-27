import React from "react";
import { Link } from "react-router-dom";

const Author = ({ author }) => {
  return (
    <Link to={`/posts/authors/${author.authorID}`}>
      <div className="author-card">
        <div className="author-avatar">
          <img src={author.avatar} alt="" />
        </div>
        <div className="author-details">
          <h3>{author.author}</h3>
          <small>{author.postCount} Posts</small>
        </div>
      </div>
    </Link>
  );
};

export default Author;
