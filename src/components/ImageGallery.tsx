import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// Define interface for image items
interface ImageItem {
  src: string;
  cols?: number;
  rows?: number;
}

// Define interface for module from import.meta.glob
interface ImageModule {
  default: string;
}

// Dynamically fetch images from src/assets/images folder using import.meta.glob
const imageUrls = import.meta.glob('../assets/images/photographs/*.{png,jpg,jpeg,svg,PNG,JPG}', { eager: true });

const PinterestGallery: React.FC = () => {
  // Extract image paths from the glob result and convert to ImageItem objects
  const imagePaths: ImageItem[] = Object.values(imageUrls as Record<string, ImageModule>).map(module => ({
    src: module.default,
    cols: 1,
    rows: 1
  }));
  
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Responsive columns based on screen size
  const getCols = () => {
    if (isXsScreen) return 2; // Mobile: 2 columns
    if (isSmScreen) return 3; // Tablet: 3 columns
    return 4; // Desktop: 4 columns
  };

  // Responsive row height
  const getRowHeight = () => {
    if (isXsScreen) return 200; // Smaller height on mobile
    if (isSmScreen) return 300; 
    return 500; // Original height on desktop
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
          marginBottom: { xs: '1rem', sm: '1.5rem', md: '2rem' }, 
          color: "#9B7EBD", 
          fontWeight: 'bold',
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, 
        }}
      >
        My Photographs
      </Typography>

      {/* Scrollable Box Container with Full Width */}
      <Box sx={{
        width: '100%', // Ensure full width
        maxHeight: { xs: '300px', sm: '400px', md: '500px' }, // Responsive height
        overflowY: 'auto', // Scroll vertically
        overflowX: 'hidden', // Prevent horizontal scrolling
        '&::-webkit-scrollbar': {
          width: { xs: 4, sm: 6, md: 8 }, // Responsive scrollbar width
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#9B7EBD', // Scrollbar color
          borderRadius: 4,
        },
        display: 'flex',          // Flexbox layout
        justifyContent: 'center', // Center horizontally
      }}>
        {/* Woven ImageList layout */}
        <ImageList
            sx={{ 
              width: { xs: '95%', sm: '90%', md: '80%' }, 
              height: '100%', 
              maxWidth: '100%',
            }}
            variant="quilted"
            cols={getCols()}
            rowHeight={getRowHeight()}
            gap={isXsScreen ? 4 : 8}
        >
          {imagePaths.map((item, index) => (
            <ImageListItem key={index} cols={item.cols} rows={item.rows}>
              {/* Apply hover effect directly to the ImageListItem */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: { xs: '4px', sm: '6px', md: '8px' },
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '& img': {
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Add shadow on hover
                  },
                }}
              >
                <img 
                  src={item.src} 
                  alt={`photo-${index}`} 
                  loading="lazy"
                  style={{ 
                    maxWidth: '100%', 
                    display: 'block' 
                  }}
                />
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
};

export default PinterestGallery;
