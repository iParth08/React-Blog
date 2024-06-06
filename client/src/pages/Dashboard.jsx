import React, { useState, useEffect } from "react";
import ErrorMsg from "../components/ErrorMsg";
import { Link, useParams } from "react-router-dom";
import redirectUnauthorized from "../util/authRedirect";
import DeletePost from "./DeletePost";
import Loader from "../components/Loader";
import axios from "axios";

const Dashboard = () => {
  redirectUnauthorized();
  const { id: authorID } = useParams();

  const [postsArr, setPostsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const getPosts = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/authors/${authorID}`
        );
        const posts = getPosts?.data;
        if (!posts) setPostsArr([]);
        else {
          setPostsArr(posts);
        }
      } catch (error) {
        setPostsArr([]);
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="wrapper">
      <h1 className="page-heading">
        Dashboard : <span>Manage</span> Your Posts
      </h1>

      {postsArr.length > 0 ? (
        <div className="container dashboard-posts">
          {postsArr.map((post) => (
            <article key={post._id} className="dash-post-item">
              <div className="post-data">
                <img
                  src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${
                    post.thumbnail
                  }`}
                  alt="thumbnail"
                />
                <h4>
                  <i>{post.title}</i>
                </h4>
              </div>
              <div className="post-action">
                <Link to={`/posts/${post._id}`} className="btn sm common">
                  View
                </Link>
                <Link to={`/posts/${post._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost postID={post._id} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <ErrorMsg
          readerMsg={`No Posts Found`}
          authorMsg={`You have no posts. Create One`}
        />
      )}
    </div>
  );
};

export default Dashboard;
