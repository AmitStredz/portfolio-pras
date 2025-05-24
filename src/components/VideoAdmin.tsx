import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
  IconButton,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

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

interface VideoCategory {
  id: string;
  name: string;
  links: string[];
}

function isInstgrm(obj: unknown): obj is { Embeds: { process: () => void } } {
  return !!obj && typeof (obj as any).Embeds?.process === 'function';
}

const isValidInstagramUrl = (url: string) => {
  // Basic check for Instagram post/reel URL
  return /^https?:\/\/(www\.)?instagram\.com\/(reel|p)\//.test(url);
};

const VideoAdmin: React.FC = () => {
  const [categories, setCategories] = useState<VideoCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [selected, setSelected] = useState<VideoCategory | null>(null);
  const [newUrl, setNewUrl] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{open: boolean, url: string | null}>({open: false, url: null});
  const [embedKey, setEmbedKey] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const snap = await getDocs(collection(db, 'videoCategories'));
      const cats: VideoCategory[] = snap.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        links: Array.isArray(doc.data().links) ? doc.data().links : [],
      }));
      setCategories(cats);
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    setSelected(categories.find(c => c.id === selectedId) || null);
    setEmbedKey(e => e + 1);
  }, [selectedId, categories]);

  useEffect(() => {
    if (!selected) return;
    const scriptId = 'instagram-embed-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (script) script.remove();
    script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    const interval = setInterval(() => {
      if ((window as any).instgrm && isInstgrm((window as any).instgrm)) {
        (window as any).instgrm.Embeds.process();
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [selected, embedKey]);

  const handleAdd = async () => {
    if (!selected || !newUrl.trim()) return;
    setAddLoading(true);
    const ref = doc(db, 'videoCategories', selected.id);
    await updateDoc(ref, { links: arrayUnion(newUrl.trim()) });
    setCategories(cats => cats.map(c => c.id === selected.id ? { ...c, links: [...c.links, newUrl.trim()] } : c));
    setNewUrl('');
    setAddLoading(false);
  };

  const handleDelete = async (url: string) => {
    if (!selected) return;
    const ref = doc(db, 'videoCategories', selected.id);
    await updateDoc(ref, { links: arrayRemove(url) });
    setCategories(cats => cats.map(c => c.id === selected.id ? { ...c, links: c.links.filter(l => l !== url) } : c));
    setDeleteDialog({open: false, url: null});
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', p: 2, background: '#fff', minHeight: '100vh' }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>Video Admin</Typography>
      {loading ? <CircularProgress /> : (
        <>
          <FormControl fullWidth sx={{ mb: 2 }} size="small">
            <InputLabel id="cat-label">Category</InputLabel>
            <Select
              labelId="cat-label"
              value={selectedId}
              label="Category"
              onChange={e => setSelectedId(e.target.value)}
            >
              {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </Select>
          </FormControl>
          {selected && (
            <>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  label="Instagram Video URL"
                  value={newUrl}
                  onChange={e => setNewUrl(e.target.value)}
                  size="small"
                  sx={{ flex: 1 }}
                />
                <Button
                  variant="contained"
                  onClick={handleAdd}
                  disabled={addLoading || !newUrl.trim()}
                  sx={{ minWidth: 100 }}
                >
                  {addLoading ? 'Adding...' : 'Add'}
                </Button>
              </Box>
              <Grid container spacing={2} key={embedKey}>
                {selected.links.length === 0 && (
                  <Grid item xs={12}><Typography color="text.secondary">No videos in this category.</Typography></Grid>
                )}
                {selected.links.map((url, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Card sx={{ border: '1px solid #eee', borderRadius: 2, background: '#fafafa', minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                      <CardHeader
                        action={
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setDeleteDialog({open: true, url})}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        }
                        sx={{ pb: 0, alignItems: 'flex-start' }}
                      />
                      <CardContent sx={{ p: 1, pt: 0 }}>
                        {isValidInstagramUrl(url) ? (
                          <blockquote
                            className="instagram-media"
                            data-instgrm-permalink={url}
                            data-instgrm-version="14"
                            style={{ width: '100%', minHeight: 320, margin: '0 auto', border: 'none', fontSize: 'inherit', background: 'transparent' }}
                          ></blockquote>
                        ) : (
                          <Box sx={{ width: '100%', minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 16, border: '1px dashed #ccc', borderRadius: 1, background: '#fff' }}>
                            Invalid or private Instagram URL
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
          <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({open: false, url: null})}>
            <DialogTitle>Delete Video</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete this video?</Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-end' }}>
                <Button onClick={() => setDeleteDialog({open: false, url: null})}>Cancel</Button>
                <Button color="error" variant="contained" onClick={() => deleteDialog.url && handleDelete(deleteDialog.url)}>Delete</Button>
              </Box>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default VideoAdmin; 