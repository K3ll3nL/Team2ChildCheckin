import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { theme } from '../../theme';
import ResponsiveAppBar from '../../NavBar';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const arr = ['Claire Smith', 'John Doe', 'Jane Doe', 'Ween Er', 'Carlos Santana', 'Suc Miof'];
export const EmployeeCard = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedIndex(null);
  };
  const ParentModal = () => {
    console.log(arr[selectedIndex]);
    return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">{arr[selectedIndex]}</h2>
        <p id="parent-modal-description">
          Children:
        </p>
      </Box>
    </Modal>)
  }
  return <>
  <ResponsiveAppBar />
    <Box sx={{ flexGrow: 1, maxWidth: 752, m: 2 }} theme={theme}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            List of Parents
          </Typography>

          <List dense={dense} theme={theme} sx={{ boxShadow: 2 }}>
            {arr.map(parent => (
              <ListItemButton selected={selectedIndex === arr.indexOf(parent)}
                onClick={(event) => handleListItemClick(event, arr.indexOf(parent))}>
                <ListItemAvatar>
                  <Avatar>{parent.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={parent}
                  secondary={secondary ? 'Secondary text' : null}
                  theme={theme}
                />
              </ListItemButton>
            ))}
          </List>
          <ParentModal />
        </Grid>
      </Grid>
    </Box>
  </>
} 