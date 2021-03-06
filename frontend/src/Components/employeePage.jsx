import { AppBar,  Button, createTheme, Grid, List, ListItem, ListItemButton, ListItemText, Tab, Tabs, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useMemo, useState } from "react"
import { getEmployeesByCenterId, updateKid } from "../api/employeeApi"
import { getKidsByCenterId, getRoomsByCenterId } from "../api/roomsApi"
import { ListWithSearch } from "./listWithSearch"
import { RoomList } from "./models/Employee/roomList"
import ResponsiveAppBar from "./NavBar"
import { BehaviorFace } from "./models/behaviorFace"
import jwt_decoder from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import { ChildRoomSelector } from "./models/Employee/childRoomSelector"
import { ChildInformationPopUp } from "./models/Employee/childInformationPopup"
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
    const [unCheckedInKids, setUnCheckedInKids] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [loggedInEmployee, setLoggedInEmployee] = useState({});
    const [assignedDialogOpen, setAssignedDialogOpen] = useState(false);
    const [checkedDialogOpen,setCheckedDialogOpen] = useState(false);
    const navigate = useNavigate();
    const [kidToDisplay,setKidToDisplay] = useState({
        name: "Default Name",
        age: 0,
        health: "Default Health",
        notes: "Default Notes"
    });
    const [kidInfoOpen,setKidInfoOpen] = useState(false);

    const clearKids = () => {
        let _kids = [...kids];
        _kids.forEach(kid => {
            kid.room_id = -1;
            updateKid(kid);
        })
        setKids(_kids);
    }
    useEffect(() => {
        try {
            const _employee = jwt_decoder(sessionStorage.getItem("jwt"));
            setLoggedInEmployee(_employee);
            // console.log(_employee)
        } catch {
            navigate("/Login");
        }
    }, [navigate])

    const handleTabChange = (event, newVal) => {
        setTabValue(newVal);
    }

    const calculateUnAssignedKids = () => {
        let emptyKids = [];
        for (let i in kids) {
            if (kids[i].room_id === -1) {
                emptyKids.push(kids[i]);

            }
        }
        return emptyKids;
    }

    let unassignedKids = useMemo(() => calculateUnAssignedKids(), [calculateUnAssignedKids]);
    let _kids = [];
    let _uncheckedInKids = [];
    useEffect(() => {

        console.log(loggedInEmployee)
       loggedInEmployee.center_id && getKidsByCenterId(loggedInEmployee.center_id).then(x => {
            //    debugger;
            // console.log("Children: ")
            // x.data.map(val => {
            //     _kids.push(val)
            //     console.log(val)
            // })
            // debugger;
            // console.log(x.data);
            // console.log(x.data)
            for (let i in x.data) {

                if (x.data[i].checked_in) {
                    _kids.push(x.data[i]);
                } else {
                    _uncheckedInKids.push(x.data[i]);
                }
            }

            //    console.log(_orgs);
            setUnCheckedInKids(_uncheckedInKids);
            setKids(_kids);
        });
    }, [loggedInEmployee]);
    let _employees = [];
    useEffect(() => {
        getEmployeesByCenterId(loggedInEmployee.center_id).then(x => {
            //    debugger;
            // console.log("Children: ")
            x.data.forEach(val => {
                _employees.push(val)
                // console.log(val)
            })
            //    console.log(_orgs);
            setEmployees(_employees);
        });
    }, [loggedInEmployee]);

    const [rooms, setRooms] = useState([]);
    let _rooms = [];
    useEffect(() => {
        getRoomsByCenterId(loggedInEmployee.center_id).then(x => {
            //    debugger;
            x.data.forEach(val => {
                _rooms.push(val)
            })
            //    console.log(_orgs);
            setRooms(_rooms);
        });
    }, [loggedInEmployee]);

    const handleUnassignKid = (kid) => {
        _kids = [...kids];
        kid.room_id = -1;
        // console.log("Childnrenzasdf")
        for (let i in _kids) {
            if (_kids[i].child_id === kid.child_id) {
                _kids[i].room_id = -1;

            }
        }
        updateKid(kid);
        setKids(_kids);
        setAssignedDialogOpen(false);
    }

    const handleCheckIn = (kid) => {
        kid.checked_in = true;
        let oldUnchecked = [...unCheckedInKids];
        let oldKids = [...kids];
        oldKids.push(kid);
        for (let i in oldUnchecked) {
            if (oldUnchecked[i].child_id === kid.child_id) {
                oldUnchecked.splice(i, 1);
                break;
            }
        }
        updateKid(kid);
        setKids(oldKids);
        setUnCheckedInKids(oldUnchecked);

    }
    const handleCheckOut = (kid) => {
        kid.checked_in = false;
        kid.room_id = -1;
        let oldUnchecked = [...unCheckedInKids];
        let oldKids = [...kids];
        oldUnchecked.push(kid);
        for (let i in oldKids) {
            if (oldKids[i].child_id === kid.child_id) {
                oldKids.splice(i, 1);
                break;
            }
        }
        updateKid(kid);
        setKids(oldKids);
        setUnCheckedInKids(oldUnchecked);
        setCheckedDialogOpen(false);
    }

    const handleKidInfoDisplay = (kid) => {
        setKidToDisplay(kid);
        setKidInfoOpen(true);
    }

    const handleCheckOutAll = () => {
        let oldKids = [...kids];
        let oldUnchecked = [...unCheckedInKids];
        oldKids.forEach(kid => {
            kid.checked_in = false;
            kid.room_id = -1;
            oldUnchecked.push(kid);
            updateKid(kid);
        });
        setKids([]);
        setUnCheckedInKids(oldUnchecked);
    }
    return (
        <Box>

            <ResponsiveAppBar></ResponsiveAppBar>


            <Grid container sx={{ padding: 1.5 }} spacing={2} columns={12}>
                <Grid item xs={12} sm={12} md={12} lg={4}>

                    <AppBar position="static" theme={theme} >
                        <Tabs value={tabValue} onChange={handleTabChange} textColor="inherit" TabIndicatorProps={{ style: { backgroundColor: "#FFFFFB" } }} variant="fullWidth">
                            <Tab label="Unassigned Children"/>
                            <Tab label="Find Child" />
                            <Tab label="Check in" />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={tabValue} index={0}>
                        <Button variant="contained" fullWidth onClick={clearKids} sx={{ marginBottom: 1, marginTop: 1 }}>Unassign All Children</Button>
                        <ChildRoomSelector 
                            open={assignedDialogOpen} 
                            handleSelect={handleUnassignKid} 
                            setOpen={setAssignedDialogOpen} 
                            kids={kids} 
                            buttonLabel="Unassign child" 
                            dialogTitle={`Unassign a Child`} 
                            roomId={-1} 
                            emptyMessage="All children are unassigned"
                        />
                        <hr></hr>
                        <ChildInformationPopUp kid={kidToDisplay} open={kidInfoOpen} setOpen={setKidInfoOpen} />
                        {
                            unassignedKids.length === 0 && <Typography align="center" color="#9e9e9e">No unassigned children</Typography>
                        }
                        <List>
                            {
                                unassignedKids.map(kid => (

                                    <ListItem divider key={kid.child_id}>
                                        <ListItemButton onClick={() => handleKidInfoDisplay(kid)}>

                                            <ListItemText primary={kid.name} />

                                        </ListItemButton>
                                        <BehaviorFace kid={kid} mutable={false} />

                                    </ListItem>
                                ))
                            }
                        </List>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <ListWithSearch valToList={kids} attributeToDisplay="name" chipAttributeValue="room_id" chipValToList={rooms} chipValToDisplay="room_name">

                        </ListWithSearch>
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                            <Button variant="contained" fullWidth sx={{marginTop:1,marginBottom:1}} onClick={handleCheckOutAll}>Check out All children</Button>
                            <ChildRoomSelector
                                open={checkedDialogOpen}
                                setOpen={setCheckedDialogOpen}
                                handleSelect={handleCheckOut} 
                                kids={kids} 
                                buttonLabel="Check Out Child" 
                                dialogTitle={`Check out a child`}
                                emptyMessage="No children to check out"
                             />
                            <hr></hr>
                            {
                                unCheckedInKids.length === 0 && <Typography align="center" color="#9e9e9e">All Children are checked in</Typography>
                            }
                        {
                            unCheckedInKids.map(kid => (

                                <ListItem divider key={kid.child_id}>


                                    <ListItemText primary={kid.name} />
                                    <Button variant="contained" onClick={() => handleCheckIn(kid)}>Check In</Button>

                                    {/* <BehaviorFace kid={kid} mutable={false}/> */}

                                </ListItem>
                            ))
                        }
                    </TabPanel>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={8}>
                    <RoomList centerId={1} kids={kids} setKids={setKids} rooms={rooms} setRooms={setRooms} employees={employees} setEmployees={setEmployees} loggedInEmployee={loggedInEmployee} />
                </Grid>
            </Grid>

        </Box>
    )
}

const TabPanel = ({ children, value, index }) => {
    return (
        <>
            {
                value === index && (
                    <div> {children}</div>
                )
            }
        </>
    )
}