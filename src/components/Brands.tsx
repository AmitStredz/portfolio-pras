import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme, useMediaQuery } from "@mui/material";
import thirty3 from "/src/assets/images/logos/33Intact.jpg";
import Crave from "/src/assets/images/logos/crave.png";
import patrons from "/src/assets/images/logos/patrons.png";
import madras from "/src/assets/images/logos/madras.png";
import marisco from "/src/assets/images/logos/Marisco.jpg";
import raho from "/src/assets/images/logos/raho.png";
import raw from "/src/assets/images/logos/raw.jpg";
import indian from "/src/assets/images/logos/indian.png";
import omega from "/src/assets/images/logos/omega.png";
import blackbox from "/src/assets/images/logos/blackbox.jpeg";
import wilson from "/src/assets/images/logos/wilson.jpeg";

const logos = [Crave, indian, patrons, thirty3, madras, marisco, raho, raw, omega, blackbox, wilson];

export default function LogoCollection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box sx={{ 
      padding: { xs: "1rem", sm: "1.5rem", md: "2rem" }, 
      width: "100%", 
      maxWidth: {xs:"300px", md:"1200px"}, // Set a maximum width for larger screens
      margin: "0 auto",
      boxSizing: "border-box",
    }}>
      <Typography
        variant="h4"
        sx={{ 
          marginBottom: { xs: "1rem", sm: "1.5rem", md: "2rem" }, 
          color: "#9B7EBD", 
          fontWeight: "bold", 
          textAlign: "center",
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
        }}
      >
        Brands that I work with
      </Typography>

      {/* Logo Carousel Container with strict overflow control */}
      <Box
        sx={{
          width: "100%",
          overflow: "hidden", // Hide any overflow
          position: "relative",
        }}
      >
        {/* Inner scrolling container */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap", // Prevent wrapping
            animation: "marquee 15s linear infinite",
            "@keyframes marquee": {
              "0%": { transform: "translateX(100%)" },
              "100%": { transform: "translateX(-100%)" },
            },
          }}
        >
          {/* Only duplicate once - less width */}
          {[...logos, ...logos].map((logo, index) => (
            <Box 
              key={index} 
              sx={{ 
                flexShrink: 0, 
                padding: { xs: "0 0.5rem", sm: "0 0.75rem", md: "0 1rem" },
              }}
            >
              <img
                src={logo}
                alt={`Brand logo ${index % logos.length + 1}`}
                style={{
                  width: isMobile ? "80px" : (isTablet ? "100px" : "120px"),
                  height: isMobile ? "60px" : (isTablet ? "70px" : "80px"),
                  opacity: 0.9,
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
