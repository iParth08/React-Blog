import React from "react";
import useUserContext from "../context/userContext";

const ErrorMsg = ({ readerMsg, authorMsg }) => {
  const { currentUser: user } = useUserContext();
  return (
    <div className="container center">
      {user?.id ? <h1>{authorMsg}</h1> : <h1>{readerMsg}</h1>}
    </div>
  );
};

export default ErrorMsg;
