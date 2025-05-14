import { Server } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    console.log("init SocketService constructor");
    this._io = new Server();
  }

  get io() {
    return this._io;
  }

  public initListeners() {
    this._io.on("connect", (socket) => {
      console.log("new User Connected ", socket);
    });
  }
}

export const socketService = new SocketService();