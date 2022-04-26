import { Grid } from '@mui/material';
import { DaycareBanner } from './daycareBanner';

import { ParentCard } from './parentCard';
import ResponsiveAppBar from '../NavBar';

import { useEffect, useState } from "react";
import { getKids, getDaycare } from "..//..//api/parentApi";
import jwt_decoder from 'jwt-decode';
import AddChildForm from './AddChildForm';
export const ParentPage = () => {
    // will need to pass parent id into parent page
    const [kids, setKids] = useState([]);
    const [daycare, setDaycare] = useState([]);
    const [daycareID, setDaycareID] = useState(0);
    useEffect(() => {
        //will pass in parent id to get kids

        getKids(jwt_decoder(sessionStorage.getItem('jwt')).user_id).then(x => setKids(x));
        getDaycare(jwt_decoder(sessionStorage.getItem('jwt')).center_id).then(x => setDaycare(x));
    }, []);

    return <>
        {console.log(jwt_decoder(sessionStorage.getItem('jwt')).user_id)}
        <ResponsiveAppBar />
        <DaycareBanner daycareName={daycare} setDaycareID={setDaycareID} sx={{ marginBottom: 10 }} />
        <Grid container spacing={2} sx={{ marginTop: 2 }}>


            {kids["rows"] && kids["rows"].map((kid, index) =>
                <Grid item xs={12} sm={6}>
                    <ParentCard child={kid} />
                </Grid>
            )}

            <Grid
                container
                spacing={0}
                alignItems="center"
                justifyContent="center"
                sx={{ mt: 2 }}
            >
                <AddChildForm daycare_id={daycareID} setKids={setKids} />
            </Grid>

            </Grid>

        </>;
}
        export default ParentPage;