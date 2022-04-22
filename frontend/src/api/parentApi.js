import axios from 'axios'
const apiEndpoint = `http://0.0.0.0:8000/parents/parent_id/kids`;
const URL ="http://localhost:8000";

export const getKids = () => new Promise((resolve, reject) => {
    
    console.log("here")
    axios.get(`${URL}/parents/parent_id/kids?parent_id=${2}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});

export const getDaycare = () => new Promise((resolve, reject) => {
    
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
export const removeDaycare = () => new Promise((resolve, reject) => {
    const config={
        body:{
            "parent_id":2
        }
    }
    console.log(config.body);
    axios.put(`${URL}/parents/parent_id/removeCenter`,config.body)