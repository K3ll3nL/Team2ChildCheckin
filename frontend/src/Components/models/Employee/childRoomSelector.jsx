import { Button, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { Box } from "@mui/system"


export const ChildRoomSelector = ({ open, setOpen, kids, handleSelect, buttonLabel, color = "primary", dialogTitle, sx,roomId,emptyMessage="No children to move" }) => {
    const handleButtonClick = () => {
        setOpen(true);
    }
    const handleDialogClose = () => {
        setOpen(false);
    }

    // console.log(typeof(handleSelect))
    return (
        <Box sx={{ minWidth: "100%" }}>
            <Button variant="contained" fullWidth color={color} onClick={handleButtonClick} sx={sx}>{buttonLabel}</Button>
            <Dialog open={open} onClose={handleDialogClose} maxWidth="xs" fullWidth>
                <DialogTitle sx={{paddingBottom:0,marginBottom:0}}>
                    <Typography sx={{fontSize:"1.5rem"}} >{dialogTitle}</Typography>
                </DialogTitle>
                <DialogContent dividers sx={{paddingTop:0,marginTop:0}}>
                
                    <List sx={{paddingTop:0}}>
                        {
                            !kids.find(x => x.room_id !== roomId) && <Typography sx={{marginTop:1}} color="#9e9e9e">{emptyMessage}</Typography>
                        }
                        {
                            kids.map(kid => (

                                kid.room_id !== roomId && <ListItem divider key={kid.child_id}>
                                    <ListItemButton onClick={() => handleSelect(kid)}>

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