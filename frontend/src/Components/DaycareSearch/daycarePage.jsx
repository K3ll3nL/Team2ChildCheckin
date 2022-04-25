import { useEffect } from "react";
import { DaycareCard } from "./daycareCard";
import { useState } from "react";
import { getDaycares } from "..//..//api/daycareApi";
import { DaycareBanner } from "../Parent/daycareBanner";
import { Grid } from "@material-ui/core";
import ResponsiveAppBar from '../NavBar';
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DaycareReviews } from "./daycareReviews";
export const DaycarePage = () => {
    const [daycares, setDaycares] = useState([]);
    const [searchTerms, setSearchTerms] = useState([]);
    useEffect(() => {
        //will pass in parent id to get kids
        getDaycares().then(x => {
            x.data.splice(0,1);

            setDaycares(x.data)
            setSearchTerms(x.data);
        });
    }, []);


    return <>

        <ResponsiveAppBar />

        <Box sx={{margin:2}}>

        <Grid container spacing={2}  >
            <Grid xs={12}>
            <CustomFilter items={searchTerms} setItems={setSearchTerms} fullList={daycares} />

            </Grid>

            {searchTerms && searchTerms.map((_daycare, index) =>
                <Grid item xs={6}>
                    <DaycareCard daycare={_daycare} />
                </Grid>
            )}



        </Grid>
            </Box>
    </>
}


const CustomFilter = ({ items, setItems, fullList }) => {
    const [searched, setSearched] = useState("");
    const [focused, setFocused] = useState(false);


    const requestSearch = (searchedVal) => {
        setSearched(searchedVal.target.value);

        let _items = fullList.filter(x => (
            x.name.toLowerCase().includes(searchedVal.target.value.toLowerCase()) || 
            x.address.toLowerCase().includes(searchedVal.target.value.toLowerCase()) ||
            x.zip_code.toLowerCase().includes(searchedVal.target.value.toLowerCase())

        ));
        // console.log(`searched: ${searched}`)
        // console.log(`targetValue: ${searchedVal.target.value}`)
        // console.log(_items);
        setItems(_items);
    };
    const handleFocus = () => {
        setFocused(true);
        // console.log(`Focus: ${focused}`)


    }
    const handleBlur = () => {
        setFocused(false);
        // console.log(`Focus: ${focused}`);
        setSearched("");
        setItems(fullList);
    }
    // const filterControlContext = useFormControl();
    // if(filterControlContext == null) {
    //     console.log("Null FIlter Control")
    // }
    // const {onFocus,focused,onBlur} = filterControlContext;



    // console.log(`focused: ${focused}`)
    return (

        <TextField focused={focused} value={searched} onChange={requestSearch} fullWidth size="small" sx={{ marginTop: 2 }} placeholder="Filter " onFocus={handleFocus} onBlur={handleBlur} />
    )
}