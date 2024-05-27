import React, { useState } from "react";
import DUMMY_POSTS from "../assets/DummyPosts";
import PostItem from "../components/PostItem";
import ErrorMsg from "../components/ErrorMsg";
const AuthorPosts = () => {
  const [postsArr, setPostsArr] = useState(DUMMY_POSTS);
  return (
    <div className="wrapper">
      <h1 className="page-heading">
        Posts by <span> {`${postsArr[0].author}`} </span>
      </h1>
      <section>
        {postsArr.length > 0 ? (
          <div className="container posts">
            {postsArr.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <ErrorMsg
            readerMsg={`No Posts Found`}
            authorMsg={`You have no posts. Create One`}
          />
        )}
      </section>
    </div>
  );
};

export default AuthorPosts;
