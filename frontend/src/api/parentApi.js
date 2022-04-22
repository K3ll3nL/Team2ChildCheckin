import axios from 'axios'
const apiEndpoint = `http://0.0.0.0:8000/parents/parent_id/kids`;
const URL ="http://localhost:8000";

export const getKids = (params) => new Promise((resolve, reject) => {
    if (params) {

    }
    console.log("here")
    axios.get(`${URL}/parents/parent_id/kids?parent_id=${2}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});

export const getDaycare = (params) => new Promise((resolve, reject) => {
    if (params) {

    }
    console.log("here")
    axios.get(`${URL}/centers/center_id/name?center_id=${1}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});

export const createUser = (user) => new Promise((resolve, reject) => {
    console.log(`user: ${user}`)
    console.log(user);
    
    axios.post(`${URL}/users`,user)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});