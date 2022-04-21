import { AppBar, createTheme, Grid, List, ListItem, ListItemButton, ListItemText, ListSubheader, Tab, Tabs, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useMemo, useState } from "react"
import { getKidsByCenterId } from "../api/roomsApi"
import { ListWithSearch } from "./listWithSearch"
import { RoomList } from "./models/Employee/roomList"
import ResponsiveAppBar from "./NavBar"

const theme = createTheme({
    palette: {
        primary: {
            light: '#819ca9',
            main: '#546e7a',
            dark: '#29434e',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#fffffb',
            main: '#d7ccc8',
            dark: '#a69b97',
            contrastText: '#000000',
        },
    },
});



export const EmployeePage = () => {
    const [kids, setKids] = useState([]);
    const [tabValue,setTabValue] = useState(0);

    const handleTabChange = (event, newVal) => {
        setTabValue(newVal);
    }

    const calculateUnAssignedKids = () => {
        let emptyKids = [];
        for (let i in kids) {
            if(kids[i].room_id === -1) {
                emptyKids.push(kids[i]);
    
            }
        }
        return emptyKids;
    }

    let unassignedKids = useMemo( () => calculateUnAssignedKids(),[kids]);
    let _kids = [];
    useEffect(() => {
        getKidsByCenterId(1).then(x => {
            //    debugger;
            // console.log("Children: ")
            x.data.map(val => {
                _kids.push(val)
                // console.log(val)
            })
            //    console.log(_orgs);
            setKids(_kids);
        });
    }, []);



    return (
        <Box>

            <ResponsiveAppBar></ResponsiveAppBar>
            <Grid container sx={{margin: 1}} spacing={2}>
                <Grid item xs={4}>
                    <AppBar position="static" theme={theme} >
                        <Tabs value={tabValue} onChange={handleTabChange}  textColor="inherit" TabIndicatorProps={{style: { backgroundColor: "#FFFFFB"}}}>
                            <Tab label="Find Child"/>
                            <Tab label="Unassigned Children"/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={tabValue} index={0}>
                        <ListWithSearch valToList={kids} attributeToDisplay="name"/>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <List>
                            {
                                unassignedKids.map(kid => (

                                    <ListItem divider>
                                        <ListItemButton>
        
                                            <ListItemText primary={kid.name} />
                                        </ListItemButton>
        
                                    </ListItem>
                                ))
                            }
                        </List>
                    </TabPanel>
                </Grid>
                <Grid item xs={8}>
                    <RoomList centerId={1} kids={kids} setKids={setKids} />
                </Grid>
            </Grid>
        </Box>
    )
}

const TabPanel = ({children,value,index}) => {
    return(
        <>
            {
                value === index && (
                    <div> {children}</div>
                )
            }
        </>
    )
}