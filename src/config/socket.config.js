const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const { readMessageFromConversation } = require("../repository/conversation.repo");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;
  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
  socket.on("typing", (receiverId) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", true);
    }
    
  });

  socket.on("ping", async (conversationId) => {
    await readMessageFromConversation({conversationId})
  });

});

module.exports = { app, io, server, getReceiverSocketId };
