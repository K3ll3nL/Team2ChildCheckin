import axios from 'axios'
const URL ="sampledockercompose.c5kfaihzo8iz.us-east-2.rds.amazonaws.com:8000";

export const getDaycares = () => new Promise((resolve, reject) => {
    
    axios.get(`${URL}/centers/`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});