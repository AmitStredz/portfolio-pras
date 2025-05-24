import React, { useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Shooting from "/src/assets/images/features/Shooting and editing reels.jpg";
import SocialMedia from "/src/assets/images/features/Social media marketing.png";
import Meta from "/src/assets/images/features/Meta ads.jpeg";
import Photography from "/src/assets/images/features/Fashion Photography.png";
import CompetitorAnalysis from "/src/assets/images/features/CompetitorAnalysis.png";
import ScriptWriting from "/src/assets/images/features/ScriptWriting.png";

const features = [
  {
    title: 'Shooting and Creating Reels/Videos',
    description: 'Expertise in framing, lighting, and camera movements to create visually compelling content. ​Proficiency in editing software like capcut and adobe premiere pro to craft seamless, engaging videos with the right pacing, effects, and transitions.',
    image: Shooting,
  },
  {
    title: 'Social media Marketing',
    description: 'Ability to plan and execute content that aligns with brand goals, engages the target audience, and drives meaningful interactions. Expertise in analyzing social media metrics to optimize campaigns, improve engagement, and maximize ROI.',
    image: SocialMedia,
  },
  {
    title: 'Meta Ads',
    description: 'Skilled in using Meta’s advanced targeting tools to reach the right audiences by demographics, interests, and behaviors. Experienced in creating high-converting ads and using A/B testing to optimize performance.',
    image: Meta,
  },
  {
    title: 'Fashion Photography',
    description: 'Skilled in creating visually striking compositions and collaborating with stylists to capture fashion in an impactful way. Expertise in using various lighting setups to highlight clothing, textures, and details for the perfect shot.',
    image: Photography,
  },
  {
    title: 'Competitor Analysis',
    description: 'Track, analyze, and compare your competitors social media performance to uncover trends, strengths, and opportunities. Gain insights into their content strategy, audience engagement, and growth tactics to stay ahead in the digital game.',
    image: CompetitorAnalysis,
  },
  {
    title: 'Script writing',
    description: 'Crafting engaging and impactful scripts for Instagram Reels and youtube videos that capture attention, tell a story, and drive engagement. Turning ideas into quick, creative content that resonates with audiences!.',
    image: ScriptWriting,
  }
];

const Features: React.FC = () => {
  const theme = useTheme();
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedFeature(selectedFeature === index ? null : index);
  };

  return (
    <Box
      sx={{
        padding: '4rem 2rem',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: '2rem', color: "#9B7EBD", fontWeight: 'bold' }}
      >
        What I do Best!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {/* Motion div with scroll-in animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Initial state (hidden and below)
              whileInView={{ opacity: 1, y: 0 }} // Animation on scroll into view
              viewport={{ once: false, amount: 0.25 }} // Trigger when 50% of the element is in view
              transition={{ duration: 0.6, delay: index * 0.2 }} // Animation duration and delay
            >
              <Card
                sx={{
                  backgroundColor: "#0B192C",
                  boxShadow: 3,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  width: '100%',
                  // height:  '550px',
                  '&:hover': {
                    boxShadow: 10,
                  },
                }}
                onClick={() => handleCardClick(index)}
              >
                <Box
                    component="img"
                    src={feature.image}
                    alt={feature.title}
                    sx={{
                    width: '90%',
                    height: '250px', // Ensure the height fits within the card's height
                    objectFit: 'cover', // Ensures the image fills the area, maintaining aspect ratio
                    objectPosition: 'center', // Aligns the image from the top
                    borderTopLeftRadius: '16px', // Rounded corners for the image
                    borderTopRightRadius: '16px', // Rounded corners for the image
                    borderBottomRightRadius: '16px', // Rounded corners for the image
                    borderBottomLeftRadius: '16px', // Rounded corners for the image
                    marginTop: '20px', // Adjust the top margin as needed
                    marginLeft: '10px', // Adjust the left margin as needed
                    marginRight: '10px', // Adjust the right margin as needed
                    }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      marginBottom: '1rem',
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'white',
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Features;
