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
  Divider,
  ListItemIcon,
  ListItemText,
  Paper,
  Slide,
  Zoom,
  Snackbar,
  SnackbarContent,
} from "@mui/material"
import {
  MoreVert,
  PictureAsPdf,
  Description,
  InsertDriveFile,
  Share,
  Edit,
  Delete,
  Email,
  Warning,
  FileCopy,
  Lock,
  CheckCircle,
  Error,
  Close,
} from "@mui/icons-material"
import type { TransitionProps } from "@mui/material/transitions"
import React from "react"
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
  
  interface FileCardProps {
    file: UserFileType
    filetype: string
  }
  
  interface ToastState {
    open: boolean
    message: string
    title: string
    severity: "success" | "error"
  }
  
  const FileCard = observer(({ file, filetype }: FileCardProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openShare, setOpenShare] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [email, setEmail] = useState("")
    const [newFileName, setNewFileName] = useState(file.name)
    const [isLoading, setIsLoading] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [fileNameError, setFileNameError] = useState("")
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
  
    const handleShare = async () => {
      if (!email.trim()) {
        setEmailError("Email is required")
        return
      }
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address")
        return
      }
  
      setIsLoading(true)
      setEmailError("")
  
      try {
        await fileStore.shareFile(file, email)
        showToast("File shared successfully!", `File "${file.name}" has been shared with ${email}`, "success")
        setOpenShare(false)
        setEmail("")
      } catch (error: any) {
        showToast("Error sharing file", error.message || "Failed to share file. Please try again.", "error")
      } finally {
        setIsLoading(false)
      }
    }
  
    const handleEdit = async () => {
      if (!newFileName.trim()) {
        setFileNameError("File name is required")
        return
      }
      if (newFileName.length < 3) {
        setFileNameError("File name must be at least 3 characters")
        return
      }
  
      setIsLoading(true)
      setFileNameError("")
  
      try {
        await fileStore.editFile(file.id, newFileName)
        showToast("File renamed successfully!", `File has been renamed to "${newFileName}"`, "success")
        setOpenEdit(false)
      } catch (error: any) {
        showToast("Error renaming file", error.message || "Failed to rename file. Please try again.", "error")
      } finally {
        setIsLoading(false)
      }
    }
  
    const handleDelete = async () => {
      setIsLoading(true)
  
      try {
        await fileStore.deleteFile(file.id)
        showToast("File deleted successfully!", `File "${file.name}" has been permanently deleted`, "success")
        setOpenDelete(false)
      } catch (error: any) {
        showToast("Error deleting file", error.message || "Failed to delete file. Please try again.", "error")
      } finally {
        setIsLoading(false)
      }
    }
  
    return (
      <>
        <Zoom in timeout={600}>
          <Card
            elevation={3}
            sx={{
              width: 280,
              height: 320,
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
            <CardContent sx={{ p: 3, textAlign: "center", height: "calc(100% - 64px)" }}>
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
                  label="PDF Document"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(87, 159, 186, 0.1)",
                    color: "#579FBA",
                    fontWeight: "medium",
                    mb: 1,
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Created: {new Date(file.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
  
              {/* Security Badge */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: "auto" }}>
                <Lock sx={{ fontSize: 16, color: "#579FBA", mr: 0.5 }} />
                <Typography variant="caption" color="#579FBA" fontWeight="medium">
                  Password Protected
                </Typography>
              </Box>
            </CardContent>
  
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
          <MenuItem
            onClick={() => {
              setOpenShare(true)
              handleMenuClose()
            }}
          >
            <ListItemIcon>
              <Share sx={{ color: "#579FBA" }} />
            </ListItemIcon>
            <ListItemText primary="Share File" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenEdit(true)
              handleMenuClose()
            }}
          >
            <ListItemIcon>
              <Edit sx={{ color: "#579FBA" }} />
            </ListItemIcon>
            <ListItemText primary="Rename File" />
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <MenuItem
            onClick={() => {
              setOpenDelete(true)
              handleMenuClose()
            }}
            sx={{ color: "#d32f2f" }}
          >
            <ListItemIcon>
              <Delete sx={{ color: "#d32f2f" }} />
            </ListItemIcon>
            <ListItemText primary="Delete File" />
          </MenuItem>
        </Menu>
  
        {/* Share Dialog */}
        <Dialog
          open={openShare}
          onClose={() => !isLoading && setOpenShare(false)}
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
              <Share sx={{color: "#fff"}}/>
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Share File
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Share "{file.name}" with others
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
              The recipient will receive an email with the file password and access instructions.
            </Alert>
  
            <TextField
              label="Recipient Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailError("")
              }}
              error={!!emailError}
              helperText={emailError || "Enter the email address of the person you want to share this file with"}
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
                startAdornment: (
                  <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                    <Email color="action" />
                  </Box>
                ),
              }}
            />
  
            <Paper
              elevation={0}
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: "rgba(87, 159, 186, 0.02)",
                border: "1px solid rgba(87, 159, 186, 0.1)",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <FileCopy sx={{ color: "#579FBA", mr: 1, fontSize: 20 }} />
                <Typography variant="subtitle2" fontWeight="bold" color="#579FBA">
                  File Details
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                <strong>Name:</strong> {file.name}
                <br />
                <strong>Type:</strong> PDF Document
                <br />
                <strong>Created:</strong> {new Date(file.createdAt).toLocaleDateString()}
              </Typography>
            </Paper>
          </DialogContent>
  
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={() => setOpenShare(false)} disabled={isLoading} sx={{ color: "text.secondary" }}>
              Cancel
            </Button>
            <Button
              onClick={handleShare}
              variant="contained"
              disabled={isLoading}
              sx={{
                backgroundColor: "#579FBA",
                "&:hover": { backgroundColor: "#3d7a94" },
                minWidth: 120,
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Share File"}
            </Button>
          </DialogActions>
        </Dialog>
  
        {/* Edit Dialog */}
        <Dialog
          open={openEdit}
          onClose={() => !isLoading && setOpenEdit(false)}
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
              <Edit sx={{color: "#fff"}}/>
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Rename File
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Change the display name of your file
              </Typography>
            </Box>
          </DialogTitle>
  
          <DialogContent sx={{ p: 3 }}>
            <TextField
              label="New File Name"
              fullWidth
              value={newFileName}
              onChange={(e) => {
                setNewFileName(e.target.value)
                setFileNameError("")
              }}
              error={!!fileNameError}
              helperText={fileNameError || "Enter a new name for your file (without file extension)"}
              sx={{
                mt: 1,
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
                startAdornment: (
                  <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                    <FileCopy color="action" />
                  </Box>
                ),
              }}
            />
          </DialogContent>
  
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={() => setOpenEdit(false)} disabled={isLoading} sx={{ color: "text.secondary" }}>
              Cancel
            </Button>
            <Button
              onClick={handleEdit}
              variant="contained"
              disabled={isLoading}
              sx={{
                backgroundColor: "#579FBA",
                "&:hover": { backgroundColor: "#3d7a94" },
                minWidth: 120,
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
            </Button>
          </DialogActions>
        </Dialog>
  
        {/* Delete Dialog */}
        <Dialog
          open={openDelete}
          onClose={() => !isLoading && setOpenDelete(false)}
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
            <Avatar sx={{ backgroundColor: "#d32f2f" }}>
              <Warning />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="#d32f2f">
                Delete File
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This action cannot be undone
              </Typography>
            </Box>
          </DialogTitle>
  
          <DialogContent sx={{ p: 3 }}>
            <Alert
              severity="warning"
              sx={{
                mb: 3,
                borderRadius: 2,
                backgroundColor: "rgba(211, 47, 47, 0.05)",
                borderColor: "rgba(211, 47, 47, 0.2)",
              }}
            >
              <Typography variant="body2">
                <strong>Warning:</strong> This will permanently delete the file and cannot be recovered.
              </Typography>
            </Alert>
  
            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: "rgba(0, 0, 0, 0.02)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: 2,
              }}
            >
              <Typography variant="body1" fontWeight="medium" gutterBottom>
                Are you sure you want to delete:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>File:</strong> {file.name}
                <br />
                <strong>Created:</strong> {new Date(file.createdAt).toLocaleDateString()}
              </Typography>
            </Paper>
          </DialogContent>
  
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={() => setOpenDelete(false)} disabled={isLoading} sx={{ color: "text.secondary" }}>
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error" disabled={isLoading} sx={{ minWidth: 120 }}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Delete File"}
            </Button>
          </DialogActions>
        </Dialog>
  
        {/* Professional Material-UI Toast/Snackbar */}
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
                  <Error sx={{ mt: 0.5, fontSize: 20 }} />
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
  
  export default FileCard
  