import { Avatar, IconButton } from "@mui/material"
import happy_face from "../../img/happy_face.jpg"
import sad_face from "../../img/bad_face.jpg"
import medium_face from "../../img/medium_face.jpg"
import { useState } from "react"

export const BehaviorFace = ({kid, setKids, kids,mutable=true, size=30}) => {
    // const [behavior,setBehavior] = useState(kid.behavior)
    let behavior = kid.behavior;
    const handleButtonClick = () => {
        let _kids =[...kids];

        for(let i in _kids) {
            if(_kids[i].child_id === kid.child_id) {
                if(_kids[i].behavior === 2) {
                    _kids[i].behavior = 0;
                } else {
                    _kids[i].behavior = _kids[i].behavior + 1;
                }
            }
        }
        setKids(_kids);
    }

    if(mutable && behavior === 0) {
        return (
            <IconButton onClick={handleButtonClick}>
                <Avatar src={happy_face} sx={{width:size, height:size}}/>
    
            </IconButton>
        )

    } else if(mutable && behavior === 1) {
        return (
            <IconButton onClick={handleButtonClick}>
                <Avatar src={medium_face} sx={{width:size, height:size}}/>
    
            </IconButton>
        )
    } else if(mutable && behavior === 2) {
        return (
            <IconButton onClick={handleButtonClick} >
                <Avatar src={sad_face} sx={{width:size, height:size}}/>
    
            </IconButton>
        )
    } else if(!mutable && behavior === 0) {
        return (
           
                <Avatar src={happy_face} sx={{width:size, height:size}}/>
    
           
        )

    } else if(!mutable && behavior === 1) {
        return (
           
                <Avatar src={medium_face} sx={{width:size, height:size}}/>
    
            
        )
    } else if(!mutable && behavior === 2) {
        return (
            
                <Avatar src={sad_face} sx={{width:size, height:size}}/>
        )
    } else {
        return(<h1>Invalid Behavior Value</h1>)
    }

}