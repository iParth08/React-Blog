import React, { useState } from "react";
import DUMMY_POSTS from "../assets/DummyPosts"; // ? Dummy, data needed
import ErrorMsg from "../components/ErrorMsg";
import PostItem from "../components/PostItem";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [postsArr, setPostsArr] = useState(DUMMY_POSTS);
  // const [postsArr, setPostsArr] = useState([]);

  return (
    <div className="wrapper">
      <h1 className="page-heading">
        Dashboard : <span>Manage</span> Your Posts
      </h1>

      {postsArr.length > 0 ? (
        <div className="container dashboard-posts">
          {postsArr.map((post) => (
            <article key={post.id} className="dash-post-item">
              <div className="post-data">
                <img src={post.thumbnail} alt="" />
                <h5>{post.title}</h5>
              </div>
              <div className="post-action">
                <Link to={`/posts/${post.id}`} className="btn sm">
                  View
                </Link>
                <Link to={`/posts/${post.id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <Link to={`/posts/${post.id}/delete`} className="btn sm danger">
                  Delete
                </Link>
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
