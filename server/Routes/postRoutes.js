import { Router } from "express";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getDetailsOfPost,
  getPostsByAuthor,
  getPostsByCategory,
} from "../Controllers/postControllers.js";

import authMiddleware from "../Middlewares/authMiddleware.js";

const router = Router();

router.get("/test", (req, res, next) => {
  res.json({ message: "Post route works" });
});

router.post("/create-new", authMiddleware, createPost);
router.patch("/edit/:id", authMiddleware, editPost);
router.delete("/delete/:id", authMiddleware, deletePost);
router.get("/", getAllPosts);
router.get("/:id", getDetailsOfPost);
router.get("/categories/:category", getPostsByCategory);
router.get("/authors/:authorid", getPostsByAuthor);

export default router;
