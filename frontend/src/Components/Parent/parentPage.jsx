import { Grid } from '@mui/material';
import { DaycareBanner } from './daycareBanner';

import { ParentCard } from './parentCard';
import ResponsiveAppBar from '../NavBar';

import { useEffect, useState } from "react";
import { getKids } from "..//..//api/parentApi";

export const ParentPage = () => {
    // will need to pass parent id into parent page
    const [kids, setKids] = useState([]);

    useEffect(() => {
        //will pass in parent id to get kids
        getKids().then(x => setKids(x));
    }, []);

    return <>
        <ResponsiveAppBar />
        <DaycareBanner />
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