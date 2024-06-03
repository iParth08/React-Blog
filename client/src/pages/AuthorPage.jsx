import React, { useState, useEffect } from "react";
import Author from "../components/Author";
import ErrorMsg from "../components/ErrorMsg";
import axios from "axios";
import Loader from "../components/Loader";


const AuthorPage = () => {
  const [authorsArr, setAuthorsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      setIsLoading(true);
      try {
        const getAuthors = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users`
        );
        const authors = getAuthors?.data;
        if (!authors) setAuthorsArr([]);
        else {
          setAuthorsArr(authors);
        }
      } catch (error) {
        setAuthorsArr([]);
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchAuthors();
  }, []);

  // just loader and nothing else
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="page-heading">
          Meet Our <span>Celestial</span> Scribe
        </h1>
        {authorsArr.length > 0 ? (
          <div className="author-placed">
            {authorsArr.map((author) => (
              <Author key={author._id} author={author} />
            ))}
          </div>
        ) : (
          <ErrorMsg
            readerMsg={`No Authors Found`}
            authorMsg={`We have no authors. Be One`}
          />
        )}
      </div>
    </div>
  );
};

export default AuthorPage;
