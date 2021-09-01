'use strict';
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo)
    return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
  
    const dataAccessMethod = () => {
        let ageToCount = {};
        
        // Get all usernames that contains the matching item
        let usernames = _.keys(db.itemsOfUserByUsername).filter((username) => {
            return db.itemsOfUserByUsername[username].includes(item);
        });
      
        // Get age for each username
        usernames.forEach((username) => {
            let user = _.find(db.usersById, (user) => {
                return user.username === username
            })

            if (user) {
                // If found add to list and increment count
                ageToCount[user.age] = ageToCount[user.age] ? ++ageToCount[user.age] : 1
            }
        });

        return ageToCount;
    }
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith
};
