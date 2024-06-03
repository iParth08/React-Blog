import { resolve } from "path";
import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

import userRoutes from "./Routes/userRoutes.js";
import postRoutes from "./Routes/postRoutes.js";
import { errorHandler, notFound } from "./Middlewares/errorMiddleware.js";

// configure dotenv
dotenv.config();

// set up express
const app = express();
const __dirname = resolve();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" })); // ? testing purpose 5173
app.use(fileUpload());

// Setting up routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/uploads", express.static(__dirname + "/uploads"));

// error middleware
app.use(notFound);
app.use(errorHandler);

// listen to port
const PORT = process.env.PORT || 5000;

// connect to mongodb
connect(process.env.MONGO_URI)
  .then(
    app.listen(PORT, () =>
      console.log(
        `Server started on port ${PORT} AND is connected to Space-blog-db`
      )
    )
  )
  .catch((err) => console.log(err));
