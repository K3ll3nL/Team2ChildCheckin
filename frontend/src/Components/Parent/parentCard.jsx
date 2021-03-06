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
import { Grid } from '@mui/material';

import { useEffect, useState } from "react";
import { getKids } from "..//..//api/parentApi";
import { BehaviorFace } from '../models/behaviorFace';
import { addNote, getNotesByKidId } from '../../api/employeeApi';
import { getEmployeeWatchingKid, getRoomNameByRoomId } from '../../api/roomsApi';
import { fontWeight } from '@mui/system';


export const ParentCard = ({ child }) => {


  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState("");
  const [notes, setNotes] = React.useState(['']);
  const [roomName, setRoomName] = React.useState('');
  const [employee, setEmployee] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(note);
    let NoteToAdd = { "child_id": child.child_id, "note": note };
    
    addNote(NoteToAdd);
    setOpen(false);
  };

  useEffect(() => {
    const check = getEmployeeWatchingKid(child.child_id);
    console.log(check);
    if(check.length > 0){
      getEmployeeWatchingKid(child.child_id).then(x => setEmployee(x.data[0].name));
    }
    getNotesByKidId(child.child_id).then(x => setNotes(x));
    console.log(child.child_id, " notes are ", notes);
    getRoomNameByRoomId(child.room_id).then(x => setRoomName(x.data[0].room_name));
  }, [note]);

  return <>

    <Box sx={{ margin: 2 }}>
      <Card variant="outlined" sx={{ minWidth: 250, boxShadow: 2 }}>
        <CardContent >
          <Typography variant="h6" sx={{ mb: 1.5, fontWeight:'bold'}} color="text.secondary">
            {child.name}
          </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              <b>Current Room:</b> {roomName}
            </Typography>
            
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <b>Age:</b> {child.age}
            {/*Child.name*/}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {employee? `${employee} is watching your kid`: `Your kid is not currently in a room`}
            {/*Child.name*/}
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Typography sx={{ mb: 1.5, fontWeight: 'bold'}} color="text.secondary">
                Recent Behavior:
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <BehaviorFace kid={child} mutable={false} />
            </Grid>
            {/*Child.healthStatus*/}


          </Grid>
          <Typography sx={{ mb: 1.5, fontWeight: 'bold' }} color="text.secondary">
            {child.checked_in ? "Checked In" : "Checked Out"}
            {/*Child.healthStatus*/}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <b>Notes about your child:</b>{
              console.log("notes", notes)}{
              notes.data && notes.data.map((note, index) =>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  <li>{note.note}</li>
                </Typography>
              )
            }
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