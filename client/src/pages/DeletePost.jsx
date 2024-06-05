import React from "react";
import redirectUnauthorized from "../util/authRedirect";
import axios from "axios";
import useUserContext from "../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";

const DeletePost = ({ postID }) => {
  redirectUnauthorized();
  const { currentUser } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const token = currentUser?.token;

  const removePost = async () => {
    try {
      const deletePost = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/posts/delete/${postID}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (deletePost.status === 200) {
        if (location.pathname === `/myposts/${currentUser?.id}`) {
          return window.location.reload();
        } else {
          navigate("/");
        }
      }
      console.log(deletePost);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="btn danger" onClick={removePost}>
      Delete
    </div>
  );
};

export default DeletePost;
