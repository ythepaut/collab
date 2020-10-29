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


// TODO remove temp var
let collabContent = {
    text : ""
}


// creating socket.io listeners
io.on("connection", (socket) => {

    // debug messages
    socket.emit("debug", "Connected with id " + socket.id + ".");
    socket.broadcast.emit("debug", "User " + socket.id + " joined.");
    console.log("User " + socket.id + " joined.");

    // sending collab content
    socket.emit("sync", collabContent);

    // handle collab update
    socket.on("update", (data) => {
        collabContent.text = data.text
        io.sockets.emit("update", data);
    })

    io.on("disconnect", () => {
        io.emit("debug", "User " + socket.id + " left.");
        console.log("User " + socket.id + " left.");
    });
});


// starting server
server.listen(process.env.PORT || 8000, () => {
    console.log("Server is now listening...");
});