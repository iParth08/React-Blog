import React, { useState } from "react";
import DUMMY_AUTHORS from "../assets/DummyAuthors";
import Author from "../components/Author";
import ErrorMsg from "../components/ErrorMsg";



const AuthorPage = () => {
  const [authors, setAuthors] = useState(DUMMY_AUTHORS);
  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="page-heading">
          Meet Our <span>Celestial</span> Scribe
        </h1>
        { authors.length > 0 ?
          <div className="author-placed">
            {authors.map((author) => (
              <Author key={author.authorID} author={author} />
            ))}
          </div>
          : <ErrorMsg readerMsg={`No Authors Found`} authorMsg={`We have no authors. Be One`} />
        }
      </div>
    </div>
  );
};

export default AuthorPage;
