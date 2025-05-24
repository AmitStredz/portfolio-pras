import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import Slider from "react-slick"; // Import the Slider component from react-slick
import "slick-carousel/slick/slick.css"; // Import slick styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles

const brandsStats = [
  {
    brandName: "Tudo bem",
    stats: [
      {
        value: "674",
        label: "Link Clicks",
        color: "#C5A2F8",
        description: "This shows effective ad creativity and targeting.",
      },
      {
        value: "$0.11",
        label: "Cost per Link Click",
        color: "#85DAA3",
        description:
          "With a CPC of just $0.11, the campaign is cost-effective.",
      },
      {
        value: "71%",
        label: "Performance Comparison",
        color: "#F1A6B8",
        description:
          "CPC is 71% lower than peers, significantly outperforming others.",
      },
    ],
  },
  {
    brandName: "Curryup",
    stats: [
      {
        value: "2.4M",
        label: "Total Views",
        color: "#C5A2F8",
        description:
          "The video received 2.4 million views, showing huge engagement.",
      },
      {
        value: "6.8K",
        label: "Shares",
        color: "#F7D25B",
        description:
          "The video was shared 6,800 times, suggesting strong resonance.",
      },
      {
        value: "7.8K",
        label: "New Followers",
        color: "#F1A6B8",
        description: "Gained 7,814 new followers from this video.",
      },
    ],
  },
  {
    brandName: "ANZ TRAVELS",
    stats: [
      {
        value: "4.5K",
        label: "Total Views",
        color: "#C5A2F8",
        description: "The video got 4,582 views, indicating strong engagement.",
      },
      {
        value: "55",
        label: "Shares",
        color: "#85DAA3",
        description:
          "It was shared 55 times, showing interest in spreading the content.",
      },
      {
        value: "19",
        label: "Saves",
        color: "#F1A6B8",
        description: "The video was saved 19 times for later viewing.",
      },
    ],
  },
  {
    brandName: "Crave Cafe",
    stats: [
      {
        value: "7.2K",
        label: "Total Views",
        color: "#C5A2F8",
        description: "The video got 7,217 views, showing solid engagement.",
      },
      {
        value: "23",
        label: "Shares",
        color: "#85DAA3",
        description: "The video was shared 23 times.",
      },
      {
        value: "114",
        label: "Comments",
        color: "#F7D25B",
        description: "114 comments suggest good engagement and interaction.",
      },
    ],
  },
];

const StatsSection: React.FC<{ brand: typeof brandsStats[0] }> = ({ brand }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#0B192C",
        borderRadius: "12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "white",
          marginBottom: "1rem",
          px: { xs: "0.5rem", sm: "1rem" },
          pt: { xs: "0.5rem", sm: "1rem" },
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {brand.brandName}
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          mx: 0,
          px: { xs: "0.5rem", sm: "1rem" },
          pb: { xs: "0.5rem", sm: "1rem" },
        }}
      >
        {brand.stats.map((stat, index) => (
          <Grid
            item
            xs={12}
            sm={4}
            key={index}
            sx={{
              height: "100%",
              px: { xs: "0.5rem !important", sm: "0.75rem !important" },
            }}
          >
            <Card
              sx={{
                backgroundColor: stat.color,
                borderRadius: "8px",
                height: "100%", // Ensures all cards have the same height
                flexDirection: "column",
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              <CardContent
                sx={{
                  textAlign: "left",
                  padding: { xs: "0.5rem", sm: "1rem" },
                  "&:last-child": { pb: { xs: "0.5rem", sm: "1rem" } }
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                    fontSize: { xs: "0.9rem", sm: "1.1rem" },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {stat.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

const StatsCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };

  return (
    <Box
      sx={{
        padding: { xs: "1rem 0", sm: "2rem 1rem", md: "4rem 2rem" },
        textAlign: "center",
        width: "100%",
        maxWidth: "100vw",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: { xs: "1rem", sm: "2rem" },
          color: "#9B7EBD",
          fontWeight: "bold",
          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
          px: { xs: "0.5rem", sm: 0 },
        }}
      >
        LET'S TALK SOME REAL NUMBERS
      </Typography>
      <Box
        sx={{
          width: { xs: "calc(100% - 16px)", sm: "100%" },
          maxWidth: { xs: "calc(100vw - 16px)", sm: "1000px" },
          backgroundColor: "#0B192C",
          padding: 0,
          borderRadius: "12px",
          margin: "0 auto",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Stats Carousel */}
        <Slider {...settings}>
          {brandsStats.map((brand, index) => (
            <Box key={index} sx={{ width: "100%" }}>
              <StatsSection brand={brand} />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default StatsCarousel;
