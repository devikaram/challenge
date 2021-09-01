'use strict';
const mockDBCalls = require('../database/index.js');

const getUsersHandler = async (request, response) => {
    let data 
    try {
        data = await mockDBCalls.getUsers()
    } catch (error) {
        return response.status(400).json({error: error.toString()});
    }
    return response.status(200).send(JSON.stringify(data));
};

module.exports = (app) => {
    app.get('/users', getUsersHandler);
};
