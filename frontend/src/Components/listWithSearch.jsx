import { List, ListItem, ListItemText, TextField } from "@mui/material";
import { useState } from "react";



export const ListWithSearch = ({valToList,children,attributeToDisplay}) => {
    let temp = valToList;
    const [items, setItems] = useState(temp);
    console.log(`temp: ${temp}\nitems: ${items}`)
    const [searched, setSearched] = useState("");
   
    const requestSearch = (searchedVal) => {
      setSearched(searchedVal.target.value);
    };
    
    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
      let _items = [...items].filter(x => {
         return  x === searched;
      });
    };

    return (
        <div>
            <TextField value={searched} onChange={requestSearch} fullWidth size="small" sx={{marginTop:2}} label="Filter"/>
            <List>
                {
                     items.map(val => (

                        <ListItem divider>
                            

                                <ListItemText primary={val[attributeToDisplay]} />
                            

                        </ListItem>
                    ))
                }
            </List>
        </div>
    )
}