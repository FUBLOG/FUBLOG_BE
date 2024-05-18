const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected");
});
io.on("disconnect", (socket) => {
  console.log("a user disconnected");
});

module.exports = { app, io, server };
