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
                "body TEXT);";
            con.query(createTableQuery, () => {
            });


            // --- TODO (TO REMOVE) single file management
            const selectQuery = "SELECT body FROM files WHERE id = 1;";
            con.query(selectQuery, (err, res) => {
                if (res.length === 0) {
                    const tempTruncateQuery = "TRUNCATE TABLE files;";
                    con.query(tempTruncateQuery, () => {
                        const tempInsertQuery = "INSERT INTO files (body) VALUES (\"\");";
                        con.query(tempInsertQuery, () => {
                            callback(con);
                        });
                    });
                } else {
                    callback(con);
                }
            });
            // ---

            //callback(con);
        }
    });
};