import React from "react";
import redirectUnauthorized from "../util/authRedirect";

const DeletePost = () => {
  redirectUnauthorized();
  return <div>DeletePost</div>;
};

export default DeletePost;
