const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    database: 'ponyfarm'
});

/**
 * Connect to the database
 */
function connect() {
    connection.connect(error => {
        if (error) {
            throw error;
        }
    
        console.log('Successfully connected to DB');
    });
}

/**
 * Query the database
 * @param {string} query SQL query
 * @returns Promise that resolves with the queried data on success
 */
function query(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            resolve(res);
        });
    });
}

module.exports = {
    connect,
    connection,
    query
};
