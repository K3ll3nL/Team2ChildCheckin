import { AppBar, Avatar, Button, Chip, createTheme, Grid, List, ListItem, ListItemButton, ListItemText, ListSubheader, Tab, Tabs, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useMemo, useState } from "react"
import { getEmployeesByCenterId } from "../api/employeeApi"
import { getKidsByCenterId, getRoomsByCenterId } from "../api/roomsApi"
import { ListWithSearch } from "./listWithSearch"
import { RoomList } from "./models/Employee/roomList"
import ResponsiveAppBar from "./NavBar"
import { ParentCard } from "./Parent/parentCard"
import sadFace from '../img/bad_face.jpg'
import { BehaviorFace } from "./models/behaviorFace"
import jwt_decoder from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import { ChildRoomSelector } from "./models/Employee/childRoomSelector"
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
    const [employees,setEmployees] = useState([]);
    const [loggedInEmployee,setLoggedInEmployee] = useState({});
    const [dialogOpen,setDialogOpen] = useState(false);
    const navigate = useNavigate();


    const clearKids = () => {
        let _kids = [...kids];
        _kids.map(kid => {
            kid.room_id=-1;
        })
        setKids(_kids);
    }
    useEffect(() => {
        try {
            const _employee = jwt_decoder(sessionStorage.getItem("jwt"));
            setLoggedInEmployee(_employee);
        } catch {
            navigate("/Login");
        }
    },[])

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
    let _employees = [];
    useEffect(() => {
        getEmployeesByCenterId(1).then(x => {
            //    debugger;
            // console.log("Children: ")
            x.data.map(val => {
                _employees.push(val)
                // console.log(val)
            })
            //    console.log(_orgs);
            setEmployees(_employees);
        });
    }, []);

    const [rooms, setRooms] = useState([]);
    let _rooms = [];
    useEffect(() => {
        getRoomsByCenterId(1).then(x => {
            //    debugger;
            x.data.map(val => {
                _rooms.push(val)
            })
            //    console.log(_orgs);
            setRooms(_rooms);
        });
    }, []);

    const handleUnassignKid= (kidId) => {
        _kids = [...kids];
        // console.log("Childnrenzasdf")
        for (let i in _kids) {
            if(_kids[i].child_id === kidId) {
                _kids[i].room_id = -1;

            }
        }
        setKids(_kids);
        setDialogOpen(false);
    }
    
    return (
        <Box>

            <ResponsiveAppBar></ResponsiveAppBar>
            

            <Grid container sx={{padding:1.5}} spacing={2} columns={12}>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                    
                    <AppBar position="static" theme={theme} >
                        <Tabs value={tabValue} onChange={handleTabChange}  textColor="inherit" TabIndicatorProps={{style: { backgroundColor: "#FFFFFB"}}}>
                            <Tab label="Unassigned Children"/>
                            <Tab label="Find Child"/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={tabValue} index={0}>
                        <Button variant="contained" fullWidth onClick={clearKids} sx={{marginBottom:1,marginTop:1}}>clear assigned kids</Button>
                        <ChildRoomSelector open={dialogOpen} handleAddKid={handleUnassignKid} setOpen={setDialogOpen} kids={kids} buttonLabel="Unassign child" dialogTitle={`Unassign a Child`} />
                        <hr></hr>
                        <List>
                            {
                                unassignedKids.map(kid => (
                                    
                                    <ListItem divider key={kid.child_id}>
                                        <ListItemButton>
        
                                            <ListItemText primary={kid.name} />
                                            
                                        </ListItemButton>
                                       <BehaviorFace kid={kid} mutable={false}/>
                                        
                                    </ListItem>
                                ))
                            }
                        </List>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <ListWithSearch valToList={kids} attributeToDisplay="name" chipAttributeValue="room_id" chipValToList={rooms} chipValToDisplay="room_name">
                            
                        </ListWithSearch>
                    </TabPanel>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={8}>
                    <RoomList centerId={1} kids={kids} setKids={setKids} rooms={rooms} setRooms={setRooms} employees={employees} setEmployees={setEmployees}/>
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