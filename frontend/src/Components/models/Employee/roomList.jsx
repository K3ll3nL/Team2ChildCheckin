import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { getKidsByCenterId, getRoomsByCenterId } from "../../../api/roomsApi";
import { RoomCard } from "./roomCard";





export const RoomList = ({ centerId }) => {
    const [rooms, setRooms] = useState([]);
    let _rooms = [];
    useEffect(() => {
        getRoomsByCenterId(centerId).then(x => {
            //    debugger;
            x.data.map(val => {
                _rooms.push(val)
            })
            //    console.log(_orgs);
            setRooms(_rooms);
        });
    }, []);
    const [kids, setKids] = useState([]);
    let _kids = [];
    useEffect(() => {
        getKidsByCenterId(centerId).then(x => {
            //    debugger;
            console.log("Children: ")
            x.data.map(val => {
                _kids.push(val)
                console.log(val)
            })
            //    console.log(_orgs);
            setKids(_kids);
        });
    }, []);

    console.log(`Center id: ${centerId} `)
    kids.map(kid => {
        console.log(kid.name);
    })
    return (
        <Grid container spacing={2}>
            {
                rooms.map((room) => (
                    <Grid item xs={6}>
                        <RoomCard roomId={room.room_id} roomName={room.room_name} setKids={setKids} kids={kids} centerId={centerId}></RoomCard>
                    </Grid>
                ))
            }
        </Grid>
    )
}