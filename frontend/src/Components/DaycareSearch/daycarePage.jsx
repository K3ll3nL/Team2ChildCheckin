import { useEffect } from "react";
import { DaycareCard } from "./daycareCard";
import { useState } from "react";
import { getDaycares } from "..//..//api/daycareApi";
import { DaycareBanner } from "../Parent/daycareBanner";
import { Grid } from "@material-ui/core";
import ResponsiveAppBar from '../NavBar';
export const DaycarePage = () => {
    const [daycares, setDaycares] = useState([]);
    useEffect(() => {
        //will pass in parent id to get kids
        getDaycares().then(x => setDaycares(x));
    }, []);


    return<>
        
        <ResponsiveAppBar/>
        <Grid container spacing={2}>
            

                {daycares.data && daycares.data.map((_daycare, index) =>
                    <Grid item xs={6}>
                    <DaycareCard daycare={_daycare}/>
                    </Grid>
                )}

            

        </Grid>
    </>
}