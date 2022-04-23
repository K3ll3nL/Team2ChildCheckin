import { Button, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { Box } from "@mui/system"


export const ChildRoomSelector = ({ open, setOpen, kids, handleAddKid, buttonLabel, color = "primary", dialogTitle, sx }) => {
    const handleButtonClick = () => {
        setOpen(true);
    }
    const handleDialogClose = () => {
        setOpen(false);
    }

    return (
        <Box sx={{ minWidth: "100%" }}>
            <Button variant="contained" fullWidth color={color} onClick={handleButtonClick} sx={sx}>{buttonLabel}</Button>
            <Dialog open={open} onClose={handleDialogClose} maxWidth="xs" fullWidth>
                <DialogTitle sx={{paddingBottom:0,marginBottom:0}}>
                    <Typography variant="h5">{dialogTitle}</Typography>
                </DialogTitle>
                <DialogContent dividers sx={{paddingTop:0,marginTop:0}}>

                    <List sx={{paddingTop:0}}>
                        {
                            kids.map(kid => (

                                <ListItem divider key={kid.child_id}>
                                    <ListItemButton onClick={() => handleAddKid(kid.child_id)}>

                                        <ListItemText primary={kid.name} />
                                    </ListItemButton>


                                </ListItem>
                            ))
                        }
                    </List>
                </DialogContent>
            </Dialog>
        </Box>
    )
}