import { Grid } from '@mui/material';
import { DaycareBanner } from './daycareBanner';

import { ParentCard } from './parentCard';
import ResponsiveAppBar from '../NavBar';

import { useEffect, useState } from "react";
import { getKids,getDaycare } from "..//..//api/parentApi";
import jwt_decoder from 'jwt-decode';
export const ParentPage = () => {
    // will need to pass parent id into parent page
    const [kids, setKids] = useState([]);
    const [daycare, setDaycare] = useState([]);
    useEffect(() => {
        //will pass in parent id to get kids
        
        getKids(jwt_decoder(sessionStorage.getItem('jwt')).user_id).then(x => setKids(x));
        getDaycare(jwt_decoder(sessionStorage.getItem('jwt')).center_id).then(x => setDaycare(x));
    }, []);

    return <>
        {console.log(jwt_decoder(sessionStorage.getItem('jwt')).user_id)}
        <ResponsiveAppBar />
        <DaycareBanner daycareName={daycare} setDaycare={setDaycare}/>
        <Grid container spacing={2}>
            

                {kids["rows"] && kids["rows"].map((kid, index) =>
                    <Grid item xs={6}>
                    <ParentCard child={kid} />
                    </Grid>
                )}

            

        </Grid>

    </>;
}
export default ParentPage;