import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { getKidsByRoomId } from "../../../api/roomsApi";


export const RoomCard = ({ roomId, roomName, setKids, kids,centerId }) => {
    
      
    
   
   
    let _kids = [];
    kids.map(kid => {
        if (kid.room_id === roomId) {
            _kids.push(kid);
        }
    })

    
    const handleAddKid= () => {
        _kids = [...kids];
        console.log("Childnrenzasdf")
        for (let i in _kids) {
            if(_kids[i].name === "Kid Shock") {
                _kids[i].room_id = roomId;

            }
        }
        setKids(_kids);
    }
        console.log(`Kids: ${typeof (kids)}`)
    return (
        <Card>
            <CardHeader title={roomName} />

            <CardContent>
                <List>
                    {
                        _kids.map(kid => (

                            <ListItem divider>
                                <ListItemButton>

                                    <ListItemText primary={kid.name} />
                                </ListItemButton>

                            </ListItem>
                        ))
                    }
                </List>
            </CardContent>
            <CardActions>
                
                <Button variant="contained" fullWidth onClick={handleAddKid}>Add Child</Button>

            </CardActions>
        </Card>
    )
}