import axios from "axios";
const URL = "3.145.96.3:8000"
export const getRoomsByCenterId = (centerId) => new Promise((resolve, reject) => {

    // console.log("here")
    axios.get(`${URL}/rooms/${centerId}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});

export const getKidsByCenterId = (centerId) => new Promise((resolve, reject) => {

    // console.log("here")
    axios.get(`${URL}/kids/${centerId}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});
