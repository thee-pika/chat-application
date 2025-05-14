"use client";
import React, { useCallback } from "react";

const socketContext = React.createContext<SocketContextType | null>(null);

interface SocketProviderProps {
  children: React.ReactNode;
}

interface SocketContextType {
    sendMessage : (message: string) => void;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const sendMessage: SocketContextType["sendMessage"] = useCallback((msg) => {
        console.log("Message Received ...", msg);
    }, [])
  return (
    <socketContext.Provider value={{sendMessage}}>{children}</socketContext.Provider>
  );
};
