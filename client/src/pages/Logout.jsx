import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../context/userContext";
import redirectUnauthorized from "../util/authRedirect";

const Logout = () => {
  redirectUnauthorized();

  const { setCurrentUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(null);
    navigate("/login");
  }, []);
  return <div>Logout</div>;
};

export default Logout;
