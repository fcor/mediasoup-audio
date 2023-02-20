const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { config } = require("./config/index");

app.use(cors());

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);
  
  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
  });
});


server.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});