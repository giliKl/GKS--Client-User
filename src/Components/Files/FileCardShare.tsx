import { useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  Chip,
  Alert,
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Slide,
  Zoom,
  Snackbar,
  SnackbarContent,
  Tooltip,
} from "@mui/material"
import {
  MoreVert,
  PictureAsPdf,
  Description,
  InsertDriveFile,
  Visibility,
  Lock,
  CheckCircle,
  Close,
  Share,
  Info,
  Error,
} from "@mui/icons-material"
import type { TransitionProps } from "@mui/material/transitions"
import axios from "axios";
import React from "react"

// PDF Viewer imports - using your exact approach
import { Worker, Viewer } from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import { UserFileType } from "../../Types/UserFileType"
import fileStore from "./FileStore"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const fileIcons: Record<string, { icon: React.ReactElement; color: string }> = {
  "application/pdf": { icon: <PictureAsPdf />, color: "#579FBA" },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    icon: <Description />,
    color: "#3d7a94",
  },
  default: { icon: <InsertDriveFile />, color: "#579FBA" },
}

interface FileCardShareProps {
  file: UserFileType
  filetype: string
}

interface ToastState {
  open: boolean
  message: string
  title: string
  severity: "success" | "error"
}

// InfoTooltip component to match your original
const InfoTooltip = ({ info }: { info: string; icon: string }) => (
  <Tooltip title={info} arrow placement="top">
    <IconButton size="small" sx={{ color: "#579FBA" }}>
      <Info fontSize="small" />
    </IconButton>
  </Tooltip>
)

