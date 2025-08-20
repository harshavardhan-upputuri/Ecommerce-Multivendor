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

const BankDetailsCard = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    AccountHolderName: "John Doe",
    AccountNumber: "1234567890",
    IFSCCode: "SBIN0001234",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);
  const handleSave = () => {
    // TODO: Send formData to backend
    console.log("Updated bank details:", formData);
    setEditMode(false);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom>
          Bank Details
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
            label="Account Holder Name"
            name="AccountHolderName"
            value={formData.AccountHolderName}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Account Number"
            name="AccountNumber"
            value={formData.AccountNumber}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="IFSC Code"
            name="IFSCCode"
            value={formData.IFSCCode}
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
            <Typography>Account Holder Name</Typography>
            <Typography fontWeight="bold">
              {formData.AccountHolderName}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography>Account Number</Typography>
            <Typography fontWeight="bold">{formData.AccountNumber}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography>IFSC Code</Typography>
            <Typography fontWeight="bold">{formData.IFSCCode}</Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default BankDetailsCard;
