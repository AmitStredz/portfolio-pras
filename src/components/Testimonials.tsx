import * as React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Typography,
    Box,
    Container,
    Grid,
    MobileStepper,
    Button,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
  import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
  

const userTestimonials = [
  {
    avatar: <Avatar alt="Raho vacations" src="/static/images/avatar/1.jpg" />,
    name: "Raho vacations",
    testimonial:
      "Prasanna served as our Social Media Manager from October 2023 to February 2024 and delivered outstanding results. He skillfully managed our online presence, created engaging content, and significantly boosted our Instagram reach. I highly recommend him.",
  },
  {
    avatar: <Avatar alt="Raw Diaries" src="/static/images/avatar/1.jpg" />,
    name: "Raw Diaries",
    testimonial:
      "Prasanna excelled in crafting reels, designing graphics, and engaging with our audience through live sessions and polls. His creativity, teamwork, and professionalism significantly boosted our social media presence. We wish him the very best in his future endeavors.",
  },
  {
    avatar: <Avatar alt="Madras Patissiere" src="/static/images/avatar/3.jpg" />,
    name: "Madras Patissiere",
    testimonial:
      "It was a pleasure working with Prasanna—always enthusiastic, creative, and on time. He embraced feedback and improved with every iteration. Wishing you the best in all your future endeavors, Prasanna! Thank you for being part of TMP.",
  },
  {
    avatar: <Avatar alt="Crave Cafe" src="/static/images/avatar/3.jpg" />,
    name: "Crave Cafe",
    testimonial:
      "Working with Prassana has been a game-changer for our café. His expertise in creating engaging content and tailoring strategies has significantly boosted our online presence. Prassana is responsive, professional, and consistently delivers fresh, compelling content. As a result, our engagement rates and follower growth have seen a noticeable increase. Highly recommend him for anyone looking to elevate their social media!",
  },
  {
    avatar: <Avatar alt="Bao Bao" src="/static/images/avatar/3.jpg" />,
    name: "Bao Bao",
    testimonial:
      "Prasanna,Your understanding of our brand's voice and ability to create engaging content added great value to our social media. I also appreciated your professionalism, timely delivery, and responsiveness to feedback. It was a pleasure working with you, and I wish you continued success at Pinkman Pictures and beyond.",
  },
  {
    avatar: <Avatar alt="Tudo Bem" src="/static/images/avatar/3.jpg" />,
    name: "Tudo Bem",
    testimonial:
      "Working with Prasanna and his team has been an absolute pleasure. Their content creation is top-notch, with thoughtful ideation and exceptional video production. I look forward to continuing this successful partnership.",
  },
];

export default function Testimonials() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [activeStep, setActiveStep] = React.useState(0);
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const testimonialsPerPage = isMobile ? 1 : (isTablet ? 2 : 3);
  const totalTestimonials = userTestimonials.length;
  const maxSteps = Math.ceil(totalTestimonials / testimonialsPerPage);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, maxSteps - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle expansion on card click
  };

  // Group testimonials into pages of 3
  const displayedTestimonials = userTestimonials.slice(
    activeStep * testimonialsPerPage,
    (activeStep + 1) * testimonialsPerPage
  );

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 3, sm: 6, md: 8 },
        pb: { xs: 4, sm: 8, md: 12 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
        maxWidth: '100%',
        overflow: 'hidden',
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "100%", md: "80%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography
            variant="h4"
            sx={{ 
              marginBottom: { xs: '1rem', sm: '1.5rem', md: '2rem' }, 
              color: "#9B7EBD", 
              fontWeight: 'bold',
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, 
              textAlign: 'center',
            }}
        >
          Testimonials
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{ width: '100%' }}>
        {displayedTestimonials.map((testimonial, index) => (
          <Grid 
            item 
            xs={12} 
            sm={testimonialsPerPage === 1 ? 12 : 6} 
            md={testimonialsPerPage === 3 ? 4 : (testimonialsPerPage === 2 ? 6 : 12)} 
            key={index}
          >
            <Card
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
                backgroundColor: "#0B192C",
                boxShadow: { xs: 4, sm: 8, md: 12 },
                height: "100%", // Ensure the card takes full height of its container
                cursor: "pointer", // Change cursor to indicate interactivity
                borderRadius: { xs: '8px', sm: '12px' },
                overflow: 'hidden',
              }}
              onClick={() => handleCardClick(index)} // Toggle the card on click
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    color: "#ffffff",
                    maxHeight: expandedIndex === index ? "none" : { xs: "80px", sm: "100px" }, // Show full content if expanded
                    overflow: "hidden", // Hide overflow when collapsed
                    textOverflow: "ellipsis", // Add ellipsis for preview text when collapsed
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    lineHeight: 1.5,
                  }}
                >
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box sx={{ 
                display: "flex", 
                flexDirection: "row", 
                color: "#fff",
                alignItems: "center", 
              }}>
                <CardHeader 
                  avatar={testimonial.avatar} 
                  title={testimonial.name}
                  sx={{
                    p: { xs: '8px 16px', sm: '16px' },
                    '& .MuiCardHeader-title': {
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      fontWeight: 'bold',
                    },
                  }} 
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination/Stepper for testimonials */}
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          flexGrow: 1,
          background: "transparent", // Transparent background to blend with page's gradient
          borderRadius: "50px", // Add a rounded border for a seamless look
          boxShadow: "none", // Remove any box shadow for a cleaner integration
        }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
          </Button>
        }
      />
    </Container>
  );
}
