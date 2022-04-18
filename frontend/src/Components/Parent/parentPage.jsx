import { Grid } from '@mui/material';
import { DaycareBanner } from './daycareBanner';

import { ParentCard } from './parentCard';
import ResponsiveAppBar from '../NavBar';
export const ParentPage = () => {
   
    
    return <>
    <ResponsiveAppBar/>
    <DaycareBanner/>
    <Grid container spacing={2}>
        <Grid item xs={6}>
            <ParentCard/>
        </Grid>
        <Grid item xs={6}>
            <ParentCard/>
        </Grid>
        
    </Grid>

    </>;
}
export default ParentPage;