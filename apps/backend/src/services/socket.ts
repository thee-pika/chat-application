import { Server } from "socket.io";
import Redis from "ioredis";
import { produceMessage } from "./kafka";

const pub = new Redis({
  host: "localhost",
  port: 6379,
});

const sub = new Redis({
  host: "localhost",
  port: 6379,
});

class SocketService {
  private _io: Server;

  constructor() {
    console.log("init SocketService constructor");
    this._io = new Server({
      cors: {
        origin: "*",
        allowedHeaders: ["*"],
      },
    });
    sub.subscribe("MESSAGES");
  }

  get io() {
    return this._io;
  }

  public initListeners() {
    this._io.on("connect", (socket) => {
      console.log("new User Connected ", socket.id);
      socket.on("event:message", async ({ message }) => {
        console.log("Message Received ...", message);
        await pub.publish("MESSAGES", message);
        // this._io.emit("message", message);
      });
    });

    sub.on("message", (channel, message) => {
      console.log("Message Received from Redis ...", message);
      if (channel === "MESSAGES") {
        console.log("Message Received from Redis ...", message);
        this._io.emit("message", message);
        produceMessage(message);
        
      }
    });
  }
}

export const socketService = new SocketService();
