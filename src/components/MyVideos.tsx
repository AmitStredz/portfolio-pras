import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  useTheme,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import One from "/src/assets/images/videos/1.png";
import Two from "/src/assets/images/videos/2.png";
import Three from "/src/assets/images/videos/3.png";
import Four from "/src/assets/images/videos/4.png";
import Five from "/src/assets/images/videos/5.png";
import Six from "/src/assets/images/videos/6.png";
import Seven from "/src/assets/images/videos/7.png";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface VideoList {
  name: string;
  links: string[];
  icon: string;
  id?: string;
}

const iconMap: { [key: string]: string } = {
  "Restaurant Shoots": One,
  "Cafe Showcases": Two,
  "Travel Vlogs": Four,
  "Education": Five,
  "Drone Shots": Three,
  "Event Highlights": Six,
  "Music Videos": Seven,
  "Makeup and products content": Seven,
  "Story Telling": Seven
};

const MyVideos: React.FC = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<VideoList | null>(null);
  const [videoCategories, setVideoCategories] = useState<VideoList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosCollection = collection(db, 'videoCategories');
        const videosSnapshot = await getDocs(videosCollection);
        const videosData = videosSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          links: doc.data().links,
          icon: iconMap[doc.data().name] || Seven
        }));
        setVideoCategories(videosData);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const loadInstagramEmbedScript = () => {
    const existingScript = document.querySelector("#instagram-embed-script");
    if (existingScript) {
      existingScript.remove();
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.id = "instagram-embed-script";
    document.body.appendChild(script);
  };

  const processInstagramEmbeds = () => {
    if ((window as any).instgrm && (window as any).instgrm.Embeds) {
      (window as any).instgrm.Embeds.process();
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      loadInstagramEmbedScript();
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (openDialog) {
      const interval = setInterval(() => {
        if ((window as any).instgrm) {
          processInstagramEmbeds();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [openDialog, selectedCategory]);

  const handleOpenDialog = (category: VideoList) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: { xs: "0.75rem", sm: "1.5rem", md: "2rem" }, width: '100%' }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: { xs: '1.5rem', sm: '2rem' }, color: "#9B7EBD", fontWeight: 'bold', fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' } }}
      >
        Videos I'm proud of
      </Typography>
      <Grid container spacing={{ xs: 1.5, sm: 2 }} justifyContent="center">
        {videoCategories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={category.name}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card
                sx={{
                  backgroundColor: "#0B192C",
                  boxShadow: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
                  width: "100%",
                  position: "relative",
                  overflow: "visible",
                  "&:hover": {
                    backgroundColor: "#1E3E62",
                    color: "#0B192C",
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
                onClick={() => handleOpenDialog(category)}
              >
                <Box
                  component="img"
                  src={category.icon}
                  alt={`${category.name} Icon`}
                  sx={{
                    position: "absolute",
                    top: -25,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: { xs: 60, sm: 70 },
                    height: { xs: 60, sm: 70 },
                    backgroundColor: "transparent",
                    padding: { xs: 0.75, sm: 1 },
                  }}
                />   
                <CardContent sx={{ paddingTop: "3rem", paddingBottom: { xs: '12px !important', sm: '16px !important' } }}> 
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: { xs: '0.5rem', sm: '1rem' }, fontWeight: 'bold', color: theme.palette.primary.main, fontSize: { xs: '1.2rem', sm: '1.1rem' } }}
                  >
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        fullWidth 
        maxWidth="lg" 
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#0B192C",
            width: "100%",
            margin: { xs: '8px', sm: '16px' },
            maxHeight: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 32px)' },
          },
        }} 
      >
        <DialogTitle  
          sx={{
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            textAlign: 'center',
            padding: { xs: '12px 40px 12px 12px', sm: '16px 48px 16px 16px' },
            position: 'relative',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {selectedCategory?.name}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: { xs: 8, sm: 12 },
              top: { xs: '50%', sm: '50%' },
              transform: 'translateY(-50%)',
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: { xs: '8px', sm: '10px' },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
              '& .MuiSvgIcon-root': {
                fontSize: { xs: '1.2rem', sm: '1.4rem' },
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: { xs: '10px', sm: '16px', md: '24px' }, overflowY: 'auto', overflowX: 'hidden', maxWidth: '100%' }}>
          <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ width: '100%', margin: '0 auto', boxSizing: 'border-box', paddingLeft: '0px !important', justifyContent: 'center' }}>
            {selectedCategory &&
              selectedCategory.links.map((video, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box
                    sx={{
                      boxShadow: 3,
                      padding: { xs: "0.5rem", sm: "0.75rem", md: "1rem" },
                      backgroundColor: "#0B192C",
                      borderRadius: "12px",
                      height: '100%',
                      width: '100%',
                      maxWidth: '500px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: { xs: '1.5rem', sm: '1rem' },
                      overflow: 'hidden',
                      margin: '0 auto',
                      position: 'relative',
                    }}
                  >
                    <blockquote
                      className="instagram-media"
                      data-instgrm-permalink={video}
                      data-instgrm-version="14"
                      style={{
                        width: '100%',
                        maxWidth: '100%',
                        margin: '0 auto',
                        border: 'none',
                        fontSize: 'inherit',
                      }}
                    ></blockquote>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MyVideos;
