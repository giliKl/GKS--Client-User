import type React from "react"
import { useState, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Tooltip,
  Chip,
  Divider,
} from "@mui/material"
import {
  CloudUpload,
  PictureAsPdf,
  Visibility,
  VisibilityOff,
  Info,
  CheckCircle,
  Cancel,
  Delete,
  AttachFile,
} from "@mui/icons-material"
import userStore from "../Users/UserStore"
import { useNavigate } from "react-router"

const UploadFile = observer(() => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate(); 

  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [fileNameError, setFileNameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [alertInfo, setAlertInfo] = useState<{
    severity: "success" | "error" | "warning" | "info"
    message: string
  } | null>(null)

  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)

  const passwordStrength = () => {
    let score = 0
    if (hasMinLength) score++
    if (hasUpperCase) score++
    if (hasLowerCase) score++
    if (hasNumber) score++

    if (score === 0) return { text: "Very Weak", color: "#ff0000" }
    if (score <= 2) return { text: "Weak", color: "#ff4500" }
    if (score === 3) return { text: "Moderate", color: "#ffa500" }
    return { text: "Strong", color: "#008000" }
  }

  const strength = passwordStrength()

  useEffect(() => {
    const checkAuth = async () => {
      const userId = sessionStorage.getItem("userId")
      if (!userId) {
        navigate("/login")
      } else {
        try {
          await userStore.fetchUser(Number.parseInt(userId))
        } catch (error) {
          navigate("/login")
        }
      }
    }

    checkAuth()
  }, [navigate])

  const validateForm = () => {
    let isValid = true

    // Validate file name
    if (!fileName.trim()) {
      setFileNameError("File name is required")
      isValid = false
    } else if (fileName.length < 3) {
      setFileNameError("File name must be at least 3 characters")
      isValid = false
    } else {
      setFileNameError("")
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

    return isValid
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0]

      if (selectedFile.type !== "application/pdf") {
        setAlertInfo({
          severity: "error",
          message: "Only PDF files are allowed. Please select a PDF file.",
        })
        setFile(null)
        setFileName("")
      } else {
        setAlertInfo(null)
        setFile(selectedFile)
        setFileName(selectedFile.name.replace(".pdf", ""))
      }
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(false)

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0]

      if (droppedFile.type !== "application/pdf") {
        setAlertInfo({
          severity: "error",
          message: "Only PDF files are allowed. Please select a PDF file.",
        })
        setFile(null)
        setFileName("")
      } else {
        setAlertInfo(null)
        setFile(droppedFile)
        setFileName(droppedFile.name.replace(".pdf", ""))
      }
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setFileName("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setAlertInfo({
        severity: "error",
        message: "Please select a PDF file to upload",
      })
      return
    }

    if (!validateForm()) {
      setAlertInfo({
        severity: "warning",
        message: "Please correct the errors in the form",
      })
      return
    }

    setIsLoading(true)
    setAlertInfo(null)

    try {

      setAlertInfo({
        severity: "success",
        message: "File uploaded successfully! Redirecting to your files...",
      })

      // Reset form
      setFile(null)
      setFileName("")
      setPassword("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // Redirect after showing success message
      setTimeout(() => {
        navigate("/filelist")
      }, 1500)
    } catch (error: any) {
      setAlertInfo({
        severity: "error",
        message: error.message || "Failed to upload file. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 600,
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
        Upload Secure File
      </Typography>

      <Typography variant="body2" align="center" sx={{ mb: 3, color: "text.secondary" }}>
        Upload your PDF files with password protection for secure storage and sharing
      </Typography>

      {alertInfo && (
        <Alert severity={alertInfo.severity} onClose={() => setAlertInfo(null)} sx={{ mb: 3, borderRadius: 1 }}>
          {alertInfo.message}
        </Alert>
      )}

      {/* File Upload Area */}
      <Box
        sx={{
          border: `2px dashed ${dragOver ? "#579FBA" : "#ccc"}`,
          borderRadius: 2,
          p: 4,
          mb: 3,
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: dragOver ? "rgba(87, 159, 186, 0.05)" : file ? "rgba(87, 159, 186, 0.02)" : "transparent",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "#579FBA",
            backgroundColor: "rgba(87, 159, 186, 0.02)",
          },
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {!file ? (
          <Box>
            <CloudUpload sx={{ fontSize: 60, color: "#579FBA", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Drag and drop your PDF file here
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              or click to browse your computer
            </Typography>
            <Chip
              label="PDF files only"
              size="small"
              sx={{
                backgroundColor: "rgba(87, 159, 186, 0.1)",
                color: "#579FBA",
              }}
            />
          </Box>
        ) : (
          <Box>
            <PictureAsPdf sx={{ fontSize: 60, color: "#d32f2f", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {file.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={(e) => {
                e.stopPropagation()
                handleRemoveFile()
              }}
            >
              Remove File
            </Button>
          </Box>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
        />
      </Box>

      <Divider sx={{ mb: 3 }} />

      <form onSubmit={handleSubmit}>
        {/* File Name Input */}
        <TextField
          label="File Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          error={!!fileNameError}
          helperText={
            fileNameError ||
            "Enter a descriptive name for your file (without .pdf extension). This name will be used to identify your file in the system."
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="Enter a name to identify your file">
                  <AttachFile color="action" />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />

        {/* Password Input */}
        <TextField
          label="File Protection Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={
            passwordError ||
            "Create a strong password to encrypt and protect your file. This password will be required to access the file."
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="This password will encrypt your file">
                  <Info color="action" />
                </Tooltip>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Password Strength Indicator */}
        {password && (
          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Password Strength: <span style={{ color: strength.color, fontWeight: "bold" }}>{strength.text}</span>
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {hasMinLength ? (
                  <CheckCircle fontSize="small" color="success" />
                ) : (
                  <Cancel fontSize="small" color="error" />
                )}
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  8+ characters
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {hasUpperCase ? (
                  <CheckCircle fontSize="small" color="success" />
                ) : (
                  <Cancel fontSize="small" color="error" />
                )}
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  Uppercase
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {hasLowerCase ? (
                  <CheckCircle fontSize="small" color="success" />
                ) : (
                  <Cancel fontSize="small" color="error" />
                )}
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  Lowercase
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {hasNumber ? (
                  <CheckCircle fontSize="small" color="success" />
                ) : (
                  <Cancel fontSize="small" color="error" />
                )}
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  Number
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isLoading || !file}
          sx={{
            py: 1.5,
            mt: 3,
            backgroundColor: "#579FBA",
            "&:hover": {
              backgroundColor: "#3d7a94",
            },
            "&:disabled": {
              backgroundColor: "#ccc",
            },
          }}
        >
          {isLoading ? (
            <>
              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              Uploading File...
            </>
          ) : (
            "Upload Secure File"
          )}
        </Button>
      </form>

      {/* Information Box */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          backgroundColor: "rgba(87, 159, 186, 0.05)",
          borderRadius: 1,
          border: "1px solid rgba(87, 159, 186, 0.2)",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: "medium", mb: 1, color: "#579FBA" }}>
          Security Information:
        </Typography>
        <Typography variant="caption" color="text.secondary">
          • Your file will be encrypted with your password before storage
          <br />• Only users with the correct password can access the file
          <br />• File names and passwords are case-sensitive
          <br />• PDF files up to 50MB are supported
        </Typography>
      </Box>
    </Paper>
  )
})

export default UploadFile

