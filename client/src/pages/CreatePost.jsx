import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// ? Send Data to Backend
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");

  const editorRef = useRef();

  const modules = {
    toolbar: [
      [{ header: [1, 3, 5, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const categoryList = [
    "Uncategorized",
    "Agriculture",
    "Mythology",
    "Ancient Aliens",
    "Goldilock",
    "Star and Nebula",
    "Observatory",
    "Theory",
    "Space Agency",
    "Future Mission",
  ];

  return (
    <div className="wrapper">
      <div className="container ">
        <h1 className="page-heading">
          Pen the Next <span>Cosmic</span> Journey
        </h1>
        <section>
          <form className="new-post-form">
            <p className="form-error">Error Message</p>

            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />

            <select name="category" id="category">
              {categoryList.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <ReactQuill modules={modules} formats={formats} value={content} className="quill-editor" ref={editorRef} />

            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.value)}
            />

            <button className="btn primary">Create New Post</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CreatePost;
