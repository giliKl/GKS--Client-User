// import {  FormEvent, useRef, useState } from 'react';
// import { Button, TextField, Grid, Box, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import { UserType } from '../../Types/UserType';
// import { observer } from 'mobx-react';
// import { Roles } from '../../Types/RoleType';
// import userStore from './UserStore';
// import { Link, useNavigate } from 'react-router';

// const Register = observer(() => {
//     const navigate = useNavigate();

//     const nameRef = useRef<HTMLInputElement>(null);
//     const emailRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);
//     const [alertInfo, setAlertInfo] = useState<{ severity: 'success' | 'error' | 'warning' | 'info', message: string } | null>(null);
//     const [verificationCode, setVerificationCode] = useState<string>('');
//     const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
//     const [inputCode, setInputCode] = useState<string>('');

//     const validateEmail = (email: string) => {
//         const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return re.test(email);
//     };

//     const sendVerificationCode = (email: string) => {
//         const code = Math.floor(100000 + Math.random() * 900000).toString();
//         setVerificationCode(code);
//         const subject = `Verify your email for GKS ${code}`
//         const body = `Hello, ${nameRef.current?.value}. Your verification code for GKS is ${code}.\n Please use it to complete your registration process.`
//         userStore.sendEmail(email, subject, body);
//         console.log(`Verification code sent to ${email}: ${code}`);
//         setIsDialogOpen(true);
//         userStore.sendEmail(email, subject, body);
//         console.log(`Verification code sent to ${email}: ${code}`);
//         setIsDialogOpen(true);
//     };

//     const validatePasswordStrength = (password: string) => {
//         if (password.length < 6) return 'Weak';
//         if (password.length < 10) return 'Moderate';
//         return 'Strong';
//     };
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const name = nameRef.current?.value;
//         const email = emailRef.current?.value;
//         const password = passwordRef.current?.value;

//         if (email && password && name) {
//             if (!validateEmail(email)) {
//                 setAlertInfo({ severity: 'warning', message: 'Please enter a valid email address.' });
//                 return;
//             }

//             const passwordStrength = validatePasswordStrength(password);
//             if (passwordStrength === 'Weak') {
//                 setAlertInfo({ severity: 'warning', message: 'Password is too weak. Please choose a stronger password.' });
//                 return;
//             }

//             sendVerificationCode(email);
//         }
//         else {
//             setAlertInfo({ severity: 'warning', message: 'Please fill in all fields.' });
//         }
//     }
//     const handleVerifyCode = async () => {
//         if (inputCode == verificationCode) {
//             const name = nameRef.current?.value;
//             const email = emailRef.current?.value;
//             const password = passwordRef.current?.value;

//             const newUser: Partial<UserType> = {
               
//                 name,
//                 email,
//                 password,
//                 filesId: [],
//                 isActive: true

//             };

//             try {
//                 await userStore.registerUser(newUser,[Roles.User]);
//                 navigate('/');
//                 setAlertInfo({ severity: 'success', message: 'Successfully registered!' });
//                 setIsDialogOpen(false);
//             } catch (error) {
//                 setAlertInfo({ severity: 'error', message: 'An unexpected error occurred. Please try again later.' });
//                 console.error('Register error:', error);
//             }
//         } else {
//             setAlertInfo({ severity: 'error', message: 'Verification code is incorrect.' });
//         }
//     };
//     return (
//         <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
//         {alertInfo && (
//             <Alert severity={alertInfo.severity} onClose={() => setAlertInfo(null)} sx={{ mb: 2 }}>
//                 {alertInfo.message}
//             </Alert>
//         )}
//         <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//                 <Grid size={12}>
//                     <TextField label="Name" inputRef={nameRef} fullWidth required />
//                 </Grid>
//                 <Grid size={12}>
//                     <TextField label="Email" inputRef={emailRef} fullWidth required />
//                 </Grid>
//                 <Grid size={12}>
//                     <TextField type="password" label="Password" inputRef={passwordRef} fullWidth required />
//                 </Grid>
//                 <Grid size={12}>
//                     <Button type="submit" variant="contained" color="primary" fullWidth>
//                         Register
//                     </Button>
//                 </Grid>
//                 <br />
//                 <Button type="button" component={Link} to='/login'> Have an account? Sign up</Button>

