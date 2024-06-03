import HttpError from "../Models/ErrorModel.js";
import Post from "../Models/postModel.js";
import User from "../Models/userModel.js";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const __dirname = path.resolve();

// ================================== Create new Post ==================================
// Task : create a new post
// Post : /api/posts/create-new
// Protected    => Only if you are logged in

const createPost = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;

    //check if blank
    if (!title || !content || !category || !req.files) {
      return next(
        new HttpError("Please enter all fields and choose thumbnail", 500)
      );
    }

    // extract thumbnail
    const { thumbnail } = req.files;

    // file type check
    if (
      thumbnail.mimetype !== "image/png" &&
      thumbnail.mimetype !== "image/jpg" &&
      thumbnail.mimetype !== "image/jpeg"
    ) {
      return next(
        new HttpError(
          "Unsupported file format. Please upload an png/jpg/jpeg",
          500
        )
      );
    }

    //file size check
    if (thumbnail.size > 2000000) {
      return next(
        new HttpError(
          "File size too large. Please upload an image less than 2MB",
          500
        )
      );
    }

    // renaming thumbnail : keep formate safe in the last
    const thumbnailName = Date.now() + "-" + uuid() + "-" + thumbnail.name;

    // save thumbnail
    thumbnail.mv(
      path.join(__dirname, "uploads", thumbnailName),
      async (err) => {
        if (err) return next(new HttpError(err, 500));
        else {
          const newPost = new Post({
            title,
            content,
            author: req.user.id,
            category,
            thumbnail: thumbnailName,
          });
          if (!newPost) {
            return next(new HttpError("Something went wrong", 500));
          }

          //increase post count
          const currUser = await User.findById(req.user.id);
          const newPostCount = (currUser.postCount += 1);
          await User.findByIdAndUpdate(req.user.id, {
            postCount: newPostCount,
          });

          await newPost.save();

          res
            .status(201)
            .json({ message: "Post created successfully", data: newPost });
        }
      }
    );
  } catch (error) {
    return next(new HttpError(error, 404));
  }
};

// ================================== Edit a Post ==================================
// Task : Edit any of your post based on (post id)
// Patch : /api/posts/edit/:id
// Protected    => Only if you are logged in

const editPost = async (req, res, next) => {
  try {
    // old post
    const { id } = req.params;
    const oldPost = await Post.findById(id);
    // are you the owner
    if (oldPost.author.toString() !== req.user.id) {
      return next(
        new HttpError("You are not authorized to edit this post", 401)
      );
    }

    let newFilename;
    let updatedPost;

    const { title, content, category } = req.body;
    //check if blank : React Quill already has 11 char from start
    if (!title || !category || content.length < 12) {
      return next(
        new HttpError("Please enter all fields and choose thumbnail", 500)
      );
    }

    // if no new thumbnail
    if (!req.files) {
      updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, content, category },
        { new: true }
      );
    } else {
      // delete old thumbnail

      if (fs.existsSync(path.join(__dirname, "uploads", oldPost.thumbnail))) {
        fs.unlinkSync(
          path.join(__dirname, "uploads", oldPost.thumbnail),
          async (err) => {
            if (err) return next(new HttpError(err, 500));
          }
        );

        // extract thumbnail
        const { thumbnail } = req.files;

        // file type check
        if (
          thumbnail.mimetype !== "image/png" &&
          thumbnail.mimetype !== "image/jpg" &&
          thumbnail.mimetype !== "image/jpeg"
        ) {
          return next(
            new HttpError(
              "Unsupported file format. Please upload an png/jpg/jpeg",
              500
            )
          );
        }

        //file size check
        if (thumbnail.size > 2000000) {
          return next(
            new HttpError(
              "File size too large. Please upload an image less than 2MB",
              500
            )
          );
        }

        // renaming thumbnail : keep formate safe in the last
        newFilename = Date.now() + "-" + uuid() + "-" + thumbnail.name;

        // save thumbnail
        thumbnail.mv(
          path.join(__dirname, "uploads", newFilename),
          async (err) => {
            if (err) return next(new HttpError(err, 500));
            else {
              // update post in db
              updatedPost = await Post.findByIdAndUpdate(
                id,
                { title, content, category, thumbnail: newFilename },
                { new: true }
              );

              if (!updatedPost) {
                return next(new HttpError("Something went wrong", 500));
              }

              res.status(200).json({
                message: "Post updated successfully",
                data: updatedPost,
              });
            }
          }
        );
      }
    }
  } catch (error) {
    return next(new HttpError(error, 404));
  }
};

// ================================== Delete a Post ==================================
// Task : Delete any of your post based on (post id)
// Delete : /api/posts/delete/:id
// Protected    => Only if you are logged in

const deletePost = async (req, res, next) => {
  //this post
  const { id } = req.params;
  const post = await Post.findById(id);
  // are you the owner
  if (post.author.toString() !== req.user.id) {
    return next(
      new HttpError("You are not authorized to delete this post", 401)
    );
  }

  //find post
  if (!id) {
    return next(new HttpError("Post not found", 404));
  }

  // if post has thumbnail
  if (post.thumbnail) {
    fs.unlink(path.join(__dirname, "uploads", post.thumbnail), async (err) => {
      if (err) return next(new HttpError(err, 500));

      await Post.findByIdAndDelete(id);
      const currUser = await User.findById(req.user.id);
      const newPostCount = currUser?.postCount - 1;
      await User.findByIdAndUpdate(req.user.id, {
        postCount: newPostCount,
      });

      res.status(200).json({ message: "Post deleted successfully" });
    });
  }
};

// ================================== Get all posts ==================================
// Task : Get all the posts (for home)
// Get : /api/posts/
// Unprotected

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    if (!posts || posts.length === 0) {
      return next(new HttpError("No posts found", 404));
    }

    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error, 404));
  }
};

// ================================== Get a Post ==================================
// Task : Get detailed post
// Get : /api/posts/:id
// Unprotected

const getDetailsOfPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return next(new HttpError("Post not found", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error, 404));
  }
};

// ============================== get posts by category =============================
// Task : Get all posts related to a category
// Get : /api/posts/categories/:category
// Unprotected

const getPostsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const catPosts = await Post.find({ category }).sort({ updatedAt: -1 });
    if (!catPosts || catPosts.length === 0) {
      return next(new HttpError("Post not found", 404));
    }
    res.status(200).json(catPosts);
  } catch (error) {
    return next(new HttpError(error, 404));
  }
};

// ============================== get posts by author =============================
// Task : Get all posts by an author
// Get : /api/posts/authors/:authorid
// Unprotected

const getPostsByAuthor = async (req, res, next) => {
  try {
    const { authorid } = req.params;
    const authPosts = await Post.find({ author: authorid }).sort({
      updatedAt: -1,
    });
    if (!authPosts || authPosts.length === 0) {
      return next(new HttpError("Post not found", 404));
    }
    res.status(200).json(authPosts);
  } catch (error) {
    return next(new HttpError(error, 404));
  }
};

export {
  createPost,
  editPost,
  deletePost,
  getAllPosts,
  getDetailsOfPost,
  getPostsByCategory,
  getPostsByAuthor,
};
