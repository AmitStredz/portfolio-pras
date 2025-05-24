import React, { useState } from "react";
import { Box, Typography, Link, Grid, TextField, Button, IconButton, useTheme, useMediaQuery } from "@mui/material";
import emailjs from "@emailjs/browser";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const StayConnected = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const serviceId = "service_6fzjk2w"; // Replace with your actual EmailJS service ID
      const templateId = "template_io9e2n4"; // Replace with your actual template ID
      const publicKey = "gg33QhLJcWL61o09P"; // Replace with your actual public key

      await emailjs.send(serviceId, templateId, formData, publicKey);
      setFormData({ name: "", contact: "", message: "" });
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  return (
    <Box sx={{ 
      padding: { xs: "1rem", sm: "1.5rem", md: "2rem" }, 
      width: '100%',
      maxWidth: '100vw',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
    
      <Typography
        variant="h4"
        sx={{ 
          marginBottom: { xs: '1.5rem', sm: '2rem' }, 
          color: "#9B7EBD", 
          fontWeight: 'bold',
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
        }}
      >
        Stay Connected
      </Typography>

      {/* Social Media Icons - Centered */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: { xs: 3, sm: 4 } }}>
        <IconButton
          color="inherit"
          size={isMobile ? "medium" : "large"}
          href="https://www.instagram.com/prasannamohan_/"
          aria-label="Instagram"
          sx={{ 
            alignSelf: 'center',
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
          }}
        >
          <InstagramIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          color="inherit"
          size={isMobile ? "medium" : "large"}
          href="https://www.linkedin.com/in/prasanna-mohan"
          aria-label="LinkedIn"
          sx={{ 
            alignSelf: 'center',
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
          }}
        >
          <LinkedInIcon fontSize="inherit" />
        </IconButton>
      </Box>
      
      <Grid container spacing={{ xs: 3, sm: 4, md: 6 }} alignItems="flex-start">
        {/* Left Section - Contact Info */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h5" 
            fontWeight="bold" 
            sx={{ 
              mb: { xs: 2, sm: 3 }, 
              textAlign: "center",
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
            }}
          >
            LETS GET IN TOUCH!
          </Typography>
          
          {/* Contact Info */}
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.25rem' },
              fontWeight: 'bold',
            }}
          >
            PERSONAL EMAIL
          </Typography>
          <Link 
            href="mailto:presee777@gmail.com" 
            color="inherit"
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' },
              display: 'block',
              mb: { xs: 2, sm: 2 },
              wordBreak: 'break-word',
            }}
          >
            presee777@gmail.com
          </Link>

          <Typography 
            variant="h6" 
            sx={{ 
              mt: { xs: 1, sm: 2 },
              fontSize: { xs: '1rem', sm: '1.25rem' },
              fontWeight: 'bold',
            }}
          >
            FOR BUSINESS OPPORTUNITIES
          </Typography>
          <Link 
            href="mailto:pinkmanpictures@gmail.com" 
            color="inherit"
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' },
              display: 'block',
              wordBreak: 'break-word',
            }}
          >
            pinkmanpictures@gmail.com
          </Link>

          {/* Copyright */}
          <Typography 
            sx={{ 
              mt: { xs: 3, sm: 4 }, 
              textAlign: "center",
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
            }}
          >
            &copy; {new Date().getFullYear()} by Prasanna Mohan. All rights reserved.
          </Typography>
        </Grid>

        {/* Right Section - Form */}
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: "#0B192C",
              color: "#fff",
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': {
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                },
                '& .MuiInputBase-input': {
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                },
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <TextField
              fullWidth
              label="Your Contact Info (Email/Phone)"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': {
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                },
                '& .MuiInputBase-input': {
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                },
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <TextField
              fullWidth
              label="Your Message"
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              sx={{ 
                mb: { xs: 2, sm: 3 },
                '& .MuiInputLabel-root': {
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                },
                '& .MuiInputBase-input': {
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                },
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              type="submit" 
              fullWidth
              sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' },
                py: { xs: 1, sm: 1.5 },
              }}
            >
              Send Message
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StayConnected;
