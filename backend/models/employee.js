
const EMPLOYEE_TABLE = 'employee';

// const addEmployee = async (username, password, email) => {
//     const results = knex(EMPLOYEE_TABLE).insert({ username, password, email});
//     const result = await results;
//     return result;
// }

const findEmployeeByUsername = async (username) => {
    const query = await this.query('SELECT * FROM employee WHERE username = ?', [username]);
    const result = await query;
    return result;
}

// const fetchEmployee = async (username) => {
//     const query = knex(EMPLOYEE_TABLE).where({username});
//     const result = await query;
//     return result;
// }

// const fetchAllEmployees = async () => {
//     const query = knex(EMPLOYEE_TABLE);
//     const result = await query;
//     return result;
// }

const authenticateEmployeeUser = async (username, password) => {
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

module.exports = {authenticateEmployeeUser, findEmployeeByUsername}