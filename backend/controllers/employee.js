const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');


const accessTokenSecret = 'mysupercoolsecret';

const authenticateEmployee = async (username, password) => {
    const user = await Employee.authenticateUser(username, password);
    if (user === null) {
        return user;
    }
    const employees = await Employee.findUserByUsername(username);
    console.log('Employees', employees);
    const accessToken = jwt.sign({ ...employees[0]}, accessTokenSecret);

    return accessToken;
    
}

const fetchAuthenticatedEmployee = async (user, username) => {
    if (user===null) {
        return user;
    }
    const employees = await Employee.findUserByUsername(username);
    console.log('Employees', employees);
    const accessToken = jwt.sign({...employees[0]}, accessTokenSecret);
    const result = await Employee.fetchUser(username);
    return result;
}

module.exports = {
    authenticateEmployee,
    fetchAuthenticatedEmployee
};