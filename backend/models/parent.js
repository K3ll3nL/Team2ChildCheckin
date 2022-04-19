const knex = require('../database/knex');
const bcrypt = require('bcrypt');

const PARENT_TABLE = 'parent';

const addParent = async (username, password) => {
    const results = knex(PARENT_TABLE).insert({ username, password});
    const result = await results;
    return result;
}

const findParentByUsername = async (username) => {
    const query = knex(PARENT_TABLE).where({ username });
    const result = await query;
    return result;
}

const authenticateParent = async (username, password) => {
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

module.exports = {
    authenticateParent,
    findParentByUsername,
    addParent
}