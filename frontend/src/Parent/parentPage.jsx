import { Grid } from '@mui/material';

import { ParentCard } from './parentCard';

export const ParentPage = () => {
   
    
    return <>
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