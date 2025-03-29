import React from 'react';
import { Card, CardContent, CardHeader, Typography, List, ListItem, ListItemIcon, ListItemText,  Grid, Box } from '@mui/material';
import { Lock, VisibilityOff, Sync, Verified, Speed } from '@mui/icons-material';
import logo from "../../public/logo.jpg";

const About: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Card sx={{ maxWidth: 1200, margin: 'auto' }}>
        <CardHeader
          title={<Typography variant="h4">Secure File Management</Typography>}
          subheader={<Typography variant="h6">Efficient and Safe File Sharing</Typography>}
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid  size={{ xs: 12, md: 6 }}>
              <img src={logo} alt="Company Overview" style={{ width: '100%', borderRadius: '8px' }} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} >
              <Typography variant="h5" gutterBottom>About Our Company</Typography>
              <Typography variant="body1" >
                Our company is committed to providing a secure and reliable platform for file management and sharing.
                With cutting-edge encryption and an intuitive interface, we ensure your files remain safe, accessible, and easily shared.
              </Typography>
              <Typography variant="h6" gutterBottom>Our Core Principles</Typography>
              <List>
                <ListItem>
                  <ListItemIcon><Lock color="primary" /></ListItemIcon>
                  <ListItemText primary="Security - We use state-of-the-art encryption to protect your data." />
                </ListItem>
                <ListItem>
                  <ListItemIcon><VisibilityOff color="primary" /></ListItemIcon>
                  <ListItemText primary="Confidentiality - Your files remain private and accessible only to authorized users." />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Sync color="primary" /></ListItemIcon>
                  <ListItemText primary="Reliability - Our platform ensures uninterrupted and secure file access." />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Verified color="primary" /></ListItemIcon>
                  <ListItemText primary="Trust - We are committed to transparency and strong authentication measures." />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Speed color="primary" /></ListItemIcon>
                  <ListItemText primary="Efficiency - Optimized performance for fast and seamless file sharing." />
                </ListItem>
              </List>
              <Typography variant="h6" gutterBottom>Cloud Security & Secure Sharing</Typography>
              <Typography variant="body1" >
                Our cloud-based platform guarantees your files are securely stored and protected with end-to-end encryption.
                We employ the latest security protocols to ensure that your documents are safe from unauthorized access.
                Whether you’re sharing sensitive documents or collaborating with others, our platform provides encrypted sharing options to ensure only the right people can access your files.
              </Typography>
              <Typography variant="body1" >
                We use strong multi-factor authentication to verify users, ensuring that every action on our platform is secure and that your files are accessible only by trusted parties.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;
