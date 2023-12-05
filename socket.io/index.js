import { Server } from "socket.io";
import { updateConnectionId, deleteConnectionId } from "./Func.js";

const PORT = 7070;
export let io = new Server(PORT);
io.close();

io.on("connection", (socket) => {
  socket.on("connectname", (data) => {
    updateConnectionId(data, socket.id);
  });

  socket.on("disconnect", () => {
    deleteConnectionId(socket.id);
  });
});

export const NotifyNewProduct = (data) => io.broadcast.emit("newProduct", data);
