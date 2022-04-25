import axios from 'axios'
const apiEndpoint = `http://0.0.0.0:8000/parents/parent_id/kids`;
const URL = "http://localhost:8000";

export const getKids = (parent_id) => new Promise((resolve, reject) => {

    axios.get(`${URL}/parents/parent_id/kids?parent_id=${parent_id}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });

});

export const getDaycare = (daycare_id) => new Promise((resolve, reject) => {

    
    axios.get(`${URL}/centers/${daycare_id}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });

});


export const createUser = (user) => new Promise((resolve, reject) => {
    console.log(`user: ${user}`)
    // console.log(user);

    axios.post(`${URL}/users`, user)
        .then(x => {
            // console.log(x.data);   
            resolve(x.data)

        })
        .catch(x => {
            alert(x);
            reject(x);
        });

});

export const login = (user) => new Promise((resolve, reject) => {
    console.log(`user: ${user}`)
    // console.log(user);

    axios.post(`${URL}/login`, user)
        .then(x => {
            // console.log(x.data);   
            resolve(x.data)

        })
        .catch(x => {
            // alert(x);
            reject(x);
        });

});
export const removeDaycare = (parent_id) => new Promise((resolve, reject) => {
    const config = {
        body: {
            "parent_id": parent_id
        }
    }
    // console.log(config.body);
    axios.put(`${URL}/parents/parent_id/removeCenter`, config.body)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const addDaycare = (parent_id,center_id) => new Promise((resolve, reject) => {
    const config = {
        body: {
            "parent_id": parent_id,
            "center_id": center_id
        }
    }
    // console.log(config.body);
    axios.put(`${URL}/parents/parent_id/updateCenter`, config.body)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getDaycareID = (parent_id) => new Promise((resolve, reject) => {
    
    // console.log(config.body);
    axios.get(`${URL}/centerByParent_id?parent_id=${parent_id}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});