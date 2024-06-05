import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import avatarImg from "../assets/images/profile.jpg"; // note: Placeholder

import { FaSquareFacebook } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { GrTwitter } from "react-icons/gr";

import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

import redirectUnauthorized from "../util/authRedirect";
import useUserContext from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";

const UserProfile = () => {
  redirectUnauthorized();
  const { currentUser } = useUserContext();
  const authorID = currentUser?.id;
  const token = currentUser?.token;

  const [editMode, setEditMode] = useState(false);
  const [avatarIsTouched, setAvatarIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState("");
  const [authorData, setAuthorData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setIsLoading(true);
    const fetchAuthor = async () => {
      try {
        const getAuthor = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${authorID}`
        );
        const author = getAuthor?.data;
        if (!author) {
          setAuthorData({});
          setError("Author not found");
        } else {
          setAuthorData((prev) => ({
            ...prev,
            name: author.name,
            email: author.email,
          }));
          if (author.avatar)
            setAvatar(
              `${import.meta.env.VITE_ASSETS_URL}/uploads/${author.avatar}`
            );
          else {
            setAvatar(avatarImg);
            setError("Default Avatar");
          }

          if (!author.bio) setBio("Describe Yourself, Pretty Please 😁");
          else setBio(author.bio);
        }
      } catch (error) {
        setAuthorData({});
        setError(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthor();
  }, [authorID]);

  const changeUserDetails = async () => {
    const { name, email, currentPassword, newPassword, confirmPassword } =
      authorData;
    console.log(authorData);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    formData.append("bio", bio);

    console.log(...formData);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/edit-user`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status !== 200) {
        setError(response.data.message);
      } else {
        setEditMode(false);
        setError(null);
        setAuthorData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const controlHandler = (e) => {
    e.preventDefault();
    if (editMode) {
      changeUserDetails();
    } else {
      setEditMode(true);
    }
  };

  const changeHandler = (e) => {
    setAuthorData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateAvatar = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.append("avatar", avatar);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/change-avatar`,
        postData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newAvatar = response?.data.avatar;
      setAvatar(`${import.meta.env.VITE_ASSETS_URL}/uploads/${newAvatar}`);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setAvatarIsTouched(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="wrapper">
      <div className="container">
        <div className="profile-head">
          <Link to={`/myposts/${authorID}`} className="btn primary">
            Dashboard
          </Link>

          <div className="social-media">
            <Link to="#">
              <FaSquareFacebook />
            </Link>
            <Link to="#">
              <GrInstagram />
            </Link>
            <Link to="#">
              <GrTwitter />
            </Link>
          </div>
          {/* Head section, post and media */}
        </div>
        <section className="profile-body">
          <div className="left-sidebar">
            <div className="avatar-wrapper">
              <div className="profile-avatar">
                <img src={avatar} alt="" />
              </div>
              {/* hidden form to update avatar */}
              <form>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  readOnly={!editMode}
                />

                <label
                  htmlFor="avatar"
                  style={{ cursor: "pointer" }}
                  onClick={() => setAvatarIsTouched(true)}
                >
                  <FaEdit />
                </label>
                {avatarIsTouched && (
                  <button
                    type="submit"
                    style={{ cursor: "pointer" }}
                    onClick={updateAvatar}
                  >
                    <FaCheckCircle />
                  </button>
                )}
              </form>
            </div>
            <div className="author-bio">
              <div className="author-name">
                <h1>{authorData.name}</h1>
              </div>
              <textarea
                className="bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                readOnly={!editMode}
              ></textarea>
            </div>
          </div>

          <div className="right-sidebar">
            <div className="author-details">
              <form onSubmit={controlHandler}>
                {error && <p className="form-error">{error}</p>}
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={authorData.name}
                  value={authorData.name}
                  onChange={changeHandler}
                  readOnly={!editMode}
                />

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={authorData.email}
                  value={authorData.email}
                  onChange={changeHandler}
                  readOnly={!editMode}
                />

                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="Current Password"
                  value={authorData.currentPassword}
                  onChange={changeHandler}
                  readOnly={!editMode}
                />

                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="Password"
                  value={authorData.newPassword}
                  onChange={changeHandler}
                  readOnly={!editMode}
                />

                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={authorData.confirmPassword}
                  onChange={changeHandler}
                  readOnly={!editMode}
                />

                <button type="submit" className="btn primary">
                  {editMode ? "Update Details" : "Edit Details"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
