import React from "react";
import useUserContext from "../context/userContext";
// ! Some major work needed to figure out login
const ErrorMsg = ({ readerMsg, authorMsg }) => {
  const { currentUser: user } = useUserContext();
  return (
    <div className="container center">
      {user?.id ? <h1>{authorMsg}</h1> : <h1>{readerMsg}</h1>}
    </div>
  );
};

export default ErrorMsg;
