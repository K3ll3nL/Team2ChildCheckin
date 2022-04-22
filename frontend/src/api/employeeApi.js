import axios from "axios";

const URL = "http://localhost:8000"

export const getEmployeesByCenterId = (centerId) => new Promise((resolve, reject) => {

    // console.log("here")
    axios.get(`${URL}/employees/${centerId}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});