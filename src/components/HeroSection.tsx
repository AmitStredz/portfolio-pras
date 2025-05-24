import React from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HeroImage from "/src/assets/images/HeroSection.jpg";
const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' }, // Responsive layout
        px: 3,
        gap: 3, // Space between the content and image
      }}
    >
      {/* Left side: Headline and Subtitle */}
      <Box
        sx={{
          maxWidth: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          textAlign: { xs: 'center', md: 'left' }, // Center-align text on small screens
        }}
      >
         <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        style={{
          maxWidth: '100%', // Ensures responsiveness
        }}
      >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              color: '#FF6500', // Use primary color for text
              mb: 2,
            }}
          >
            Prasanna Mohan
          </Typography>
          <Typography
            variant="h5"
            sx={{
              lineHeight: 1.6,
              mb: 1,
              color: '#9B7EBD',
            }}
          >
            Social Media Manager and Content Creator
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#fffff',
              mb: 2,
            }}
          >
With experience working across <Box component="span" sx={{ fontStyle: "italic" }}>India and New Zealand</Box>, I specialize in creating <Box component="span" sx={{ fontStyle: "italic" }}>impactful content</Box> and executing <Box component="span" sx={{ fontStyle: "italic" }}>data-driven Meta Ads and social media strategies</Box>. I help brands grow by crafting <Box component="span" sx={{ fontStyle: "italic" }}>compelling stories</Box> and delivering <Box component="span" sx={{ fontStyle: "italic" }}>targeted campaigns</Box> that connect with audiences and drive results.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' }, // Center icons on small screens
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: 'center',
                color: 'text.secondary',
              }}
            >
            <IconButton
              size="medium"
              href="https://www.instagram.com/prasannamohan_/"
              aria-label="Instagram"
              sx={{ alignSelf: 'center', color: 'white' }} // Set color to white
            >
              <InstagramIcon sx={{ color: 'white' }} /> 
            </IconButton>

              <IconButton
                size="medium"
                href="https://www.linkedin.com/in/prasanna-mohan"
                aria-label="LinkedIn"
                sx={{ alignSelf: 'center', color: 'white' }} // Set color to white
              >
              <LinkedInIcon sx={{ color: 'white' }} />
            </IconButton>
            </Stack>
          </Box>
        </motion.div>
      </Box>

      {/* Right side: Image with shadow */}
      <Box
        sx={{
          maxWidth: { xs: '100%', md: '50%' },
          textAlign: 'center', // Center-align the image on small screens
        }}
      >
        <Box
          component="img"
          src={HeroImage}
          alt="Hero Illustration"
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: 20, // Add shadow to image
          }}
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
