const jwt = require('jsonwebtoken');
const Parent = require('../models/parent');

const accessTokenSecret = 'mysupercoolsecret';

const authenticateParent = async (username, password) => {
    const user = await Parent.authenticateUser(username, password);
    if (user === null) {
        return user;
    }
    const parents = await Parent.findUserByUsername(username);
    console.log('Parents', parents);
    const accessToken = jwt.sign({ ...parents[0]}, accessTokenSecret);

    return accessToken;
    
}

const fetchAuthenticatedParent = async (user, username) => {
    if (user===null) {
        return user;
    }
    const parents = await Parent.findUserByUsername(username);
    console.log('Parents', parents);
    const accessToken = jwt.sign({...parents[0]}, accessTokenSecret);
    const result = await Parent.fetchUser(username);
    return result;
}

module.exports = {
    authenticateParent,
    fetchAuthenticatedParent
};