const FileCardShare: React.FC<FileCardShareProps> = observer(({ file, filetype }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openAuthDialog, setOpenAuthDialog] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    title: "",
    severity: "success",
  })

  const fileIcon = fileIcons[filetype] || fileIcons.default
  const isMenuOpen = Boolean(anchorEl)

  const showToast = (title: string, message: string, severity: "success" | "error" = "success") => {
    setToast({
      open: true,
      title,
      message,
      severity,
    })
  }

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }))
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleViewClick = () => {
    setOpenAuthDialog(true)
    setEmail("")
    setPassword("")
    handleMenuClose()
  }

  // Your exact file viewer close logic
  const handleCloseViewer = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl(null)
    }
    setOpenAuthDialog(false)
  }


  // Your exact file fetching logic
  const handleFetchFile = async () => {
    // Validation
    if (!email.trim()) {
      setEmailError("Email address is required")
      return
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }
    if (!password.trim()) {
      setPasswordError("Password is required")
      return
    }

    setIsLoading(true)
    setEmailError("")
    setPasswordError("")


    try {
      const fileBlob = await fileStore.getSharedfile(email, file.id, password);

      if (!fileBlob) throw new globalThis.Error("Failed to fetch file: Blob is undefined");

      if (filetype === "application/pdf") {
        const fileURL = URL.createObjectURL(fileBlob);
        if (fileUrl) URL.revokeObjectURL(fileUrl);
        setFileUrl(fileURL);
        setOpenAuthDialog(false);
        showToast("File loaded successfully!", "PDF is ready for viewing", "success");
      } else {
        showToast("Unsupported file type", "Viewing this file type is not supported.", "error");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          showToast("Access denied", "Invalid credentials", "error");
        } else if (error.response?.status === 404) {
          showToast("File not found", "The requested file could not be located", "error");
        } else {
          showToast("Server error", "Something went wrong", "error");
        }
      } else {
        showToast("Unexpected error", error.message || "Unknown error", "error");
      }

      console.error("Error fetching file:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Professional File Card */}
      <Zoom in timeout={600}>
        <Card
          elevation={3}
          sx={{
            width: 280,
            height: 360,
            borderRadius: 3,
            transition: "all 0.3s ease",
            border: "1px solid rgba(87, 159, 186, 0.1)",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 12px 24px rgba(87, 159, 186, 0.15)",
              borderColor: "#579FBA",
            },
          }}
        >
          <CardContent sx={{ p: 3, textAlign: "center", height: "calc(100% - 80px)" }}>
            {/* File Icon */}
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
                backgroundColor: `${fileIcon.color}15`,
                color: fileIcon.color,
              }}
            >
              {React.cloneElement(fileIcon.icon)}
            </Avatar>

            {/* File Name */}
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                mb: 1,
                color: "#333",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
              title={file.name}
            >
              {file.name}
            </Typography>

            {/* File Info */}
            <Box sx={{ mb: 2 }}>
              <Chip
                label="Shared File"
                size="small"
                sx={{
                  backgroundColor: "rgba(87, 159, 186, 0.1)",
                  color: "#579FBA",
                  fontWeight: "medium",
                  mb: 1,
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Shared: {new Date(file.createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            {/* Security Badge */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: "auto" }}>
              <Share sx={{ fontSize: 16, color: "#579FBA", mr: 0.5 }} />
              <Typography variant="caption" color="#579FBA" fontWeight="medium">
                Shared with You
              </Typography>
            </Box>
          </CardContent>

          {/* Action Buttons */}
          <CardActions sx={{ justifyContent: "flex-end", p: 2, pt: 0 }}>
            <IconButton
              onClick={handleMenuClick}
              sx={{
                color: "#579FBA",
                "&:hover": {
                  backgroundColor: "rgba(87, 159, 186, 0.1)",
                },
              }}
            >
              <MoreVert />
            </IconButton>
          </CardActions>
        </Card>
      </Zoom>

      {/* Enhanced Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 8,
          sx: {
            borderRadius: 2,
            minWidth: 200,
            border: "1px solid rgba(87, 159, 186, 0.1)",
            "& .MuiMenuItem-root": {
              px: 2,
              py: 1.5,
              borderRadius: 1,
              mx: 1,
              my: 0.5,
              "&:hover": {
                backgroundColor: "rgba(87, 159, 186, 0.08)",
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleViewClick}>
          <ListItemIcon>
            <Visibility sx={{ color: "#579FBA" }} />
          </ListItemIcon>
          <ListItemText primary="View File" />
        </MenuItem>
      </Menu>

      {/* Professional Authentication Dialog */}
      <Dialog
        open={openAuthDialog}
        onClose={() => !isLoading && setOpenAuthDialog(false)}
        TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "rgba(87, 159, 186, 0.05)",
            borderBottom: "1px solid rgba(87, 159, 186, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ backgroundColor: "#579FBA" }}>
            <Lock sx={{ color: "#fff" }} />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Enter Email & Password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Access credentials for "{file.name}"
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Alert
            severity="info"
            sx={{
              mb: 3,
              borderRadius: 2,
              backgroundColor: "rgba(87, 159, 186, 0.05)",
              borderColor: "rgba(87, 159, 186, 0.2)",
            }}
          >
            Please enter the email address that received the sharing notification and the file password from the email.
          </Alert>

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="dense"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailError("")
            }}
            error={!!emailError}
            helperText={emailError}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#579FBA",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#579FBA",
                },
              },
            }}
            InputProps={{
              endAdornment: <InfoTooltip info="Your personal email address to which the file was shared." icon="?" />,
            }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setPasswordError("")
            }}
            error={!!passwordError}
            helperText={passwordError}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#579FBA",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#579FBA",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InfoTooltip
                  info="This is the password sent to you via email in the notification message about the shared file."
                  icon="!"
                />
              ),
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => {setOpenAuthDialog(false);}}
            disabled={isLoading}
            sx={{ color: "text.secondary" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleFetchFile}
            variant="contained"
            disabled={isLoading}
            sx={{
              backgroundColor: "#579FBA",
              "&:hover": { backgroundColor: "#3d7a94" },
              minWidth: 120,
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* PDF Viewer Dialog - Using Your Exact Logic */}
      {fileUrl && (
        <Dialog
          open={Boolean(fileUrl)}
          onClose={handleCloseViewer}
          fullWidth
          maxWidth="lg"
          TransitionComponent={Transition}
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
              height: "90vh",
              maxHeight: "90vh",
            },
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: "rgba(87, 159, 186, 0.05)",
              borderBottom: "1px solid rgba(87, 159, 186, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ backgroundColor: "#579FBA" }}>
                <PictureAsPdf sx={{ fontSize: 24, color: "#fff" }} />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  PDF Viewer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {file.name}
                </Typography>
              </Box>
            </Box>

            <IconButton
              onClick={handleCloseViewer}
              sx={{
                color: "#579FBA",
                "&:hover": {
                  backgroundColor: "rgba(87, 159, 186, 0.1)",
                },
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ p: 0, height: "calc(100% - 80px)" }}>
            <Box sx={{ height: "100%", backgroundColor: "#f5f5f5" }}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={fileUrl} defaultScale={1} plugins={[]} />
              </Worker>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      {/* Professional Toast Notifications */}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={Slide}
      >
        <SnackbarContent
          sx={{
            background:
              toast.severity === "success"
                ? "linear-gradient(135deg, #579FBA 0%, #3d7a94 100%)"
                : "linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)",
            color: "white",
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(87, 159, 186, 0.25)",
            minWidth: 400,
            maxWidth: 500,
          }}
          message={
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              {toast.severity === "success" ? (
                <CheckCircle sx={{ mt: 0.5, fontSize: 20 }} />
              ) : (
                <Error />
              )}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
                  {toast.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {toast.message}
                </Typography>
              </Box>
            </Box>
          }
          action={
            <IconButton size="small" color="inherit" onClick={handleCloseToast}>
              <Close fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </>
  )
})


export default FileCardShare
