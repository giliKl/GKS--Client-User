import { AppBar, Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router";
import logo from "../../public/logo.jpg";

import GitHubIcon from '@mui/icons-material/GitHub';

import SideBar from "./SideBar";
import EmailIcon from "./Massages/EmailIcon";

export default function appLayout() {

  return (
    <>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", flexDirection: "row-reverse", justifyContent: "flex-end", alignItems: "center" }}>
            <img
              src={logo}
              alt="GKS Logo"
              style={{ height: "55px", marginRight: "5px", borderRadius: '10px' }}
            />
            <Typography variant="h4" fontFamily="cursive" align="right" marginRight="15px" sx={{ flexGrow: 1 }}>
              GKS
            </Typography>

          </Toolbar>
        </Container>
      </AppBar >
      <SideBar />
      <Box component="div" sx={{ minHeight: 'calc(100vh - 64px - 200px)', paddingTop: '50px', overflowX: 'hidden', width: '100%' ,paddingBottom:'20px'}}>
        <Outlet/>
        <EmailIcon/>
            </Box>
            <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 3,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: "15px",
            fontFamily: "cursive",
            color: "#2c3e50",
          }}
        >
          © 2025 Gila Kleinman. All rights reserved
        </Typography>
        <IconButton
          href="https://github.com/giliKl"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 1 }}
        >
          <GitHubIcon sx={{ color: "#579FBA", fontSize: 35 }} />
        </IconButton>
      </Box>
    </>
  )
}

