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
import {getKids} from "..//..//api/parentApi";
import { BehaviorFace } from '../models/behaviorFace';


export const ParentCard = ({child}) => {
  

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

    <Box sx={{margin:2}}>
      <Card variant="outlined" sx={{ minWidth: 250 , boxShadow: 2 }}>
        <CardContent >
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {child.name}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Current Room: {child.room_id}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Age: {child.age}
            {/*Child.name*/}
          </Typography>
          <Grid container spacing ={2}>
                <Grid item xs={6}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Recent Behavior: 
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <BehaviorFace kid={child} mutable={false}/>
                </Grid>
            {/*Child.healthStatus*/}
          

          </Grid>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {child.checked_in? "Checked In": "Checked Out"}
            {/*Child.healthStatus*/}
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