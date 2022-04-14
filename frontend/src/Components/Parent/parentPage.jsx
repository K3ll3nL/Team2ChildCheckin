import { Grid } from '@mui/material';
import ResponsiveAppBar from '../NavBar';
import { DaycareBanner } from './daycareBanner';

import { ParentCard } from './parentCard';

export const ParentPage = () => {
   
    
    return <>
        <ResponsiveAppBar />
        <DaycareBanner />
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