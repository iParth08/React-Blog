import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/images/avatar3.jpg"; //? Dummy, need data here

const PostAuthor = ({ author, authorID }) => {
  return (
    <Link to={`/posts/authors/${authorID}`} className="post-author">
      <div className="author-avatar">
        <img src={avatar} alt={author} />
      </div>
      <div className="author-details">
        <h5>{author}</h5>
        <small>Just Now</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
