import React, { useState, useEffect } from "react";
import PostAuthor from "../components/PostAuthor";
import DUMMY_POSTS from "../assets/DummyPosts";
import { Link } from "react-router-dom";
import useUserContext from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";
import DeletePost from "../pages/DeletePost";
import EditPost from "../pages/EditPost";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const [post, setPost] = useState(DUMMY_POSTS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { currentUser } = useUserContext();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);

      try {
        const getPost = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/${id}`
        );
        const post = await getPost.data;
        if (!post) setPost({});
        else {
          setPost(post);
          console.log(post.updatedAt);
        }
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchPost();
  }, [id]);

  if (isLoading) return <Loader />;

  const {
    _id: postID,
    thumbnail,
    title,
    content,
    author: authorID,
    category,
    updatedAt,
  } = post;

  const isValidDate = (date) => {
    return !isNaN(new Date(date));
  };

  return (
    <div className="wrapper post-details">
      <div className="container post-card">
        <div className="post-header">
          {/* the below line is causing type error for updatedAt when refreshing */}
          {isValidDate(updatedAt) && (
            <PostAuthor authorID={authorID} updatedAt={updatedAt} />
          )}

          {currentUser?.id === authorID && (
            <div className="mypost-controls">
              <Link to={`/posts/${postID}/edit`} className="btn primary">
                Edit
              </Link>
              <Link to={`/posts/${postID}/delete`} className="btn danger">
                Delete
              </Link>
            </div>
          )}
        </div>
        <div className="post-contents">
          <h1>{title}</h1>
          <img
            src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${thumbnail}`}
            alt=""
          />
          <section>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
