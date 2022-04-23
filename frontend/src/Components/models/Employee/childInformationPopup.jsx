import { Button, Chip, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { Box } from "@mui/system"


export const ChildInformationPopUp = ({open,setOpen,kid}) => {

    const childNotes = [
        "Allergic to Beans",
        "Bad Temper",
        "Annoying asf"
    ]

    // console.log(childNotes);
   return <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>
            <Typography variant="h5">{kid.name}</Typography>
        </DialogTitle>
        <DialogContent>
            <Typography>health Status: {kid.health}</Typography>
            <Typography>Age: {kid.age}</Typography>
            <Typography>Notes:</Typography>
            {
                        childNotes.map(note => (
                            <Chip label={note} sx={{margin:1}}  />
                        ))
            }
        </DialogContent>
    </Dialog>

}