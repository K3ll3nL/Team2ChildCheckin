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

export const updateKid =(kid) => new Promise((resolve,reject) => {

    axios.put(`${URL}/kids/${kid.child_id}`,kid)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });    

});

export const updateEmployeeRoom = (employee) => new Promise((resolve,reject) => {

    axios.put(`${URL}/employees/${employee.employee_id}`,employee)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });    

});

export const getNotesByKidId = (kidId) => new Promise((resolve,reject) => {

    axios.get(`${URL}/notes/${kidId}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });    

});