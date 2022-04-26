import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useEffect, useState } from "react"
import { addNote, getNotesByKidId } from "../../../api/employeeApi";
import { getParentByChildId } from "../../../api/parentApi";



export const ChildInformationPopUp = ({ open, setOpen, kid }) => {

    const [parent,setParent] = useState({});
    const [childNotes,setChildNotes] = useState([]);
    const [noteToAdd,setNoteToAdd] = useState("");
    useEffect(() => {
        getNotesByKidId(kid.child_id).then(x=> {
            // console.log(`child_id: ${kid.child_id}`)
            // console.log(`child_name: ${kid.name}`)
            // console.log(x.data);
            setChildNotes(x.data);
        })
        // console.log("ThE KID");
        // console.log(kid);
        kid.child_id && getParentByChildId(kid.child_id).then(x => {
            setParent(x.data[0]);
        })
    },[kid])

    const handleNoteAdded = () => {
        console.log(childNotes)
        let _childNotes = [...childNotes];
        _childNotes.push({
            child_id: kid.child_id,
            note: noteToAdd
        });
        setNoteToAdd("");
        console.log(noteToAdd);
        setChildNotes(_childNotes);
        addNote({
            child_id: kid.child_id,
            note: noteToAdd
        });
    }


    // console.log(childNotes);
    return <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>
            <Typography sx={{ fontSize: "1.5rem" }} >{kid.name}</Typography>
        </DialogTitle>
        <DialogContent>
            <div>

                <Typography sx={{ display: "inline" }}>Health:   </Typography>
                <Chip label={kid.health} sx={{height:20}} />
            </div>
            <div>

                <Typography sx={{ display: "inline" }}>Parent Contact:   </Typography>
                <Chip label={parent.phone_number} sx={{height:20}} />
            </div>
            <div>

                <Typography sx={{ display: "inline" }}>Age:   </Typography>
                <Chip label={kid.age} sx={{height:20}}/>
            </div>
            <Typography display={"inline"}>Notes:</Typography>
            {
                childNotes.map(note => (
                    <Chip key={note['note']} label={note['note']} sx={{ marginLeft: 1,height:20 }} />
                ))
            }
        </DialogContent>
        <DialogActions>
            <Grid container>
                <Grid item xs={8}>

                <TextField size="small" label="Note" fullWidth value={noteToAdd} onChange={(e) => setNoteToAdd(e.target.value)} />
                </Grid>
                <Grid item xs={4}>

                <Button variant="contained" fullWidth onClick={handleNoteAdded} >Add Note</Button>
                </Grid>
            </Grid>
        </DialogActions>
    </Dialog>

}