import { Chip, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getNotesByKidId } from "../../../api/employeeApi";



export const ChildInformationPopUp = ({ open, setOpen, kid }) => {

    const [childNotes,setChildNotes] = useState([]);
    useEffect(() => {
        getNotesByKidId(kid.child_id).then(x=> {
            // console.log(`child_id: ${kid.child_id}`)
            // console.log(`child_name: ${kid.name}`)
            // console.log(x.data);
            setChildNotes(x.data);
        })
    },[kid])

    // console.log(childNotes);
    return <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>
            <Typography sx={{ fontSize: "1.5rem" }} >{kid.name}</Typography>
        </DialogTitle>
        <DialogContent>
            <div>

                <Typography sx={{ display: "inline" }}>Health:   </Typography>
                <Chip label={kid.health} />
            </div>
            <div>

                <Typography sx={{ display: "inline" }}>Age:   </Typography>
                <Chip label={kid.age} />
            </div>
            <Typography>Notes:</Typography>
            {
                childNotes.map(note => (
                    <Chip key={note} label={note['note']} sx={{ margin: 1 }} />
                ))
            }
        </DialogContent>
    </Dialog>

}