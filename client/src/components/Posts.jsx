import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import ErrorMsg from "./ErrorMsg";
import axios from "axios";
import Loader from "./Loader";

const Posts = () => {
  const [postsArr, setPostsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const getPosts = await axios.get(
          `api/posts`
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

  // just loader and nothing else
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {postsArr.length > 0 ? (
        <div className="container posts">
          {postsArr.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <ErrorMsg
          readerMsg={`No Posts Found`}
          authorMsg={`You have no posts. Create One`}
        />
      )}
    </>
  );
};

export default Posts;
