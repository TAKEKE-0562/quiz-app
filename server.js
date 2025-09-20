const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// "public" フォルダを配信
app.use(express.static(__dirname + "/public"));

let buzzed = false;

io.on("connection", (socket) => {
  console.log("参加:", socket.id);

  socket.on("buzz", () => {
    if (!buzzed) {
      buzzed = true;
      io.emit("buzzed", { user: socket.id });
    }
  });

  socket.on("reset", () => {
    buzzed = false;
    io.emit("reset");
  });
});

// Render用のPORT設定
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});


