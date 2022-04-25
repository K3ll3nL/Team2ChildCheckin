import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, MenuItem } from '@mui/material';
import { postChild } from '../../api/childApi';
import jwt_decoder from 'jwt-decode'
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom"
import { getKids } from "..//..//api/parentApi";

export default function AddChildForm({kids, setKids}) {
  const [open, setOpen] = React.useState(false);
  const [loggedInEmployee, setLoggedInEmployee] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    try {
        const _employee = jwt_decoder(sessionStorage.getItem("jwt"));
        setLoggedInEmployee(_employee);
        // console.log(loggedInEmployee)
    } catch {
        navigate("/Login");
    }
}, [navigate])
  var ages = [];
  for (var i = 0; i < 18; i++) {
    ages.push(i);
  };
  const [age, setAge] = React.useState(0);
  const [childName, setChildName] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAge(0);
    setChildName('');
  };
  const handleSubmit = () => {
    postChild(childName, age, loggedInEmployee.user_id, loggedInEmployee.center_id).then(x=> {
      getKids(loggedInEmployee.user_id).then(x => setKids(x));
    });
    setOpen(false);
    setAge(0);
    setChildName('');
    
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Child
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Child</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To get started adding your child. Please enter in the information below.
          </DialogContentText>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                label="Name"
                type="name"
                variant="standard"
                value={childName}
                onChange={(event) => setChildName(event.target.value)}
              />
              <TextField
                id="standard-select-age"
                required
                select
                label="Age"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                helperText="Please select your child's age"
                variant="standard"
              >
                {ages.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
