import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import redirectUnauthorized from "../util/authRedirect";
import axios from "axios";
import useUserContext from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  redirectUnauthorized();

  const { currentUser } = useUserContext();
  const token = currentUser?.token;
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const editorRef = useRef();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
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
    "News and Discoveries",
    "Space Exploration",
    "Ancient Aliens",
    "Astrobiology",
    "Astronomical Events",
    "Cosmology",
    "Astrophysics",
    "Space Technology",
    "Space History",
    "Amateur Astronomy",
    "Future Mission",
  ];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/${id}`
        );
        setTitle(res.data.title);
        setCategory(res.data.category);
        setContent(res.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("thumbnail", thumbnail);
    formData.append("content", content);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/posts/edit/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.message);
        return navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="container ">
        <h1 className="page-heading">
          Enhance Your <span>Celestial</span> Narrative
        </h1>
        <section>
          <form className="new-post-form" onSubmit={handleSubmit}>
            {error && <p className="form-error">{error}</p>}

            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />

            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoryList.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            <ReactQuill
              modules={modules}
              formats={formats}
              value={content}
              className="quill-editor"
              ref={editorRef}
              onChange={(content) => setContent(content)}
            />
            <label htmlFor="thumbnail">
              Thumbnail (Upload Image):
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </label>

            <button className="btn primary">Update Post</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditPost;
