import React, { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import ErrorMsg from "../components/ErrorMsg";
import axios from "axios";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

const CategoryPosts = () => {
  const [postsArr, setPostsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const getPosts = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/categories/${category}`
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
  }, [category]);

  // just loader and nothing else
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="wrapper">
      <h1 className="page-heading">
        Posts in <span>{`${category}`}</span>
      </h1>
      <section>
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
      </section>
    </div>
  );
};

export default CategoryPosts;
