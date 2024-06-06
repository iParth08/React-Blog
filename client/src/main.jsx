import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext";

import {
  ErrorPage,
  Home,
  Login,
  Logout,
  Register,
  Dashboard,
  PostDetail,
  CreatePost,
  EditPost,
  DeletePost,
  AuthorPage,
  AuthorPosts,
  UserProfile,
  CatergoryPosts,
} from "./pages";
import Layout from "./components/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <Layout />
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "profile/:id", element: <UserProfile /> },
      { path: "authors", element: <AuthorPage /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "posts/category/:category", element: <CatergoryPosts /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
      { path: "create", element: <CreatePost /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: "posts/authors/:id", element: <AuthorPosts /> },
      { path: "logout", element: <Logout /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
