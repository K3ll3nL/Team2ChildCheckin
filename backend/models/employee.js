const knex = require('../db/knex');
//const bcrypt = require('bcrypt');

const EMPLOYEE_TABLE = 'employee';

const addEmployee = async (username, password, email) => {
    // console.log('Raw password:', password);
    // const salt = await bcrypt.genSalt(10);
    // console.log('Password salt', salt);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // console.log('Hashed password', hashedPassword);
    const results = knex(EMPLOYEE_TABLE).insert({ username, password, email});
    const result = await results;
    return result;
}

const findUserByUsername = async (username) => {
    const query = knex(EMPLOYEE_TABLE).where({ username });
    const result = await query;
    return result;
}

const authenticateEmployee = async (username, password) => {
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
    // const validPassword = await bcrypt.compare(password, user.password);
    // if (validPassword) {
    //     delete user.password;
    //     return user;
    // }
    // return null;
}

module.exports = {authenticateEmployee, findUserByUsername, addEmployee}