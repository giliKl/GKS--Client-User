import { ChangeEvent, FormEvent, useState } from 'react';
import  { AxiosError } from 'axios';
import { Box, Button, Grid2 as Grid, Modal, TextField, Alert } from '@mui/material';
import { UserType } from '../../Types/UserType';
import { AppDispatch } from '../Store/Store';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Store/UserSlice';
import { observer } from 'mobx-react';
import { Roles } from '../../Types/RoleType';
import userStore from './UserStore';

const Register = observer(() => {
    const alertStyle = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', outline: 'none', };
    const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, };
    const [alertInfo, setAlertInfo] = useState<{ severity: 'success' | 'error' | 'warning' | 'info', message: string } | null>(null);
    const [open, setOpen] = useState(true);
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [inputCode, setInputCode] = useState<string>('');
    const [data, setData] = useState<UserType>({
        id: 0,
        name: '',
        email: '',
        password: '',
        filesId: [],
        isActive: true,
        roles: []
    });

    const handleOpen = () => {
        setOpen(!open);
    };

    const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevS => ({
            ...prevS,
            [name]: value
        }));
    };
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePasswordStrength = (password: string) => {
        if (password.length < 6) return 'Weak';
        if (password.length < 10) return 'Moderate';
        return 'Strong';
    };
    const sendVerificationCode = (email: string) => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setVerificationCode(code);
        // Simulate sending email
        console.log(`Verification code sent to ${email}: ${code}`);
        setIsDialogOpen(true);
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, password, email } = data;
        if (email && password && name) {
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
                userStore.registerUser({name:data.name,email:data.email,password:data.password,isActive:data.isActive}, [Roles.User]);
                setAlertInfo({ severity: 'success', message: 'Successfully registation!' });
            }
            catch (e: AxiosError | any) {
                if (e.response?.status === 401) {
                    setAlertInfo({ severity: 'error', message: 'Invalid credentials' });
                } else {
                    setAlertInfo({ severity: 'error', message: 'An unexpected error occurred. Please try again later.' });
                }
            }
            finally {
                setOpen(false);
            }
            setAlertInfo({ severity: 'success', message: 'Registration successful!' });
        }
        else {
            setAlertInfo({ severity: 'error', message: 'Please fill in all required fields' });
        }
    }

    return (
        <>
            <Modal
                open={!!alertInfo}
                onClose={() => setAlertInfo(null)} >
                <Box sx={alertStyle}>
                    {alertInfo && (
                        <Alert severity={alertInfo.severity} onClose={() => setAlertInfo(null)} sx={{ width: '100%' }}> {alertInfo.message}
                        </Alert>)}
                </Box>
            </Modal>
            <Grid container>
                <Grid size={4}><Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => handleOpen()}>Registration</Button></Grid>
            </Grid>
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <TextField name="name" label="name" onChange={handelChange} />
                        <br /><br />
                        <TextField name="email" label="Email" onChange={handelChange} />
                        <br /><br />
                        <TextField name="password" label="Password" onChange={handelChange} />
                        <br /><br />
                        <Button type="submit">Submit</Button>
                    </form>
                </Box>
        </>
    );
})

export default Register;