import axios from 'axios'
const URL ="3.145.96.3:8000";

export const getDaycares = () => new Promise((resolve, reject) => {
    
    axios.get(`${URL}/centers/`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
    
});