import React from "react";
import PostAuthor from "../components/PostAuthor";
import DUMMY_POSTS from "../assets/DummyPosts";
import { Link } from "react-router-dom";
const PostDetail = () => {
  const { author, authorID, id, thumbnail, title, content } = DUMMY_POSTS[0];
  return (
    <div className="wrapper post-details">
      <div className="container post-card">
        <div className="post-header">
          <PostAuthor author={author} authorID={authorID} />
          <div className="mypost-controls">
            <Link to={`/posts/${id}/edit`} className="btn primary">Edit</Link>
            <Link to={`/posts/${id}/delete`} className="btn danger">Delete</Link>
          </div>
        </div>
        <div className="post-contents">
          <h1>{title}</h1>
          <img src={thumbnail} alt="" />
          <section>
            {content} {/* ! HTML PARSE */}
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia, vero eligendi. Laudantium, hic ipsa! Cumque tenetur impedit hic officiis praesentium, laboriosam libero eum facilis culpa aliquid quidem iure at molestias nisi. Cumque quasi, magnam labore assumenda neque mollitia deserunt ea optio fugiat, ipsum dolorum ex voluptas. At rem earum aperiam?</p>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, nostrum. Omnis nesciunt excepturi voluptates, quod quia quibusdam placeat iusto, totam cumque repellendus saepe repudiandae possimus corrupti harum cupiditate suscipit veritatis, quaerat ipsam. Ullam esse quia qui, exercitationem similique ipsa porro nihil quam hic accusamus rem suscipit laborum natus odio fugiat ea ut, est eaque vero harum? Maiores, in architecto hic pariatur debitis praesentium molestias explicabo sunt.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
