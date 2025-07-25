import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Modal,
  Box,
  TextField,
  Button,
  Tooltip,
  Divider,
  Chip,
} from "@mui/material";
import { Edit, Delete, Article } from "@mui/icons-material";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const fetchBlogs = async () => {
    try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.get(`${backendUrl}/blogs`);
      setBlogs(res.data.blogs);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      await axios.delete(`${backendUrl}/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog", err);
    }
  };

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setEditedTitle(blog.title);
    setEditedContent(blog.content);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
     const backendUrl = import.meta.env.VITE_BACKEND_URL;
      await axios.put(`${backendUrl}/blogs/${selectedBlog._id}`, {
        title: editedTitle,
        content: editedContent,
      });
      setEditModalOpen(false);
      fetchBlogs();
    } catch (err) {
      console.error("Error updating blog", err);
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box px={4} py={6} sx={{ background: "linear-gradient(to right, #e3f2fd, #e8f5e9)", minHeight: "100vh" }}>
      <Box mb={4} textAlign="center">
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "rgba(47, 34, 233, 1)", mb: 1 }}>
          <Article sx={{ mr: 1, verticalAlign: "middle" }} />
          All Published Blogs
        </Typography>
        <Box
          sx={{
            width: 160,
            height: 4,
            backgroundColor: "#42a5f5",
            borderRadius: 2,
            margin: "0 auto",
            mb: 2,
          }}
        />
        <Typography variant="subtitle1" sx={{ fontStyle: "italic", color: "#555" }}>
          Stay inspired with our latest blog entries ✨
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card
              elevation={6}
              sx={{
                borderRadius: 4,
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 6px 40px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a237e", mb: 1 }}>
                  {blog.title}
                </Typography>

                <Divider sx={{ mb: 1 }} />

                <Typography
                  variant="body2"
                  sx={{
                    color: "#333",
                    fontSize: "0.95rem",
                    whiteSpace: "pre-line",
                    minHeight: 80,
                    mb: 2,
                  }}
                >
                  {blog.content}
                </Typography>

                {/* Optional Tags */}
                {/* <Box sx={{ mb: 2 }}>
                  {blog.tags?.map((tag, idx) => (
                    <Chip key={idx} label={tag} sx={{ mr: 1, mb: 1 }} color="primary" />
                  ))}
                </Box> */}

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" sx={{ color: "#777" }}>
                    Posted on {new Date(blog.createdAt).toLocaleDateString()}
                  </Typography>

                  <Box>
                    <Tooltip title="Edit Blog">
                      <IconButton onClick={() => handleEditClick(blog)} sx={{ color: "#1565c0" }}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Blog">
                      <IconButton onClick={() => handleDelete(blog._id)} sx={{ color: "#d32f2f" }}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a237e", mb: 2 }}>
            Edit Blog ✏️
          </Typography>
          <TextField
            fullWidth
            label="Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Content"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button variant="contained" onClick={handleEditSubmit} sx={{ backgroundColor: "#1976d2" }}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BlogList;
