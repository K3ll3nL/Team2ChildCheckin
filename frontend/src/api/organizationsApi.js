import axios from "axios";
const URL = "http://localhost:8000"
export const getOrgs = (params) => new Promise((resolve, reject) => {
    if (params) {

    }
    console.log("here")
    axios.get(`${URL}/centers/`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});