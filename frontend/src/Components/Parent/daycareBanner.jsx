import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const DaycareBanner = () => {

    return <>
        <Box sx={{ mt:-5}}>
            <Box sx={{ display: 'inline' }, { boxShadow: 2 }}>
                <Box sx={{ m: 5 }}>
                    <Typography variant='h5' sx={{ display: "inline" }} color="text.secondary" gutterBottom>
                        Will Strickland
                    </Typography>
                    <Button variant="contained" disableElevation sx={{ display: 'inline' }, { m: 5 }}>
                        Remove Current Daycare
                    </Button>
                    <Button variant="contained" disableElevation>
                        Find New Daycare
                    </Button>
                </Box>
            </Box>
        </Box>
    </>
}
