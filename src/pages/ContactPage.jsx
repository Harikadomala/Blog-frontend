import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      await axios.post(`${backendUrl}/contact/submit`, formData);
      alert('Message sent successfully!');
      setFormData({ fullName: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to send message.');
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#f0f2f5' }}>
      {/* Header Section */}
      <Box
        sx={{
          width: '100%',
          height: '300px',
          backgroundImage:
            'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
          CONTACT
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Let’s connect and collaborate
        </Typography>
      </Box>

      {/* Contact Form Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: 'calc(100vh - 300px)',
          px: 2,
          boxSizing: 'border-box',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: '100%',
            maxWidth: '600px',
            p: 4,
            borderRadius: 3,
            bgcolor: '#fff',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Fill the form below to reach out to us. We’d love to hear from you!
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name *"
              variant="outlined"
              margin="normal"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Email *"
              variant="outlined"
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Message *"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              type="submit"
            >
              Send Message
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Contact;
