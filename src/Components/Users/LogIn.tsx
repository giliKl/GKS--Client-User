import { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Grid, Modal, Box, TextField, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { Roles } from "../../Types/RoleType";
import userStore from "./UserStore";

const style = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
};
const alertStyle = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 2, outline: 'none', };

const LogIn = observer(() => {
    const navigate = useNavigate(); 
    const [open, setOpen] = useState(true);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [alertInfo, setAlertInfo] = useState<{ severity: 'success' | 'error' | 'warning' | 'info', message: string } | null>(null);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        if (email && password) {
            if (!validateEmail(email)) {
                setAlertInfo({ severity: 'warning', message: 'Please enter a valid email address.' });
                return;
            }
            try {
                await userStore.loginUser(email, password,[Roles.User]);
                setAlertInfo({ severity: 'success', message: 'Successfully logged in!' });
                navigate('/');
            } catch (e: any) {
                if (e.response?.status === 401) {
                    setAlertInfo({ severity: 'error', message: 'Invalid credentials' });
                } else {
                    setAlertInfo({ severity: 'error', message: 'An unexpected error occurred. Please try again later.' });
                }
            } finally {
                setOpen(false);
            }
        } else {
            setAlertInfo({ severity: 'error', message: 'Please fill in all required fields' });
        }
    };

    return (<>
        <Modal open={!!alertInfo} onClose={() => setAlertInfo(null)}>
            <Box sx={alertStyle}>
                {alertInfo && (
                    <Alert severity={alertInfo.severity} onClose={() => setAlertInfo(null)} sx={{ width: '100%' }}>
                        {alertInfo.message}
                    </Alert>
                )}
            </Box>
        </Modal>
        <Grid container>
            <Grid item xs={4}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => setOpen(!open)}>Login</Button>
            </Grid>
        </Grid>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField label='userEmail' inputRef={emailRef} fullWidth /><br /><br />
                    <TextField type="password" label='password' inputRef={passwordRef} fullWidth /><br /><br />
                    <Button type="submit" variant="contained">Login</Button><br /><br />
                    <p>Don't have an account?</p>
                    <Button type="button" component={Link} to='/register'>Sign up</Button>
                </form>
            </Box>
    </>);
});

export default LogIn;
