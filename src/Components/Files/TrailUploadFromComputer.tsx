import { useState, useEffect, JSX } from "react";
import { IconButton, Menu, MenuItem, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Description, InsertDriveFile, MoreVert, PictureAsPdf } from "@mui/icons-material";
import WebViewer from "@pdftron/webviewer";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const fileIcons: Record<string, JSX.Element> = {
  "application/pdf": <PictureAsPdf fontSize="large" color="error" />,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": <Description fontSize="large" color="primary" />,
  default: <InsertDriveFile fontSize="large" color="disabled" />,
};

const TrailUploadFromComputer = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [viewerInstance, setViewerInstance] = useState<any>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleCloseViewer = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl(null);
    }
    setOpenDialog(false);
  };

  const handleViewClick = () => {
    setAnchorEl(null);
    setOpenDialog(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileURL = URL.createObjectURL(selectedFile);
      setFileUrl(fileURL);
      setFileType(selectedFile.type);
    }
  };

  useEffect(() => {
    if (fileUrl && openDialog) {
        console.log("fileUrl:", fileUrl);
      const initViewer = async () => {
        const viewerElement = document.getElementById("viewer");
        if (viewerElement && !viewerInstance) {
          const instance = await WebViewer(
            {
              path: "/webviewer",
              initialDoc: fileUrl, // נטען את המסמך שנבחר
            },
            viewerElement
          );

          setViewerInstance(instance);
        }
      };

      initViewer();
    }
  }, [fileUrl, openDialog, viewerInstance]);

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, width: 200, textAlign: "center", position: "relative" }}>
        <Typography variant="subtitle1" fontWeight="bold" mt={1}>
          {file ? file.name : "No file selected"}
        </Typography>
        <IconButton sx={{ position: "absolute", top: 5, right: 5 }} onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={handleViewClick}>👀 View</MenuItem>
        </Menu>
      </Paper>

      <Button variant="contained" component="label">
        Upload File
        <input hidden type="file" accept=".pdf,.docx" onChange={handleFileChange} />
      </Button>

      <Dialog open={openDialog} onClose={handleCloseViewer} fullWidth maxWidth="md">
        <DialogTitle>File Viewer</DialogTitle>
        <DialogContent>
          {fileUrl && fileType === "application/pdf" ? (
            <iframe
              src={fileUrl}
              style={{ width: '100%', height: '500px' }}
              title="PDF Viewer"
              frameBorder="0"
            />
          ) : fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
            <DocViewer documents={[{ uri: fileUrl ?? "", fileType: "docx" }]} pluginRenderers={DocViewerRenderers} />
          ) : (
            <Typography variant="body2">Unsupported file type</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewer}>Close</Button>
          <Button
            onClick={() => {
              if (file) {
                const downloadUrl = URL.createObjectURL(new Blob([file]));
                const link = document.createElement("a");
                link.href = downloadUrl;
                link.download = file.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            }}
            variant="contained"
          >
            Download
          </Button>
          <Button onClick={() => window.print()} variant="outlined">
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TrailUploadFromComputer;
