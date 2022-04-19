const knex = require('../database/knex');
const bcrypt = require('bcrypt');

const EMPLOYEE_TABLE = 'employee';

const addEmployee = async (username, password) => {
    const results = knex(EMPLOYEE_TABLE).insert({ username, password});
    const result = await results;
    return result;
}

const findUserByUsername = async (username) => {
    const query = knex(EMPLOYEE_TABLE).where({ username });
    const result = await query;
    return result;
}

const authenticateUser = async (username, password) => {
    //console.log('in function');
    const users = await findUserByUsername(username);
    console.log('Results of users query', users);
    if (users.length === 0) {
        console.error(`No users matched the username: ${username}`);
        return false;
    }
    const user = users[0];
    if (password === user.password){
        delete user.password;
        return user;
    }
    return null;
}

module.exports = {authenticateUser, findUserByUsername, addEmployee}