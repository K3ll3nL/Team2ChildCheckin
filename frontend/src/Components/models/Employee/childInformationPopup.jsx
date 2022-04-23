import { Chip, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material"



export const ChildInformationPopUp = ({ open, setOpen, kid }) => {

    const childNotes = [
        "Allergic to Beans",
        "Bad Temper",
        "Annoying asf"
    ]

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
                    <Chip key={note} label={note} sx={{ margin: 1 }} />
                ))
            }
        </DialogContent>
    </Dialog>

}