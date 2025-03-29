import { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, TextField, Grid, Box, Alert,  } from '@mui/material';
import { Link, useNavigate } from "react-router";
import { Roles } from "../../Types/RoleType";
import userStore from "./UserStore";


const LogIn = observer(() => {
    const navigate = useNavigate(); 
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [alertInfo, setAlertInfo] = useState<{ severity: 'success' | 'error' | 'warning' | 'info', message: string } | null>(null);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePasswordStrength = (password: string) => {
        if (password.length < 6) return 'Weak';
        if (password.length < 10) return 'Moderate';
        return 'Strong';
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
            const passwordStrength = validatePasswordStrength(password);
            if (passwordStrength === 'Weak') {
                setAlertInfo({ severity: 'warning', message: 'Password is too weak. Please choose a stronger password.' });
                return;
            }
            try {
                await userStore.loginUser(email, password, [Roles.User]).then(() => {               
                console.log(userStore.user.id, userStore.token);
                navigate('/');
                });
                
                setAlertInfo({ severity: 'success', message: 'Successfully logged in!' });
            } catch (error) {            
                setAlertInfo({ severity: 'error', message: 'Failed to login. Please check your credentials and try again.' });
                console.error('Login error:', error);
            }
        } else {
            setAlertInfo({ severity: 'warning', message: 'Please fill in all required fields' });
        }
    };

    return (<>
       <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            {alertInfo && (
                <Alert severity={alertInfo.severity} onClose={() => setAlertInfo(null)} sx={{ mb: 2 }}>
                    {alertInfo.message}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField label="Email" inputRef={emailRef} fullWidth required />
                    </Grid>
                    <Grid size={12}>
                        <TextField type="password" label="Password" inputRef={passwordRef} fullWidth required />
                    </Grid>
                    <Grid size={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <br />
            <Button type="button" component={Link} to='/register'> don't have an account? Sign up</Button>
        </Box>
    </>);
});

export default LogIn;
