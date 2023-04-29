const db = require('../helpers/db');
const uuidv4 = require('uuid').v4;


function newSession(user) {

	var sessionId = uuidv4();

    // add session id to db
    sql = "UPDATE User SET session='" + sessionId + "' WHERE username='" + user + "';";
    db.connection.query(sql, function (err, result) {
        if (err) throw err;
    });

    return sessionId;
}

// checks a sessionid and return the username, if it is valid. else: return undefined
function checkSessionId(check) {
    if (check == undefined) return undefined;
    let sql = "SELECT * FROM User WHERE session='" + check +  "' LIMIT 1;";
    
    return new Promise((resolve, reject) => {
      db.connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result[0]);
        }
      });
    });
}

module.exports = {
    newSession,
    checkSessionId
};