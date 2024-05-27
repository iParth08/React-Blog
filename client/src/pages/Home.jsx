import React from "react";
import Posts from "../components/Posts";

const Home = () => {
  return (
    <div className="wrapper">
      <h1 className="page-heading">
        Where <span>Curiosity</span> Meets the Cosmos
      </h1>
      <section>
        <Posts />
      </section>
    </div>
  );
};

export default Home;
