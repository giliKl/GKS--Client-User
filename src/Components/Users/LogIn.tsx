// import { useRef, useState } from "react";
// import { observer } from "mobx-react-lite";
// import { Button, TextField, Grid, Box, Alert,  } from '@mui/material';
// import { Link, useNavigate } from "react-router";
// import { Roles } from "../../Types/RoleType";
// import userStore from "./UserStore";


// const LogIn = observer(() => {
//     const navigate = useNavigate(); 
//     const emailRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);
//     const [alertInfo, setAlertInfo] = useState<{ severity: 'success' | 'error' | 'warning' | 'info', message: string } | null>(null);

//     const validateEmail = (email: string) => {
//         const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return re.test(email);
//     };

//     const validatePasswordStrength = (password: string) => {
//         if (password.length < 6) return 'Weak';
//         if (password.length < 10) return 'Moderate';
//         return 'Strong';
//     };

//     const handleSubmit = async (e: { preventDefault: () => void; }) => {
//         e.preventDefault();
//         const email = emailRef.current?.value;
//         const password = passwordRef.current?.value;
//         if (email && password) {
//             if (!validateEmail(email)) {
//                 setAlertInfo({ severity: 'warning', message: 'Please enter a valid email address.' });
//                 return;
//             }
//             const passwordStrength = validatePasswordStrength(password);
//             if (passwordStrength === 'Weak') {
//                 setAlertInfo({ severity: 'warning', message: 'Password is too weak. Please choose a stronger password.' });
//                 return;
//             }
//             try {
//                 await userStore.loginUser(email, password, [Roles.User]).then(() => {               
//                 console.log(userStore.user.id, userStore.token);
//                 navigate('/');
//                 });
                
//                 setAlertInfo({ severity: 'success', message: 'Successfully logged in!' });
//             } catch (error) {            
//                 setAlertInfo({ severity: 'error', message: 'Failed to login. Please check your credentials and try again.' });
//                 console.error('Login error:', error);
//             }
//         } else {
//             setAlertInfo({ severity: 'warning', message: 'Please fill in all required fields' });
//         }
//     };

//     return (<>
//        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
//             {alertInfo && (
//                 <Alert severity={alertInfo.severity} onClose={() => setAlertInfo(null)} sx={{ mb: 2 }}>
//                     {alertInfo.message}
//                 </Alert>
//             )}
//             <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
//                     <Grid size={12}>
//                         <TextField label="Email" inputRef={emailRef} fullWidth required />
//                     </Grid>
//                     <Grid size={12}>
//                         <TextField type="password" label="Password" inputRef={passwordRef} fullWidth required />
//                     </Grid>
//                     <Grid size={12}>
//                         <Button type="submit" variant="contained" color="primary" fullWidth>
//                             Login
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </form>
//             <br />
//             <Button type="button" component={Link} to='/register'> don't have an account? Sign up</Button>
//         </Box>
//     </>);
// });

// export default LogIn;
"use client"

import type React from "react"

import { useState, useRef } from "react"
import { observer } from "mobx-react-lite";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link as MuiLink,
  Divider,
} from "@mui/material"
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material"
import { Roles } from "../../Types/RoleType"
import userStore from "./UserStore"
import { Link, useNavigate } from "react-router"

const LoginForm = observer(() => {
  const navigate = useNavigate(); 
const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [alertInfo, setAlertInfo] = useState<{
    severity: "success" | "error" | "warning" | "info"
    message: string
  } | null>(null)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    let isValid = true

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required")
      isValid = false
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      isValid = false
    } else {
      setEmailError("")
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required")
      isValid = false
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      isValid = false
    } else {
      setPasswordError("")
    }

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setAlertInfo(null)

    try {
      await userStore.loginUser(email, password, [Roles.User])

      setAlertInfo({
        severity: "success",
        message: "Login successful! Redirecting to dashboard...",
      })

      // Redirect after a short delay to show the success message
      setTimeout(() => {
        navigate("/")
      }, 1000)
    } catch (error: any) {
      setAlertInfo({
        severity: "error",
        message: error.message || "Failed to login. Please check your credentials and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    // Implement forgot password functionality
    alert("Forgot password functionality will be implemented soon.")
  }

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 450,
        mx: "auto",
        mt: 5,
        p: 4,
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          color: "#579FBA",
          fontWeight: "bold",
        }}
      >
        Welcome Back
      </Typography>

      <Typography variant="body2" align="center" sx={{ mb: 3, color: "text.secondary" }}>
        Sign in to access your secure files
      </Typography>

      {alertInfo && (
        <Alert severity={alertInfo.severity} onClose={() => setAlertInfo(null)} sx={{ mb: 3, borderRadius: 1 }}>
          {alertInfo.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          inputRef={emailRef}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          inputRef={passwordRef}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, mb: 3 }}>
          <MuiLink
            component="button"
            variant="body2"
            onClick={handleForgotPassword}
            sx={{ textDecoration: "none", color: "#579FBA" }}
            type="button"
          >
            Forgot password?
          </MuiLink>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isLoading}
          sx={{
            py: 1.5,
            backgroundColor: "#579FBA",
            "&:hover": {
              backgroundColor: "#3d7a94",
            },
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
        </Button>
      </form>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2">
          Don't have an account?{" "}
          <MuiLink
            component={Link}
            to="/register"
            sx={{
              textDecoration: "none",
              color: "#579FBA",
              fontWeight: "medium",
            }}
          >
            Create Account
          </MuiLink>
        </Typography>
      </Box>
    </Paper>
  )
})

export default LoginForm
