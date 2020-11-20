let http = require("http"),
    express = require("express"),
    path = require("path"),
    socketio = require("socket.io");
let app = express(),
    server = http.createServer(app),
    io = socketio(server);


// setting view engine
app.set("view engine", "ejs");


// setting routes
new (require("./helper/service"))(app, express, path);


// app initialization (database + socket)
require("./helper/db")((db) => require("./helper/connections")(io, db, (file) => {
    // TODO move from server.js
    function syncToDB() {
        const updateQuery = "UPDATE files SET body = '" + file.body + "' WHERE id = 1;"; //TODO prevent SQL injections
        db.query(updateQuery);
        console.log("File synchronized.");
    }
    setInterval(syncToDB, 300000);
}));


// starting server
server.listen(process.env.PORT || 8000, () => {
    console.log("Server is now listening...");
});
