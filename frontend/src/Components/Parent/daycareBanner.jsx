import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { getDaycare, getDaycareID, removeDaycare } from "..//..//api/parentApi";
import jwt_decoder from 'jwt-decode';
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react';


export const DaycareBanner = () => {
    const navigate = useNavigate();

    // const [daycare, setDaycare] = React.useState("daycareName");
    // const [daycareID, setDaycareID] = React.useState("daycareID");
    // const [user, setUser] = React.useState("user");
    useEffect(() => {
        let id= jwt_decoder(sessionStorage.getItem('jwt')).user_id;
        // setUser(jwt_decoder(sessionStorage.getItem('jwt')).user_id);
        console.log("user id", id);
        // getDaycareID(id).then(x => setDaycareID(x));
        // console.log(getDaycare(id));
        console.log("daycare", getDaycare(id));
        getDaycare(id).then(x => sessionStorage.setItem('daycare', (x.data[0].name)));
        
        console.log(sessionStorage.getItem('daycare'));
        // (getDaycare(id)).then(x => setDaycare(x));
        // console.log("daycare", daycare);
        // console.log("daycare id", daycareID);
        // console.log("daycareID", daycareID);
        // console.log("daycare", daycare);
    }, []);

   
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
                    {sessionStorage.getItem('daycare')}
                    {/* {daycareName.data&&daycareName.data[0].name} */}
                    {/* {removeDaycare()} */}
                </Typography>

            </Grid>
            <Grid item xs={6}>
                <Button 
                    onClick={() => {
                        removeDaycare(jwt_decoder(sessionStorage.getItem('jwt')).user_id);
                        // console.log(setDaycare);
                        // setDaycare(getDaycare(jwt_decoder(sessionStorage.getItem('jwt')).center_id));

                    }} 
                variant="contained">
                    Remove Current Daycare
                </Button>
            </Grid>
            <Grid item xs={6} sx={{ mb: 3 }}>
                <Button onClick={() => navigate("/FindDaycare")}
                variant="contained" disableElevation>
                    Find New Daycare
                </Button>
            </Grid>

        </Grid>



    </>
}
