import axios from "axios";

const URL = "http://3.145.96.3:8000"

export const postChild = (name, age, parentID=1, center_id=1) => new Promise((resolve, reject) => {

    // console.log("here")
    axios.post(`${URL}/kids`, {
        name: name,
        age: age,
        health: "healthy",
        parent_id: parentID,
        center_id: center_id,
        room_id: -1,
        behavior: 0})
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});