module.exports = (callback) => {

    // TODO switch to mongodb ?
    const mysql = require("mysql");

    // credentials
    const con = mysql.createConnection({
        host     : "localhost",
        user     : "collab",
        password : "THIS_IS_A_LOCAL_PASSWD_Z2p[?{rG",
        database : "collab"
    });

    // connection
    con.connect((err) => {

        if (err) {
            callback(null);
            console.log("Database connection failed.");
        } else {
            console.log("Database connection initialized.");

            // table init
            const createTableQuery = "CREATE TABLE IF NOT EXISTS files (" +
                "id INT PRIMARY KEY NOT NULL AUTO_INCREMENT," +
                "value TEXT);";
            con.query(createTableQuery, (err, res) => {
                // TODO handle errors
            });


            // --- TODO (TO REMOVE) single file management
            const tempTruncateQuery = "TRUNCATE TABLE files;";
            con.query(tempTruncateQuery, (err, res) => {
            });
            const tempInsertQuery = "INSERT INTO files (value) VALUES (\"\");";
            con.query(tempInsertQuery, (err, res) => {
            });
            // ---

            callback(con);
        }
    });
};