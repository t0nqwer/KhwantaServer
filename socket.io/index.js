import { Server } from "socket.io";
let io;

export const socketConnection = (server) => {
  io = new Server(server);
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

export const NotifyNewProduct = (data) => io.broadcast.emit("newProduct", data);
