import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  Skeleton,
  Alert,
  Button,
  Avatar,
  Fade,
  Zoom,
} from "@mui/material"
import { ExpandLess, Search, PictureAsPdf, CalendarToday, FilePresent, Refresh, Share } from "@mui/icons-material"
import { UserFileType } from "../../Types/UserFileType"
import userStore from "../Users/UserStore"
import fileStore from "./FileStore"
import NoFileShare from "../Massages/NoFileShare"
import FileCardShare from "./FileCardShare"
import { useNavigate } from "react-router"


const ViewFile = observer(() => {
  const navigate = useNavigate(); 
  const [openDates, setOpenDates] = useState<{ [key: string]: boolean }>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [filteredFiles, setFilteredFiles] = useState<UserFileType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem("userId")
        if (!userId) {
          navigate("/login")
          return
        }

        if (!userStore.user.id) {
          await userStore.fetchUser(Number.parseInt(userId))
        }

        await fileStore.fetchFileShare()
        setFilteredFiles(fileStore.fileShare || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  useEffect(() => {
    if (fileStore.fileShare) {
      const filtered = fileStore.fileShare.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredFiles(filtered)
    }
  }, [searchTerm, fileStore.fileShare])

  const handleToggleDate = (date: string) => {
    setOpenDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }))
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      await fileStore.fetchFileShare()
      setFilteredFiles(fileStore.fileShare || [])
    } catch (error) {
      console.error("Error refreshing files:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ p: 4 }}>
        {/* Header Skeleton */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Skeleton variant="text" width="40%" height={40} />
          <Skeleton variant="text" width="60%" height={24} sx={{ mt: 1 }} />
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Skeleton variant="rectangular" width={300} height={56} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" width={120} height={56} sx={{ borderRadius: 1 }} />
          </Box>
        </Paper>

        {/* Files Skeleton */}
        <Box sx={{ space: 3 }}>
          {[1, 2].map((item) => (
            <Card key={item} elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Skeleton variant="text" width="30%" height={32} />
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  {[1, 2, 3, 4].map((card) => (
                    <Grid  key={card}>
                      <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    )
  }

  if (fileStore.error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={handleRefresh}>
              Try Again
            </Button>
          }
          sx={{ borderRadius: 2 }}
        >
          Error loading shared files: {fileStore.error}
        </Alert>
      </Box>
    )
  }

  if (!fileStore.fileShare || fileStore.fileShare.length === 0) {
    return <NoFileShare />
  }

  // Group files by date
  const groupedFiles = filteredFiles.reduce(
    (acc, file) => {
      const dateKey = new Date(file.createdAt).toLocaleDateString()
      acc[dateKey] = acc[dateKey] || []
      acc[dateKey].push(file)
      return acc
    },
    {} as Record<string, UserFileType[]>,
  )

  const totalFiles = fileStore.fileShare.length
  const filteredCount = filteredFiles.length

  return (
    <Box sx={{ p: 4, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header Section */}
      <Fade in timeout={800}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #579FBA 0%, #3d7a94 100%)",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          />
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  mr: 2,
                  width: 56,
                  height: 56,
                }}
              >
                <Share sx={{ fontSize: 32 ,color:"white"}} />
              </Avatar>
              <Box>
                <Typography variant="h4" component="h1" fontWeight="bold">
                  Shared Files
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Files Shared with You
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FilePresent sx={{ mr: 1, color:"white"}} />
                <Typography variant="body1">
                  <strong>{totalFiles}</strong> Shared Files
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PictureAsPdf sx={{ mr: 1 ,color:"white"}} />
                <Typography variant="body1">Secure Documents</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Fade>

      {/* Search and Filter Section */}
      <Zoom in timeout={600}>
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
            <TextField
              placeholder="Search shared files..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                flexGrow: 1,
                minWidth: 300,
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
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<Refresh sx={{color: "#fff"}}/>}
              onClick={handleRefresh}
              sx={{
                borderColor: "#579FBA",
                color: "#fff",
                "&:hover": {
                  borderColor: "#3d7a94",
                  backgroundColor: "rgba(87, 159, 186, 0.04)",
                },
              }}
            >
              Refresh
            </Button>
          </Box>

          {searchTerm && (
            <Box sx={{ mt: 2 }}>
              <Chip
                label={`${filteredCount} of ${totalFiles} files`}
                color="primary"
                variant="outlined"
                sx={{
                  borderColor: "#579FBA",
                  color: "#579FBA",
                }}
              />
            </Box>
          )}
        </Paper>
      </Zoom>

      {/* Files Section */}
      <Box sx={{ space: 3 }}>
        {Object.entries(groupedFiles).length === 0 ? (
          <Paper elevation={2} sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
            <Typography variant="h6" color="text.secondary">
              No shared files found matching your search.
            </Typography>
          </Paper>
        ) : (
          Object.entries(groupedFiles).map(([date, files], index) => {
            const isOpen = openDates[date] !== false // Default to open

            return (
              <Fade in timeout={800 + index * 200} key={date}>
                <Card
                  elevation={3}
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid rgba(87, 159, 186, 0.1)",
                    "&:hover": {
                      boxShadow: "0 8px 25px rgba(87, 159, 186, 0.15)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <CardContent
                    sx={{
                      p: 0,
                      "&:last-child": { pb: 0 },
                    }}
                  >
                    {/* Date Header */}
                    <Box
                      onClick={() => handleToggleDate(date)}
                      sx={{
                        p: 3,
                        cursor: "pointer",
                        backgroundColor: "rgba(87, 159, 186, 0.05)",
                        borderBottom: "1px solid rgba(87, 159, 186, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        "&:hover": {
                          backgroundColor: "rgba(87, 159, 186, 0.08)",
                        },
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            backgroundColor: "#579FBA",
                            mr: 2,
                            width: 40,
                            height: 40,
                          }}
                        >
                          <CalendarToday sx={{color: "#fff"}}/>
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" color="#579FBA">
                            Shared on {date}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {files.length} file{files.length !== 1 ? "s" : ""} shared with you
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        sx={{
                          color: "#579FBA",
                          transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        <ExpandLess />
                      </IconButton>
                    </Box>

                    {/* Files Grid */}
                    <Collapse in={isOpen} timeout={400}>
                      <Box sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                          {files.map((file, fileIndex) => (
                            <Grid  key={file.id}>
                              <Zoom in timeout={600 + fileIndex * 100}>
                                <div>
                                  <FileCardShare file={file} filetype={file.fileType} />
                                </div>
                              </Zoom>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Collapse>
                  </CardContent>
                </Card>
              </Fade>
            )
          })
        )}
      </Box>

      {/* Footer Stats */}
      {filteredFiles.length > 0 && (
        <Fade in timeout={1200}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              mt: 4,
              borderRadius: 2,
              backgroundColor: "rgba(87, 159, 186, 0.02)",
              border: "1px solid rgba(87, 159, 186, 0.1)",
            }}
          >
            <Typography variant="body2" color="text.secondary" align="center">
              Showing {filteredCount} of {totalFiles} shared files • Secure access with password protection
            </Typography>
          </Paper>
        </Fade>
      )}
    </Box>
  )
})

export default ViewFile

