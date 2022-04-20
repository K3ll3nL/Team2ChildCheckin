//const bcrypt = require('bcrypt');
//const { hash } = require('bcrypt');

const PARENT_TABLE = 'parent';

const addParent = async (username, password, email) => {

    const results = knex(PARENT_TABLE).insert({ username, password, email});
    const result = await results;
    return result;
}

const findParentByUsername = async (username) => {
    const query = knex(PARENT_TABLE).where({ username });
    const result = await query;
    return result;
}

const fetchParent = async (username) => {
    const query = knex(EMPLOYEE_TABLE).where({username});
    const result = await query;
    return result;
}

const authenticateParentUser = async (username, password) => {
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

module.exports = {
    authenticateParentUser,
    findParentByUsername,
    addParent,
    fetchParent
}