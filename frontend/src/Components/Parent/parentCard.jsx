import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react";
import {getKids} from "..//..//api/parentApi";


export const ParentCard = (children) => {
  const [ kids, setKids ] = useState([]);

    useEffect (() => {
        getKids().then(x => setKids(x));
    }, []);

  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(note);
    setOpen(false);
  };

  return <>
    {/* {console.log(kids["rows"][0])} */}
    <Box sx={{m:5}}>
      <Card variant="outlined" sx={{ minWidth: 275 , boxShadow: 2 }}>
        <CardContent >
        { kids["rows"] && kids["rows"].map((kid, index) =>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {kid.name}
                    <br></br>
                    Current Room: {kid.room_id}
                    <br></br>
                    Age: {kid.age}
                    <br></br>
                    
                </Typography>) 
                }
          

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Current Room: Room 1
            {/*Child.currentRoom*/}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Chaperone: John Doe
            {/*Child.name*/}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Health Status: Healthy
            {/*Child.healthStatus*/}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Recent Behavioral Concerns: None
            {/*Child.behavior*/}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Notes about your child:{note}
            {/*Child.notes*/}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => {
            handleClickOpen();
            console.log('edit child form')
          }}
            size="small">Edit this childs needs</Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Child Information</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Use this form to add any necessary notes about your child.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Note"
                type="Note"
                fullWidth
                variant="standard"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </DialogContent>
            <DialogActions>

              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Add Note</Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    </Box>
  </>;
}