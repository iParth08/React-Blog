import React from "react";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  const {
    _id: id,
    thumbnail,
    title,
    content,
    author: authorID,
    category,
    updatedAt,
  } = post;
  const shortDesc =
    content.length > 145 ? content.slice(0, 145) + "..." : content;
  const postTitle = title.length > 40 ? title.slice(0, 40) + "..." : title;
  const poster = `${import.meta.env.VITE_ASSETS_URL}/uploads/${thumbnail}`;

  const isValidDate = (date) => {
    return !isNaN(new Date(date));
  };

  return (
    <article className="post-item">
      <div
        className="post-thumbnail"
        style={{ backgroundImage: `url(${poster})` }}
      ></div>

      <div className="post-content">
        <Link to={`/posts/${id}`}>
          <h3>{postTitle}</h3>
        </Link>

        <p dangerouslySetInnerHTML={{ __html: shortDesc }}></p>
        <div className="post-footer">
          {isValidDate(updatedAt) && (
            <PostAuthor authorID={authorID} updatedAt={updatedAt} />
          )}
          <Link to={`/posts/category/${category}`} className="btn category">
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
