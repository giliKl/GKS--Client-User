import {Drawer,List, ListItem,ListItemButton,ListItemIcon,ListItemText,IconButton,Tooltip,Divider,Box,CssBaseline,styled} from "@mui/material";
import {FileUpload,FolderShared,Description,Dashboard,Info,Menu as MenuIcon,ChevronLeft as ChevronLeftIcon} from '@mui/icons-material';
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import UserDetails from "./Users/UserDetails";
import LogoutIcon from '@mui/icons-material/Logout';
import userStore from "./Users/UserStore";

const drawerWidth = 240;

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `60px`,
});

const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: any) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const menuItems = [
  { text: "Upload File", icon: <FileUpload />, to: "/upload" },
  { text: "My Files", icon: <FolderShared />, to: "/filelist" },
  { text: "Shared Files", icon: <Description />, to: "/view-file" },
  { text: "About", icon: <Info />, to: "/about" },
  { text: "Dashboard", icon: <Dashboard />, to: "/" }
];

const SideBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handellogout = () => {
    userStore.logout();
    navigate('/login');
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DrawerStyled variant="permanent" anchor="left" open={open}>
        <Box sx={{ display: 'flex', justifyContent: open ? 'flex-end' : 'center', p: 1 }}>
          <IconButton onClick={() => setOpen(!open)} sx={{ color: "#579fba" }}>
            {open ? <ChevronLeftIcon /> : <UserDetails />}
          </IconButton>
        </Box>
        <Divider />
        <List>
          {menuItems.map(({ text, icon, to }) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={!open ? text : ''} placement="right">
                <ListItemButton
                  component={Link}
                  to={to}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#579fba",
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>

            </ListItem>
          ))}
          <Tooltip title={!open ? "Log Out" : ''} placement="right">
            <ListItemButton
              onClick={handellogout}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#579fba",
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Tooltip>
        </List>
      </DrawerStyled>
    </Box>
  );
};

export default SideBar;

