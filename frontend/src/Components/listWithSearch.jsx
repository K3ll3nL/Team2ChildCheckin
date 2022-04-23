import { Chip, FormControl, List, ListItem, ListItemText, TextField, Typography, useFormControl } from "@mui/material";
import { useContext, useEffect, useState } from "react";



export const ListWithSearch = ({valToList,children,attributeToDisplay, chipAttributeValue, chipValToList, chipValToDisplay}) => {
    let temp = valToList;
    const [items, setItems] = useState(temp);
    const [searchTerms,setSearchTerms] = useState(temp);
    
    // console.log(chipValToList.find(x=> x[chipAttributeValue] === searchTerms[0][chipAttributeValue]));

    return (
        <div>
            <FormControl fullWidth>

                <CustomFilter items={searchTerms} setItems ={setSearchTerms} fullList ={items}/>
            </FormControl>
            {
                searchTerms.length === 0 && <Typography align="center" color="#9e9e9e">No children have been checked in</Typography>
            }
            <List>
                {
                     searchTerms && searchTerms.map(val => (

                        <ListItem divider>
                            

                                <ListItemText primary={val[attributeToDisplay]} />
                                 {
                                    val[chipAttributeValue]&& <Chip label={
                                        chipValToList.find(x=> val[chipAttributeValue]&& x[chipAttributeValue] === val[chipAttributeValue]) ? chipValToList.find(x=> x[chipAttributeValue] === val[chipAttributeValue])[chipValToDisplay] : "Unassigned"
                                    }/>  
                                }  

                        </ListItem>
                    ))
                }
            </List>
        </div>
    )
}


const CustomFilter = ({items,setItems,fullList}) => {
    const [searched, setSearched] = useState("");
    const [focused,setFocused] = useState(true);
    
    
    const requestSearch = (searchedVal) => {
            setSearched(searchedVal.target.value);
            
            let _items =fullList.filter(x => x.name.toLowerCase().includes(searchedVal.target.value.toLowerCase()));
            // console.log(`searched: ${searched}`)
            // console.log(`targetValue: ${searchedVal.target.value}`)
            // console.log(_items);
            setItems(_items);
    };
    const handleFocus = () => {
        setFocused(false);
        // console.log(`Focus: ${focused}`)
        
        
    }
    const handleBlur = () => {
        setFocused(true);
        // console.log(`Focus: ${focused}`);
        setSearched("");
        setItems(fullList);
    }
    // const filterControlContext = useFormControl();
    // if(filterControlContext == null) {
    //     console.log("Null FIlter Control")
    // }
    // const {onFocus,focused,onBlur} = filterControlContext;
    
    

    // console.log(`focused: ${focused}`)
    return (

        <TextField value={searched} onChange={requestSearch} fullWidth size="small" sx={{marginTop:2}} placeholder="Filter" onFocus={handleFocus} onBlur={handleBlur}/>
        )
}