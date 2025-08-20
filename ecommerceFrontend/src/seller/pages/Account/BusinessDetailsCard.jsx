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

const BusinessDetailsCard = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "Virani Clothing",
    gstin: "GSTIN3447633",
    status: "PENDING",
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
          Business Details
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
            label="Business Name / Brand Name"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="GSTIN"
            name="gstin"
            value={formData.gstin}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Account Status"
            name="status"
            value={formData.status}
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
            <Typography>Business Name / Brand Name</Typography>
            <Typography fontWeight="bold">{formData.businessName}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography>GSTIN</Typography>
            <Typography fontWeight="bold">{formData.gstin}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography>Account Status</Typography>
            <Typography fontWeight="bold">{formData.status}</Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default BusinessDetailsCard;
