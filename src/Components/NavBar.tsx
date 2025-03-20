import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { Box, Button, MenuItem, Tooltip } from "@mui/material"
import { Link } from 'react-router';
import { useState } from 'react';
const NavBar = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button component={Link} to='/about' onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', textDecorationLine: "none" }}>ABOUT </Button>
                <Button component={Link} to='/' onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block', textDecorationLine: "none" }}>HOME</Button>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        {/* <UserDetails /> */}
                    </IconButton>
                </Tooltip>
                {isLoggedIn && <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography sx={{ textAlign: 'center' }} onClick={handleLogout}>Log Out</Typography>
                    </MenuItem>
                </Menu>}
            </Box>
        </>
    )
};

export default NavBar;