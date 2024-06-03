import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export default useUserContext;
