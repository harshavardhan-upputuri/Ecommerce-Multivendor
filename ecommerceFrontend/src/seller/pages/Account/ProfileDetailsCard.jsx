import React, { useState, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const ProfileDetailsCard = () => {
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "Raam Virani",
    email: "RaamVirani@gmail.com",
    mobile: "9876567843",
    avatar:
      "https://cdn.pixabay.com/photo/2015/04/15/09/28/head-723540_640.jpg",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);
  const handleSave = () => {
    console.log("Updated data:", formData);
    setEditMode(false);
  };

  // Trigger hidden file input
  const handleAvatarClick = () => {
    if (editMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle image change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
      <div className="flex justify-between">
        <Typography variant="h6" gutterBottom>
          Personal Details
        </Typography>

        {!editMode && (
          <IconButton color="primary" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        )}
      </div>

      {/* Avatar Section */}
      <Box display="flex" alignItems="center" mb={2} position="relative">
        <Avatar
          src={formData.avatar}
          alt={formData.name}
          sx={{
            width: 80,
            height: 80,
            mr: 2,
            cursor: editMode ? "pointer" : "default",
          }}
          onClick={handleAvatarClick}
        />
        {editMode && (
          <IconButton
            sx={{
              position: "absolute",
              left: 55,
              top: 55,
              backgroundColor: "white",
              boxShadow: 1,
            }}
            onClick={handleAvatarClick}
          >
            <CameraAltIcon fontSize="small" />
          </IconButton>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
      </Box>

      {/* Edit Mode */}
      {editMode ? (
        <>
          <TextField
            label="Seller Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Seller Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Seller Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <Box mt={2} display="flex" gap={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography>Seller Name</Typography>
            <Typography fontWeight="bold">{formData.name}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography>Seller Email</Typography>
            <Typography fontWeight="bold">{formData.email}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography>Seller Mobile</Typography>
            <Typography fontWeight="bold">{formData.mobile}</Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default ProfileDetailsCard;
