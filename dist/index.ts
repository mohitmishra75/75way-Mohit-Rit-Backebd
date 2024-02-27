import express, { Application } from "express";
import routes from "./Routes/routes";
import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

const app: Application = express();
const httpServer: Server = new Server(app);
const io: SocketIOServer = new SocketIOServer(httpServer);
app.use(cors());

// Parse JSON bodies
app.use(express.json());
const PORT: number = 3000;

// Define routes
app.use("/", routes);
let userdata;
io.on("connection", (socket) => {
  console.log("User Connected");
  console.log("ID", socket.id);
  socket.emit("welcome", ` hey! welcome to the server ${socket.id}`);
  socket.on("userJoined", (data) => {
    userdata = data;
    console.log(
      `${data.name} has joined with room id ${data.roomid} and user id ${data.uid}`
    );
    socket.join(data.roomid);
    socket.on("chatmessage", (message) => {
      console.log("message aaya ", message);
      socket.broadcast.to(data.roomid).emit("chatbackend", message);
    });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
