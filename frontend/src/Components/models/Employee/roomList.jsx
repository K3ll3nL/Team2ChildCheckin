import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { getKidsByCenterId, getRoomsByCenterId } from "../../../api/roomsApi";
import { RoomCard } from "./roomCard";





export const RoomList = ({ centerId,kids,setKids, rooms,setRooms,employees,setEmployees}) => {
    
   

    console.log(`Center id: ${centerId} `)
    kids.map(kid => {
        console.log(kid.name);
    })
    return (
        <Grid container spacing={2} >
            {
                rooms.map((room) => (
                    <Grid item key={room.room_id} sm="auto" xs={12} md="auto" lg="auto" xl="auto">
                        <RoomCard roomId={room.room_id} roomName={room.room_name} setKids={setKids} kids={kids} centerId={centerId} employees={employees} setEmployees={setEmployees}></RoomCard>
                    </Grid>
                ))
            }
        </Grid>
    )
}