import React, { useState } from "react";
import DUMMY_POSTS from "../assets/DummyPosts"; // ? Dummy, data needed
import PostItem from "./PostItem";
import ErrorMsg from "./ErrorMsg";



const Posts = () => {
  const [postsArr, setPostsArr] = useState(DUMMY_POSTS);
  // const [postsArr, setPostsArr] = useState([]);

  return (
    <>
      {postsArr.length > 0 ? (
        <div className="container posts">
          {postsArr.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <ErrorMsg readerMsg={`No Posts Found`} authorMsg={`You have no posts. Create One`} />
      )}
    </>
  );
};

export default Posts;
