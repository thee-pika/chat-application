"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socketContext = React.createContext<SocketContextType | null>(null);

interface SocketProviderProps {
  children: React.ReactNode;
}

interface SocketContextType {
  sendMessage: (message: string) => void;
  messages: string[];
}

export const useSocket = () => {
  const state = useContext(socketContext);

  if (!state) {
    throw new Error("SocketContext must be used within a SocketProvider");
  }

  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = React.useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);

  const onMessageRec = useCallback((message: string) => {
    setMessages((prev) => [...prev, message]);
    console.log("Message Received ...", message);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    console.log("Trying TO Connect Socket  ...", _socket);
    setSocket(_socket);

    _socket.on("message", (message: string) => {
      console.log("Message Received ...", message);
      onMessageRec(message);
    });

    return () => {
      _socket.disconnect();
      _socket.off("message", onMessageRec);
      setSocket(undefined);
    };
  }, []);

  const sendMessage: SocketContextType["sendMessage"] = useCallback(
    (msg) => {
      console.log("Message sending in socket :< ...", msg);
      console.log("Socket Object ...", socket);

      if (!socket) {
        console.log("Socket is not initialized");
        return;
      }

      socket.emit("event:message", { message: msg });
    },
    [socket]
  );

  return (
    <socketContext.Provider value={{ sendMessage , messages }}>
      {children}
    </socketContext.Provider>
  );
};
