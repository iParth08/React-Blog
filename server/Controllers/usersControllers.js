import HttpError from "../Models/ErrorModel.js";
import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

import fs from "fs";
import path from "path";

const __dirname = path.resolve();  //* to get absolute path ??
// console.log(__dirname);

// ================================== Register User ==================================
// Task : register new users
// Post : /api/users/register
// Unprotected
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password) {
      return next(new HttpError("Please enter all fields", 500));
    }

    // check if user already exists
    const newEmail = email.toLowerCase();
    const userExists = await User.findOne({ email: newEmail });
    if (userExists) {
      return next(new HttpError("Email already exists", 422));
    }

    //check password length
    if (password.trim().length < 6) {
      return next(new HttpError("Password must be at least 6 characters", 422));
    }

    // check if passwords match
    if (password !== confirmPassword) {
      return next(new HttpError("Passwords don't match", 422));
    }

    // encrypt password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new User
    const newUser = new User({
      name,
      email: newEmail,
      password: hashedPassword,
    });

    // save new user
    await newUser.save();
    res.json({ message: "User Registered Successfully", data: newUser });
  } catch (error) {
    return next(new HttpError("User Registration Failed", 422));
  }
};

// ================================== Login User ==================================
// Task : login existing user => author
// Post : /api/users/login
// Unprotected
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpError("Please enter all fields", 500));
    }

    // check if user exists
    const newEmail = email.toLowerCase();
    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("Invalid credentials", 422));
    }

    // check password if match ?
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new HttpError("Invalid credentials", 422));
    }

    // generate token
    const { _id: id, name } = user;
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // success
    res
      .status(200)
      .json({ message: `User ${name}, Logged In Successfully`, data: token });
  } catch (error) {
    return next(
      new HttpError("User Login Failed. Please check credentials", 422)
    );
  }
};

// ========================== Change Avatar (profile pic) =============================
// Task : Change thumbnail/profile avatar of user
// Post : /api/users/change-avatar
// Protected    => Only if you are logged in
const changeAvatar = async (req, res, next) => {
  try {
    // check if empty
    if (!req.files.avatar) {
      return next(new HttpError("Please upload an image", 422));
    }

    // find user
    const user = await User.findById(req.user.id);

    // unlink/delete old avatar if exists
    if (user.avatar) {
      fs.unlinkSync(path.join(__dirname, "uploads", user.avatar), (err) => {
        if (err) return next(new HttpError(err, 500));
      });
    }

    // work on incoming avatar
    const { avatar } = req.files;
    // file format check
    if (
      avatar.mimetype !== "image/png" &&
      avatar.mimetype !== "image/jpg" &&
      avatar.mimetype !== "image/jpeg"
    ) {
      return next(
        new HttpError(
          "Unsupported file format. Please upload an png/jpg/jpeg",
          422
        )
      );
    }
    //file size check
    if (avatar.size > 500000) {
      return next(
        new HttpError(
          "File size too large. Please upload an image less than 500kb",
          422
        )
      );
    }

    // renaming avatar : keep formate safe in the last
    const avatarName = Date.now() + "-" + uuid() + "-" + avatar.name;

    // save avatar
    avatar.mv(path.join(__dirname, "uploads", avatarName), async (err) => {
      if (err) return next(new HttpError(err, 500));

      const updatedAvatar = await User.findByIdAndUpdate(
        req.user.id,
        { avatar: avatarName },
        { new: true }
      );

      if (!updatedAvatar)
        return next(new HttpError("Couldn't update avatar", 404));
    });

    res.json({ message: "Avatar updated successfully", data: avatarName });
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ==================================  User Details ==================================
// Task : Edit user details
// Patch : /api/users/edit-user
// Protected    => Only if you are logged in
const editUser = async (req, res, next) => {
  const { name, email, currentPassword, newPassword, confirmNewPassword, bio } =
    req.body;

  // if empty
  if (
    !name ||
    !email ||
    !bio ||
    !currentPassword ||
    !newPassword ||
    !confirmNewPassword
  ) {
    return next(new HttpError("Please enter all fields", 422));
  }

  //find user
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new HttpError("User not found", 404));
  }

  //check if new email already exists
  const newEmail = email.toLowerCase();
  const emailExists = await User.findOne({ email: newEmail });
  if (emailExists && emailExists._id.toString() != user._id.toString()) {
    return next(new HttpError("Email already exists", 422));
  }

  // check password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return next(new HttpError("Invalid Current Password", 422));
  }

  // check newpassword length
  if (newPassword.trim().length < 6) {
    return next(new HttpError("Password must be at least 6 characters", 422));
  }

  // check if passwords match
  if (newPassword !== confirmNewPassword) {
    return next(new HttpError("Passwords don't match", 422));
  }

  //encrypt new password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // update user
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name, email: newEmail, password: hashedPassword, bio },
    { new: true }
  );
  if (!updatedUser) {
    return next(new HttpError("Couldn't update user", 404));
  }

  // all success
  console.log(req.user);
  res
    .status(200)
    .json({ message: "User updated successfully", data: updatedUser });
};

// ================================== Profile of User ==================================
// Task : register new users
// Get : /api/users/:id
// Protected    => Only if you are logged in
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    // user found : fetch profile details
    res.status(200).json({ data: user });
  } catch (error) {
    return next(new HttpError(error, 404));
  }
};

// ================================== Get Authors ==================================
// Task : register new users
// Get : /api/users/
// Unprotected
const getAuthors = async (req, res, next) => {
  try {
    const authors = await User.find().select("-password");

    //send users
    res.status(200).json({ data: authors });
  } catch (error) {
    return next(new HttpError(error, 404));
  }
};

export { registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors };
