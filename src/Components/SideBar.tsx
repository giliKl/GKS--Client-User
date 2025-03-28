import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Tooltip } from "@mui/material";
import { FileUpload, FolderShared, Description, Dashboard, Info } from '@mui/icons-material'; // אייקונים מתאימים לאבטחת מסמכים
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from "react-router";

const drawerWidth = 240;

const SideBar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <Tooltip title="Close Sidebar" arrow>
        <IconButton onClick={onClose} sx={{ alignSelf: 'flex-end', margin: 1, color: "#579fba" }}>
          <ChevronRightIcon />
        </IconButton>
      </Tooltip>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/upload'>
            <ListItemIcon sx={{ color: "#579fba" }}>
              <FileUpload />
            </ListItemIcon>
            <ListItemText primary="Upload File" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/filelist'>
            <ListItemIcon sx={{ color: "#579fba" }}>
              <FolderShared />
            </ListItemIcon>
            <ListItemText primary="My Files" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/view-file'>
            <ListItemIcon sx={{ color: "#579fba" }}>
              <Description />
            </ListItemIcon>
            <ListItemText primary="Shared Files" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/about'>
            <ListItemIcon sx={{ color: "#579fba" }}>
              <Info />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/'>
            <ListItemIcon sx={{ color: "#579fba" }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
