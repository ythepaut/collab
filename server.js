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


// database connection
require("./helper/db")(() => {});


// TODO remove temp var
let body = "";

let socks = [];

// creating socket.io listeners
io.on("connection", (socket) => {

    // add to socket list
    socks.push(socket);

    // debug messages
    socket.emit("debug", "Connected with id " + socket.id + ".");
    socket.broadcast.emit("debug", "User " + socket.id + " joined.");
    console.log("User " + socket.id + " joined.");

    // sending collab content
    socket.emit("sync", {body : body});

    socket.on("resync", (data) => {
        body = data;
    })

    // handle collab update
    socket.on("update", (op) => {
        if (["+input", "+delete", "paste", "undo", "redo"].indexOf(op.origin) !== -1) {
            socks.forEach((sock) => {
                if (sock !== socket)
                    sock.emit("update", op);
            });
        }
    })

    io.on("disconnect", () => {

        // remove from socket list
        const index = socks.indexOf(socket);
        if (index !== -1) {
            socks.splice(index, 1);
        }

        io.emit("debug", "User " + socket.id + " left.");
        console.log("User " + socket.id + " left.");
    });
});


// starting server
server.listen(process.env.PORT || 8000, () => {
    console.log("Server is now listening...");
});
