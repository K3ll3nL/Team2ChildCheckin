import axios from 'axios'

const apiEndpoint = `http://0.0.0.0:8000/parents/parent_id/kids`;


export const getKids = (params) => new Promise((resolve, reject) => {
    if (params) {

    }
    console.log("here")
    axios.get(`http://0.0.0.0:8000/parents/parent_id/kids?parent_id=${2}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});