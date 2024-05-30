import { Router } from "express";

const router = Router();

router.get("/test", (req, res, next) => {
  res.json({ message: "Post route works" });
});

export default router