import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, Dialog, DialogTitle, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getKidsByRoomId } from "../../../api/roomsApi";
import { BehaviorFace } from "../behaviorFace";
import { ChildInformationPopUp } from "./childInformationPopup";
import { ChildRoomSelector } from "./childRoomSelector";


export const RoomCard = ({ roomId, roomName, setKids, kids,centerId,employees,setEmployees,loggedInEmployee }) => {
    
      const [dialogOpen,setDialogOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState({});
   const [kidInfoOpen,setKidInfoOpen] = useState(false);
   const [kidToDisplay, setKidToDisplay] = useState({
       name: "Default Name",
       age: 0,
       health: "Default Health",
       notes: "Default Notes"
    

   });
   
    let _kids = [];
    kids.map(kid => {
        if (kid.room_id === roomId) {
            _kids.push(kid);
        }
    })

    let currEmployee = null;
    employees.map(employee => {
        if (employee.room_id === roomId) {
            currEmployee = employee;
        }
    })
    
    const handleAddKid= (kid) => {
        _kids = [...kids];
        // console.log("Childnrenzasdf")
        for (let i in _kids) {
            if(_kids[i].child_id === kid.child_id) {
                _kids[i].room_id = roomId;

            }
        }
        setKids(_kids);
        setDialogOpen(false);
    }
    const handleAddEmployee= () => {
        // console.log("Switching Employees")
        let _employees = [...employees];
        // console.log("Childnrenzasdf")
        for (let i in _employees) {
            if(_employees[i].employee_id === loggedInEmployee.user_id) {
                _employees[i].room_id = roomId;
                // console.log(_employees[i]);
            }
        }
        setEmployees(_employees);
    }
    const test = () => {
        console.log("Button was clicked")
    }
    const handleButtonClick = () => {
        setDialogOpen(true);
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    const setButtonColor = () => {
        if(_kids.length === 0) {
            return "success"
        } else {
            return "error"
        }
    }

    const determineSubHeader = () => {
        if(currEmployee) {
            return(
               <Box sx={{marginTop:1}}>


                    <Chip label={currEmployee.name}/>
                    <hr></hr>
               </Box>
               
            )
        } else {
            return (
                <Box sx={{marginTop: 1}}>


                    <Button variant="contained" color={setButtonColor()} size="small" onClick={handleAddEmployee}>Join This Room</Button>
                    <hr></hr>
                </Box>
            
            )
        }
    }

    const handleKidInfoDisplay = (kid) => {
        setKidToDisplay(kid);
        setKidInfoOpen(true);
    }
        // console.log(`Kids: ${typeof (kids)}`)
    return (
        <Card sx={{minWidth:250}}>
            <CardHeader title={roomName} subheader={determineSubHeader()} sx={{margin:0,paddingBottom:0}}/>
            {_kids.length !== 0 && <CardContent sx={{marginTop:0,paddingTop:0,paddingBottom:0}}>
           
                
                <List sx={{marginTop:0}}>
                    {
                        _kids.map(kid => (

                            <ListItem divider key={kid.child_id} sx={{}}>
                                <ListItemButton onClick={() => handleKidInfoDisplay(kid)}>

                                    <ListItemText primary={kid.name} />
                                </ListItemButton>
                                <BehaviorFace setKids={setKids} kid={kid} kids={kids}/>
                            </ListItem>
                        ))
                    }
                </List>
            </CardContent>}
            <ChildInformationPopUp kid={kidToDisplay} open={kidInfoOpen} setOpen={setKidInfoOpen} />
            <CardActions sx={{marginTop:0,paddingTop:0}}>
                
                <ChildRoomSelector 
                    open={dialogOpen} 
                    handleSelect={handleAddKid} 
                    setOpen={setDialogOpen} 
                    kids={kids} 
                    buttonLabel="Move child" 
                    dialogTitle={`Move a child to ${roomName}`} 
                    roomId={roomId}
                />
            </CardActions>
        </Card>
    )
}