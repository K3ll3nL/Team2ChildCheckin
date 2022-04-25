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
    const [loggedInUser,setLoggedInUser] = React.useState({});
    const navigate = useNavigate();
    const [currDaycare,setCurrDaycare] = React.useState({});

    // console.log("IN THE DAYCARE BANNER ")
    useEffect(() => {
        let _user= jwt_decoder(sessionStorage.getItem('jwt'));
        setLoggedInUser(_user);
        getDaycareID(_user.user_id).then(daycareId => {
            console.log(daycareId)
                getDaycare(daycareId.data[0].center_id).then(x => {
                    if(x.data[0].center_id === -1) {
                        x.data[0].name ="";
                    }
                    setCurrDaycare(x.data[0]);
                    // console.log(x.data[0]);
                })
            })
        
    }, []);


   const handleRemoveDaycare =() => {
        setCurrDaycare(null);
        console.log(loggedInUser);
        removeDaycare(loggedInUser.user_id);
   }
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
                    {currDaycare && currDaycare.name}
                    {/* {daycareName.data&&daycareName.data[0].name} */}
                    {/* {removeDaycare()} */}
                </Typography>

            </Grid>
            <Grid item xs={6}>
                <Button 
                    onClick={handleRemoveDaycare} 
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
