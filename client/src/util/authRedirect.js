import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../context/userContext";

const redirectUnauthorized = () => {
  //redirect if not logged in
  const navigate = useNavigate();
  const { currentUser } = useUserContext();
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
};

export default redirectUnauthorized;
