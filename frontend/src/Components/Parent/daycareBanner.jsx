import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { getDaycare, removeDaycare } from "..//..//api/parentApi";
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
                    {daycareName.data&&daycareName.data[0].name}
                    {/* {removeDaycare()} */}
                </Typography>

            </Grid>
            <Grid item xs={6}>
                <Button 
                    onClick={() => {
                        removeDaycare();
                        console.log(setDaycare);
                        setDaycare();
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
