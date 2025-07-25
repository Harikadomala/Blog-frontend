import React from "react";
import { useNavigate } from "react-router-dom";

const CreateBlogSection = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/create");
  };

  return (
    <div
      style={{
        width: "100vw",
        padding: "2rem 1rem",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "600",
            color: "#111",
            marginBottom: "0.5rem",
          }}
        >
          Create Blog
        </h2>

        <span
          onClick={handleCreate}
          style={{
            fontSize: "1rem",
            color: "#0077cc",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          + Write a new post
        </span>

        <p
          style={{
            marginTop: "1rem",
            color: "#444",
            fontSize: "0.95rem",
            maxWidth: "600px",
          }}
        >
          Start sharing your ideas, stories, and knowledge with the world. Write your first blog today and inspire others!
        </p>

        <hr
          style={{
            marginTop: "1.5rem",
            border: "none",
            height: "1px",
            backgroundColor: "#ccc",
          }}
        />
      </div>
    </div>
  );
};

export default CreateBlogSection;
