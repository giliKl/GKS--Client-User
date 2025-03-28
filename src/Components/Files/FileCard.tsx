import { Description, InsertDriveFile, MoreVert, PictureAsPdf } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { JSX, useState } from "react";
import { UserFileType } from "../../Types/UserFileType";
import fileStore from "./FileStore";


const fileIcons: Record<string, JSX.Element> = {
    "application/pdf": <PictureAsPdf fontSize="large" color="error" />,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": <Description fontSize="large" color="primary" />,
    default: <InsertDriveFile fontSize="large" color="disabled" />,
};

const FileCard = ({ file, filetype }: { file: UserFileType; filetype: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openShare, setOpenShare] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [email, setEmail] = useState("");
    const [newFileName, setNewFileName] = useState(file.name);

    const handleDelete = async () => {
        // שליחת בקשה לשרת למחיקת הקובץ
        fileStore.deleteFile(file.id);
        setOpenDelete(false);
    };

    const handleShare = async () => {
        fileStore.shareFile(file, email);
        setOpenShare(false);
    };

    /*************  ✨ Codeium Command 🌟  *************/
    const handleEdit = async () => {
        try {
            await fileStore.editFile(file.id, newFileName);
            setOpenEdit(false);
        } catch (error) {
            console.error("Error editing file:", error);
        }
        // שליחת בקשה לעריכת שם הקובץ
        fileStore.editFile(file.id, newFileName);
        setOpenEdit(false);
    };
    /******  6e75e124-8199-49ff-8eb2-3482dbcf5323  *******/

    return (
        <>
            <Paper elevation={3} sx={{ p: 2, width: 200, textAlign: "center", position: "relative" }}>
                {fileIcons[filetype] || fileIcons.default}
                <Typography variant="subtitle1" fontWeight="bold" mt={1}>{file.name}</Typography>
                <IconButton
                    sx={{ position: "absolute", top: 5, right: 5 }}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                    <MoreVert />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                    <MenuItem onClick={() => { setOpenShare(true); setAnchorEl(null); }}>🔗 Share</MenuItem>
                    <MenuItem onClick={() => { setOpenEdit(true); setAnchorEl(null); }}>✏️ Edit</MenuItem>
                    <MenuItem onClick={() => { setOpenDelete(true); setAnchorEl(null); }}>🗑️ Delete</MenuItem>
                </Menu>
            </Paper>

            {/* דיאלוג לשיתוף קובץ */}
            <Dialog open={openShare} onClose={() => setOpenShare(false)}>
                <DialogTitle> Share File</DialogTitle>
                <DialogContent>
                    <TextField label="email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenShare(false)}>Cancel</Button>
                    <Button onClick={handleShare} color="primary">Share</Button>
                </DialogActions>
            </Dialog>

            {/* דיאלוג אישור מחיקה */}
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>Delete File</DialogTitle>
                <DialogContent>
                    <Typography>     Are you sure you want to delete {file.name}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* דיאלוג עריכת שם הקובץ */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                <DialogTitle> Edit File</DialogTitle>
                <DialogContent>
                    <TextField label=" New File Name" fullWidth value={newFileName} onChange={(e) => setNewFileName(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                    <Button onClick={handleEdit} color="primary">Save Changes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default FileCard;
