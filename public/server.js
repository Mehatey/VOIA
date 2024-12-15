
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Serve static files from the "public" folder
app.use(express.static("public"));

// WebSocket logic
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("newMessage", (message) => {
    console.log("Message received:", message);
    io.emit("newMessage", message); // Broadcast message to all clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
