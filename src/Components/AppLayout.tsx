import { Outlet } from "react-router"
import { AppBar, Box, Container, IconButton, Paper, Toolbar, Typography } from "@mui/material"
import { Email, Facebook, Instagram, Phone, Twitter, WhatsApp, YouTube } from "@mui/icons-material"
import NavBar from "./NavBar";

const AppLayout = () => {
    return (<>
        <header>
            <AppBar sx={{ position: "static", top: "0px" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <img src="/logo.jpg" alt="shef Icon" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >Yummy
                        </Typography>
                        <NavBar />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >Yummy-Reecipies
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>

        </header>
        <main><Outlet /></main>
        {/* <footer>
            <Paper component="footer" sx={{ p: 1.5, mt: 'auto', backgroundColor: 'primary.main', color: 'white', bottom: 0, width: '100%', overflowX: 'hidden', boxSizing: 'border-box', marginTop: '30px' }}>
                <Container maxWidth="lg" sx={{ overflowX: 'hidden' }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', py: 0.5, overflowX: 'hidden', width: '100%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', mb: { xs: 1, md: 0 } }}>
                            <Typography variant="h6" gutterBottom> Contact Us</Typography>
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <IconButton href="tel:+1234567890" color="inherit"> <Phone /> </IconButton>
                                <IconButton href="mailto:contact@example.com" color="inherit"> <Email /> </IconButton>
                                <IconButton href="https://wa.me/1234567890" target="_blank" color="inherit"> <WhatsApp /> </IconButton>
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="h6" gutterBottom> Follow Us</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <IconButton href="https://facebook.com" target="_blank" color="inherit"> <Facebook /> </IconButton>
                                <IconButton href="https://instagram.com" target="_blank" color="inherit"><Instagram /></IconButton>
                                <IconButton href="https://youtube.com" target="_blank" color="inherit"><YouTube /></IconButton>
                                <IconButton href="https://twitter.com" target="_blank" color="inherit"><Twitter /></IconButton>
                            </Box>
                        </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}> {new Date().getFullYear()} Yummy-Reecipies. All rights reserved.</Typography>
                </Container>
            </Paper>
        </footer> */}
    </>)
};

export default AppLayout;
