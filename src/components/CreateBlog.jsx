import React, { useState } from "react";
import axios from "axios"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagList = tags.split(",").map(tag => tag.trim());

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.post(`${backendUrl}/blogs/create`, {
        title,
        content,
        tags: tagList
      });

      console.log("Blog created:", res.data);

      setSuccessMsg(true);
      setTitle("");
      setContent("");
      setTags("");

      setTimeout(() => {
        setSuccessMsg(false);
        navigate("/blogs"); // 👈 Redirect to homepage (optional)
      }, 2000);
    } catch (err) {
      console.error("Error creating blog:", err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>✍️ Create a New Blog</h2>

        {successMsg && (
          <div style={styles.success}>
            🎉 Blog Published Successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />

          <textarea
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={styles.textarea}
            required
          />

          <input
            type="text"
            placeholder="Tags (e.g. life, tech, coding)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            🚀 Publish
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "800px",
    padding: "2.5rem",
    boxSizing: "border-box",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#222",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  input: {
    padding: "14px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border 0.3s ease",
  },
  textarea: {
    padding: "16px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "200px",
    resize: "vertical",
    outline: "none",
    fontFamily: "'Segoe UI', sans-serif",
    transition: "border 0.3s ease",
  },
  button: {
    padding: "14px",
    backgroundColor: "#0077cc",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  success: {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "1rem",
    textAlign: "center",
    marginBottom: "1rem",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #c3e6cb",
  },
};

export default CreateBlog;
