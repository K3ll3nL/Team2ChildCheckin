import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { getKidsByCenterId, getRoomsByCenterId } from "../../../api/roomsApi";
import { RoomCard } from "./roomCard";





export const RoomList = ({ centerId,kids,setKids, rooms,setRooms}) => {
    
   

    console.log(`Center id: ${centerId} `)
    kids.map(kid => {
        console.log(kid.name);
    })
    return (
        <Grid container spacing={2}>
            {
                rooms.map((room) => (
                    <Grid item xs={4}>
                        <RoomCard roomId={room.room_id} roomName={room.room_name} setKids={setKids} kids={kids} centerId={centerId}></RoomCard>
                    </Grid>
                ))
            }
        </Grid>
    )
}