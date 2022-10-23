var express = require("express");
const app = express();
const cors = require('cors')
const server = require("http").createServer(app);
const PORT = process.env.PORT || 4000
const socketIo = require("./socket.io")

app.use(cors({
  origin: '*'
}));
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

socketIo.connect(server)

server.listen(PORT, () => (console.log("server is running on port : " + PORT)));



app.get("/", function (req, res) {
  res.render("index");
});

app.get("/chat", function (req, res) {
  res.render("chat");
});
