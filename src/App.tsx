import { ThemeProvider, createTheme, CssBaseline, Box, responsiveFontSizes } from '@mui/material';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Results from './components/Results';
import MyVideos from './components/MyVideos';
import Testimonials from './components/Testimonials';
import ImageGallery from './components/ImageGallery';
import LogoCollection from './components/Brands';
import StayConnected from './components/ContactUs';
import { Analytics } from "@vercel/analytics/react"
// Add router imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VideoAdmin from './components/VideoAdmin';

const App = () => {
 // const [darkMode, setDarkMode] = useState(false);

  let theme = createTheme({
    typography: {
      fontFamily: "'Public Sans'",
      //fontWeightLight: 200, // Ensures Extra Light is used
      // Set base font sizes larger to begin with
      h1: {
        fontSize: '2.5rem',
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
      },
      h2: {
        fontSize: '3.5rem',
        '@media (max-width:600px)': {
          fontSize: '1.8rem',
        },
      },
      h3: {
        fontSize: '1.8rem',
        '@media (max-width:600px)': {
          fontSize: '1.5rem',
        },
      },
      h4: {
        fontSize: '2rem',
        '@media (max-width:600px)': {
          fontSize: '1.3rem',
        },
      },
      h5: {
        fontSize: '1.3rem',
        '@media (max-width:600px)': {
          fontSize: '1.2rem',
        },
      },
      h6: {
        fontSize: '1.3rem',
        '@media (max-width:600px)': {
          fontSize: '1rem',
        },
      },
      body1: {
        fontSize: '1rem',
        '@media (max-width:600px)': {
          fontSize: '1.1rem', // Increase body text on mobile
        },
      },
      body2: {
        fontSize: '0.9rem',
        '@media (max-width:600px)': {
          fontSize: '1rem', // Increase secondary body text on mobile
        },
      },
      button: {
        fontSize: '0.9rem',
        '@media (max-width:600px)': {
          fontSize: '1.1rem', // Larger button text on mobile
        },
      },
    },
    palette: {
      //mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2', // Replace with your primary color
      },
      secondary: {
        main: '#ac2e0e', // Replace with your secondary color
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            body1: 'div', // Map body1 to div to avoid paragraph margins
          },
        },
      },
    },
  });

  // Apply responsive font scaling
  theme = responsiveFontSizes(theme, { factor: 1.2 }); // Higher factor means more aggressive scaling

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/adminvideo" element={<VideoAdmin />} />
          <Route path="/" element={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: { xs: '0.5rem', sm: '1rem', md: '2rem' },
                background: 'linear-gradient(to right, #1E3E62, #0B192C)',
                color: 'white',
              }}
            >
              <HeroSection />
              <Features/>
              <Results/>
              <MyVideos/>
              <Testimonials/>
              <ImageGallery />
              <LogoCollection />
              <StayConnected />
            </Box>
          } />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </ThemeProvider>
  );
};

export default App;
