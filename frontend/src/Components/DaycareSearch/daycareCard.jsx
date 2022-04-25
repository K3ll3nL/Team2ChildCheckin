import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import { Rating } from '@mui/material';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

export const DaycareCard = ({daycare}) => {



    return<>
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          
            <Img alt="complex" src={daycare.image_url} sx={{height:175,width:200}} />
          
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {daycare.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {daycare.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {daycare.zip_code}
              </Typography>
            </Grid>
            <Grid item>
              <Button >
                Join This Daycare
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              <Rating value={2} readOnly ></Rating>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </>
}