//             </Grid>
//         </form>
//         <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
//             <DialogTitle>Verify Your Email</DialogTitle>
//             <DialogContent>
//                 <DialogContentText>
//                     Please enter the verification code sent to your email.
//                 </DialogContentText>
//                 <TextField
//                     autoFocus
//                     margin="dense"
//                     label="Verification Code"
//                     fullWidth
//                     value={inputCode}
//                     onChange={(e) => setInputCode(e.target.value)}
//                 />
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={() => setIsDialogOpen(false)} color="primary">
//                     Cancel
//                 </Button>
//                 <Button onClick={handleVerifyCode} color="primary">
//                     Verify
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     </Box>
//     );
// })

// export default Register;

"use client"

import { type FormEvent, useRef, useState } from "react"
import {
  Button,
  TextField,
  Grid,
  Box,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  CircularProgress,
  Tooltip,
  FormHelperText,
} from "@mui/material"
import type { UserType } from "../../Types/UserType"
import { observer } from "mobx-react"
import { Roles } from "../../Types/RoleType"
import userStore from "./UserStore"
import { Link, useNavigate } from "react-router"
import { Visibility, VisibilityOff, Info, CheckCircle, Cancel } from "@mui/icons-material"

const Register = observer(() => {
  const navigate = useNavigate()

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [termsDialogOpen, setTermsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [termsError, setTermsError] = useState("")

  const [alertInfo, setAlertInfo] = useState<{
    severity: "success" | "error" | "warning" | "info"
    message: string
  } | null>(null)
  const [verificationCode, setVerificationCode] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [inputCode, setInputCode] = useState<string>("")
  const [codeError, setCodeError] = useState("")

  // Password strength indicators
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  const passwordStrength = () => {
    let score = 0
    if (hasMinLength) score++
    if (hasUpperCase) score++
    if (hasLowerCase) score++
    if (hasNumber) score++
    if (hasSpecialChar) score++

    if (score === 0) return { text: "Very Weak", color: "#ff0000" }
    if (score <= 2) return { text: "Weak", color: "#ff4500" }
    if (score <= 3) return { text: "Moderate", color: "#ffa500" }
    if (score <= 4) return { text: "Strong", color: "#9acd32" }
    return { text: "Very Strong", color: "#008000" }
  }

  const strength = passwordStrength()

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = () => {
    let isValid = true

    // Validate name
    if (!name.trim()) {
      setNameError("Name is required")
      isValid = false
    } else if (name.length < 2) {
      setNameError("Name must be at least 2 characters")
      isValid = false
    } else {
      setNameError("")
    }

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
    } else if (!(hasUpperCase && hasLowerCase && hasNumber)) {
      setPasswordError("Password must include uppercase, lowercase, and numbers")
      isValid = false
    } else {
      setPasswordError("")
    }

    // Validate terms acceptance
    if (!acceptTerms) {
      setTermsError("You must accept the terms and conditions")
      isValid = false
    } else {
      setTermsError("")
    }

    return isValid
  }

  const sendVerificationCode = (email: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setVerificationCode(code)
    const subject = `Verify your email for GKS ${code}`
    const body = `Hello, ${name}. Your verification code for GKS is ${code}.\n Please use it to complete your registration process.`

    userStore.sendEmail(email, subject, body)
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      setAlertInfo({ severity: "warning", message: "Please correct the errors in the form." })
      return
    }

    setIsLoading(true)

    try {
      sendVerificationCode(email)
    } catch (error) {
      setAlertInfo({ severity: "error", message: "Failed to send verification code. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!inputCode) {
      setCodeError("Please enter the verification code")
      return
    }

    setIsLoading(true)

    if (inputCode === verificationCode) {
      const newUser: Partial<UserType> = {
        name,
        email,
        password,
        filesId: [],
        isActive: true,
      }
      setIsDialogOpen(false)

      try {
        await userStore.registerUser(newUser, [Roles.User])
        setAlertInfo({ severity: "success", message: "Successfully registered! Redirecting to homepage..." })

        // Redirect after a short delay to show the success message
        setTimeout(() => {
          navigate("/")
        }, 1500)
      } catch (error: any) {
        setAlertInfo({
          severity: "error",
          message: error.message || "An unexpected error occurred. Please try again later.",
        })
      } finally {
        setIsLoading(false)
      }
    } else {
      setCodeError("Verification code is incorrect")
      setIsLoading(false)
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 500,
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
        Create Account
      </Typography>

      <Typography variant="body2" align="center" sx={{ mb: 3, color: "text.secondary" }}>
        Join our secure file management platform
      </Typography>

      {alertInfo && (
        <Alert severity={alertInfo.severity} onClose={() => setAlertInfo(null)} sx={{ mb: 3, borderRadius: 1 }}>
          {alertInfo.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid  >
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!nameError}
              helperText={nameError}
              inputRef={nameRef}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Tooltip title="Enter your full name">
                      <Info fontSize="small" color="action" />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid >
            <TextField
              label="Email Address"
              variant="outlined"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              inputRef={emailRef}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Tooltip title="Enter a valid email address">
                      <Info fontSize="small" color="action" />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid >
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              inputRef={passwordRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {password && (
              <Box sx={{ mt: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Password Strength: <span style={{ color: strength.color, fontWeight: "bold" }}>{strength.text}</span>
                </Typography>

                <Grid container spacing={1}>
                  <Grid >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                      {hasMinLength ? (
                        <CheckCircle fontSize="small" color="success" />
                      ) : (
                        <Cancel fontSize="small" color="error" />
                      )}
                      <Typography variant="caption" sx={{ ml: 0.5 }}>
                        At least 8 characters
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                      {hasUpperCase ? (
                        <CheckCircle fontSize="small" color="success" />
                      ) : (
                        <Cancel fontSize="small" color="error" />
                      )}
                      <Typography variant="caption" sx={{ ml: 0.5 }}>
                        Uppercase letter
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                      {hasLowerCase ? (
                        <CheckCircle fontSize="small" color="success" />
                      ) : (
                        <Cancel fontSize="small" color="error" />
                      )}
                      <Typography variant="caption" sx={{ ml: 0.5 }}>
                        Lowercase letter
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                      {hasNumber ? (
                        <CheckCircle fontSize="small" color="success" />
                      ) : (
                        <Cancel fontSize="small" color="error" />
                      )}
                      <Typography variant="caption" sx={{ ml: 0.5 }}>
                        Number
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>

          <Grid >
            <FormControlLabel
              control={
                <Checkbox checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} color="primary" />
              }
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <MuiLink
                    component="button"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault()
                      setTermsDialogOpen(true)
                    }}
                    sx={{ textDecoration: "none", color: "#579FBA", fontWeight: "medium" }}
                  >
                    Terms and Conditions
                  </MuiLink>
                </Typography>
              }
            />
            {termsError && <FormHelperText error>{termsError}</FormHelperText>}
          </Grid>

          <Grid >
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
              {isLoading ? <CircularProgress size={24} /> : "Create Account"}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2">
          Already have an account?{" "}
          <MuiLink
            component={Link}
            to="/login"
            sx={{
              textDecoration: "none",
              color: "#579FBA",
              fontWeight: "medium",
            }}
          >
            Sign in
          </MuiLink>
        </Typography>
      </Box>

      {/* Verification Code Dialog */}
      <Dialog open={isDialogOpen} onClose={() => !isLoading && setIsDialogOpen(false)}>
        <DialogTitle sx={{ bgcolor: "#f7f7f7", borderBottom: "1px solid #eaeaea" }}>
          <Typography variant="h6" component="div" sx={{ display: "flex", alignItems: "center" }}>
            <CheckCircle sx={{ color: "#579FBA", mr: 1 }} />
            Verify Your Email
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 1, px: 3, minWidth: "350px" }}>
          <DialogContentText sx={{ mb: 3 }}>
            We've sent a verification code to <strong>{email}</strong>. Please enter the 6-digit code below to verify
            your email address.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Verification Code"
            fullWidth
            value={inputCode}
            onChange={(e) => {
              setInputCode(e.target.value)
              setCodeError("")
            }}
            error={!!codeError}
            helperText={codeError}
            variant="outlined"
            sx={{ mb: 2 }}
            inputProps={{ maxLength: 6 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => !isLoading && setIsDialogOpen(false)}
            disabled={isLoading}
            sx={{ color: "text.secondary" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleVerifyCode}
            variant="contained"
            disabled={isLoading}
            sx={{
              backgroundColor: "#579FBA",
              "&:hover": {
                backgroundColor: "#3d7a94",
              },
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Verify"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Terms and Conditions Dialog */}
      <Dialog open={termsDialogOpen} onClose={() => setTermsDialogOpen(false)} scroll="paper" maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#f7f7f7", borderBottom: "1px solid #eaeaea" }}>Terms and Conditions</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>
            1. Introduction
          </Typography>
          <Typography paragraph>
            Welcome to GKS Secure File Management System. By using our service, you agree to these terms and conditions.
            Our platform provides secure file storage, management, and sharing capabilities.
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. Privacy and Security
          </Typography>
          <Typography paragraph>
            We take your privacy seriously. All files are encrypted and can only be accessed by authorized users. We
            implement industry-standard security measures to protect your data.
          </Typography>
          <Typography paragraph>
            Your files are encrypted both in transit and at rest. We use advanced encryption algorithms to ensure that
            your data remains secure at all times.
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. User Responsibilities
          </Typography>
          <Typography paragraph>
            Users are responsible for maintaining the confidentiality of their account credentials. You must not share
            your password with anyone else.
          </Typography>
          <Typography paragraph>
            Users must not upload illegal content or use the service for unlawful purposes. You are responsible for the
            content you upload and share.
          </Typography>
          <Typography paragraph>
            You agree to use strong passwords and to keep your account information secure. You are responsible for all
            activities that occur under your account.
          </Typography>

          <Typography variant="h6" gutterBottom>
            4. Service Limitations
          </Typography>
          <Typography paragraph>
            We provide this service on an "as is" basis and make no guarantees about uptime or availability. We reserve
            the right to modify or discontinue the service at any time.
          </Typography>
          <Typography paragraph>
            While we strive to maintain 99.9% uptime, we cannot guarantee that the service will be uninterrupted or
            error-free.
          </Typography>

          <Typography variant="h6" gutterBottom>
            5. Intellectual Property
          </Typography>
          <Typography paragraph>
            Users retain ownership of their content. By uploading content, users grant us a license to store and process
            their files.
          </Typography>
          <Typography paragraph>
            The GKS platform, including its logo, design, and software, is protected by intellectual property laws. You
            may not copy, modify, or distribute any part of the platform without our permission.
          </Typography>

          <Typography variant="h6" gutterBottom>
            6. Termination
          </Typography>
          <Typography paragraph>
            We reserve the right to terminate or suspend your account at any time for violations of these terms. Upon
            termination, your access to the service will be revoked.
          </Typography>
          <Typography paragraph>
            You may terminate your account at any time by contacting our support team. Upon termination, your data will
            be deleted from our servers within 30 days.
          </Typography>

          <Typography variant="h6" gutterBottom>
            7. Limitation of Liability
          </Typography>
          <Typography paragraph>
            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, or any loss of profits or revenues.
          </Typography>
          <Typography paragraph>
            Our total liability for any claims under these terms shall not exceed the amount you paid us in the past 12
            months.
          </Typography>

          <Typography variant="h6" gutterBottom>
            8. Changes to Terms
          </Typography>
          <Typography paragraph>
            We may update these terms from time to time. We will notify you of any significant changes. Your continued
            use of the service after such changes constitutes your acceptance of the new terms.
          </Typography>

          <Typography variant="h6" gutterBottom>
            9. Governing Law
          </Typography>
          <Typography paragraph>
            These terms are governed by the laws of Israel. Any disputes arising from these terms will be resolved in
            the courts of Israel.
          </Typography>

          <Typography variant="h6" gutterBottom>
            10. Contact Information
          </Typography>
          <Typography paragraph>
            If you have any questions about these terms, please contact us at support@gks-secure.com.
          </Typography>

          <Typography variant="body2" sx={{ mt: 4, fontStyle: "italic" }}>
            Last updated: May 22, 2024
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTermsDialogOpen(false)} sx={{ color: "#579FBA" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
})

export default Register

