import axios from "axios";
const URL = "http://localhost:8000"
export const getRoomsByCenterId = (centerId) => new Promise((resolve, reject) => {

    // console.log("here")
    axios.get(`${URL}/roomsById?center_id=${centerId}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});

export const getKidsByCenterId = (centerId) => new Promise((resolve, reject) => {

    // console.log("here")
    axios.get(`${URL}/kidsByRoomId?center_id=${centerId}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});