import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatarImg from "../assets/images/avatar3.jpg"; // ? Dummy

import { FaSquareFacebook } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { GrTwitter } from "react-icons/gr";

import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

import redirectUnauthorized from "../util/authRedirect";

const UserProfile = () => {
  redirectUnauthorized();

  const [avatar, setAvatar] = useState(avatarImg);
  const [bio, setBio] = useState("Describe Yourself, Pretty Please 😁");
  const [authorData, setAuthorData] = useState({
    name: "Ernesti Echevalier",
    email: "ernersti@mecha.world",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    setAuthorData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const authorID = localStorage.getItem("userID") || "007";

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
                  onChange={updateAvatar}
                />

                <label htmlFor="avatar">
                  <FaEdit />
                </label>
                <button type="submit">
                  <FaCheckCircle />
                </button>
              </form>
            </div>
            <div className="author-bio">
              <div className="author-name">
                <h1>Krish Prakash</h1>
              </div>
              <textarea
                className="bio"
                onChange={(e) => setBio(e.target.value)}
                // onChange={(e) => console.log(e.target.textContent)}
                value={bio}
              ></textarea>
            </div>
          </div>

          <div className="right-sidebar">
            <div className="author-details">
              <form>
                <p className="form-error">Error Message</p>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={authorData.name}
                  value={authorData.name}
                  onChange={changeHandler}
                />

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={authorData.email}
                  value={authorData.email}
                  onChange={changeHandler}
                />

                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="Current Password"
                  value={authorData.currentPassword}
                  onChange={changeHandler}
                />

                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="Password"
                  value={authorData.newPassword}
                  onChange={changeHandler}
                />

                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={authorData.confirmPassword}
                  onChange={changeHandler}
                />

                <button type="submit" className="btn primary">
                  Update Details
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
