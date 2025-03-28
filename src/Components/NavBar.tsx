import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { Link } from "react-router";
import SideBar from "./SideBar";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <Button
          size="large"
          aria-label="open menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon sx={{ mr: 1, color: "#ED3D48", backgroundColor: "#FFFFFF" }} />
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        > 
          <MenuItem onClick={handleCloseNavMenu} >
            <Button sx={{ color: "#FFFFFF"}} component={Link} to='/about'>About</Button>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Button sx={{ color: "#FFFFFF" }} component={Link} to='/'>Dashboard</Button>
          </MenuItem>
        </Menu>
      </Box>

      {/* NavBar for larger screens */}
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: '2cm' }}>
        <Button sx={{ color: "#FFFFFF" }} component={Link} to='/'>Dashboard</Button>
        <Button sx={{ color: "#FFFFFF" }} component={Link} to='/about'>About</Button>
      </Box>

      {/* Sidebar Icon */}
      <IconButton sx={{ color: "#579fba", position: "absolute", right: 0, width: 30, top: 300 }} onClick={handleToggleSidebar}>
        <MoreVert sx={{ fontSize: 80 }} />
      </IconButton>

      {/* Drawer sidebar */}
      <SideBar open={openSidebar} onClose={handleToggleSidebar} />
    </>
  );
};

export default NavBar;
