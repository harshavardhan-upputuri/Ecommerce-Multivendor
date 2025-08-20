import React, { useState } from "react";
import {
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

const PickupAddressCard = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    Address: "Virani Clothing",
    City: "Hyderabad",
    State: "Telangana",
    Mobile: "9876567843",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);
  const handleSave = () => {
    // TODO: Send formData to backend
    console.log("Updated data:", formData);
    setEditMode(false);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom>
          Pickup Address
        </Typography>
        {!editMode && (
          <IconButton color="primary" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        )}
      </Box>

      {editMode ? (
        <>
          <TextField
            label="Address"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="City"
            name="City"
            value={formData.City}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="State"
            name="State"
            value={formData.State}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Mobile"
            name="Mobile"
            value={formData.Mobile}
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
            <Typography>Address</Typography>
            <Typography fontWeight="bold">{formData.Address}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography>City</Typography>
            <Typography fontWeight="bold">{formData.City}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography>State</Typography>
            <Typography fontWeight="bold">{formData.State}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography>Mobile</Typography>
            <Typography fontWeight="bold">{formData.Mobile}</Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default PickupAddressCard;
