import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { getDaycare, removeDaycare } from "..//..//api/parentApi";
import jwt_decoder from 'jwt-decode';

export const DaycareBanner = ({daycareName,setDaycare}) => {
    return <>


        <Grid container
            spacing={1}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ boxShadow: 2 }}
        >
            <Grid item xs={12} sx={{ mt: 2 }}>

                <Typography variant="h4" gutterBottom>
                    {console.log(daycareName)}
                    {daycareName.data&&daycareName.data[0].name}
                    {/* {removeDaycare()} */}
                </Typography>

            </Grid>
            <Grid item xs={6}>
                <Button 
                    onClick={() => {
                        removeDaycare(jwt_decoder(sessionStorage.getItem('jwt')).user_id);
                        // console.log(setDaycare);
                        setDaycare(getDaycare(jwt_decoder(sessionStorage.getItem('jwt')).center_id));

                    }} 
                variant="contained">
                    Remove Current Daycare
                </Button>
            </Grid>
            <Grid item xs={6} sx={{ mb: 3 }}>
                <Button variant="contained" disableElevation>
                    Find New Daycare
                </Button>
            </Grid>

        </Grid>



    </>
}
