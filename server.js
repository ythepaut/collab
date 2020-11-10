let http = require("http"),
    express = require("express"),
    path = require("path"),
    socketio = require("socket.io");
let app = express(),
    server = http.createServer(app),
    io = socketio(server);


// setting view engine
app.set("view engine", "ejs");


// setting static folder
app.use(express.static(path.join(__dirname, "static")));


// creating routes
app.get("/", (req, res) => {
    res.render("index");
});


// app initialization (database + socket)
require("./helper/db")((db) => require("./helper/connections")(io, db));


// starting server
server.listen(process.env.PORT || 8000, () => {
    console.log("Server is now listening...");
});
