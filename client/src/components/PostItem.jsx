import React from "react";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  const { id, thumbnail, title, desc, author, authorID, category } = post;
  const shortDesc = desc.length > 145 ? desc.slice(0, 145) + "..." : desc;
  const postTitle = title.length > 40 ? title.slice(0, 40) + "..." : title;
  return (
    <article className="post-item">
      <div
        className="post-thumbnail"
        style={{ backgroundImage: `url(${thumbnail})` }}
      ></div>

      <div className="post-content">
        <Link to={`/posts/${id}`}>
          <h3>{postTitle}</h3>
        </Link>
        <p>{shortDesc}</p>
        <div className="post-footer">
          <PostAuthor author={author} authorID={authorID} />
          <Link to={`/posts/category/${category}`} className="btn category">
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
