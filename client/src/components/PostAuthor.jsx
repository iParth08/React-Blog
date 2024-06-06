import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import profile from "../assets/images/profile.jpg";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ updatedAt, authorID }) => {
  const [authorName, setAuthorName] = useState("");
  const [avatar, setAvatar] = useState(profile);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const getAuthor = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${authorID}`
        );
        const author = getAuthor.data;
        if (!author) setAuthorName("");
        else {
          setAuthorName(author.name);
          if (author.avatar)
            setAvatar(
              `${import.meta.env.VITE_ASSETS_URL}/uploads/${author.avatar}`
            );
          else setAvatar(profile);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAuthor();
  }, [authorID]);
  return (
    <Link to={`/posts/authors/${authorID}`} className="post-author">
      <div className="author-avatar">
        <img src={avatar} alt={authorID} />
      </div>
      <div className="author-details">
        <h5>{authorName}</h5>
        <small>
          <ReactTimeAgo date={new Date(updatedAt)} locale="en-US" />
        </small>
      </div>
    </Link>
  );
};

export default PostAuthor;
