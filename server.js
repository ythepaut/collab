let express = require("express");
let app = express();


// setting view engine
app.set("view engine", "ejs");


// setting middlewares
app.use(express.static("static"));


// creating routes
app.get("/", ((req, res) => {
    res.render("index");
}));


// starting server
app.listen(8000, () => {
    console.log("Server is now listening...");
});