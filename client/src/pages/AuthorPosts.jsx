import React, { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import ErrorMsg from "../components/ErrorMsg";
import axios from "axios";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

const AuthorPosts = () => {
  const [postsArr, setPostsArr] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const getPosts = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/authors/${id}`
        );
        const posts = getPosts?.data;
        if (!posts) setPostsArr([]);
        else {
          setPostsArr(posts);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    const fetchAuthor = async () => {
      setIsLoading(true);
      try {
        const getAuthor = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${id}`
        );
        const author = getAuthor?.data;
        if (!author) setAuthorName("");
        else {
          setAuthorName(author.name);
        }
      } catch (error) {
        setPostsArr([]);
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchAuthor();
    fetchPosts();
  }, [id]);

  // just loader and nothing else
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="wrapper">
      <h1 className="page-heading">
        Posts by <span> {`${authorName}`} </span>
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

export default AuthorPosts;
