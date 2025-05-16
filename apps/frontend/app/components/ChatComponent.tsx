"use client";
import { useSocket } from "@/context/SocketProvider";
import React, { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const ChatComponent = () => {
  const [message, setMessage] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [allMessages, setAllMessage] = useState<string[]>([]);

  const { sendMessage, messages, createRoom } = useSocket();

  useEffect(() => {
    console.log("Messages from Socket ...", messages);
    if (messages && messages.length > 0) {
      console.log("All Messages messages ...", messages);
      // allMessages.push(messages[messages.length - 1]);
      setAllMessage(messages);
      console.log("All Messages ...", allMessages);
    }
  }, [allMessages, messages]);

  const handleSendMessage = () => {
    console.log("Message Sent ...", message);
    if (message.trim() === "") {
      return;
    }
    setMessage("");
    handleCreateRoom();
    sendMessage(message);
  };

  const handleCreateRoom = () => {
    if (room.trim() === "" || message.trim() === "") {
      console.log(
        "room.trim() ",
        room.trim(),
        "message.trim()",
        message.trim()
      );
      return;
    }
    const roomId = `${room}-${uuidV4()}`;
    console.log("roomId", roomId);
    console.log("message", message);
    createRoom(roomId, message);
  };

  return (
    <div>
      <div className=" mx-auto flex mt-12 ">
        <input
          type="text"
          placeholder="Type your message here..."
          className="border p-2 rounded "
          onChange={(e) => setMessage(e.target.value)}
        />
         <input
          type="text"
          placeholder="Type your message here..."
          className="border p-2 rounded "
          onChange={(e) => setRoom(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white rounded mt-2 p-4 px-4"
          onClick={handleSendMessage}
        >
          Send Message
        </button>
      </div>
      {/* <div className=" mx-auto flex mt-12 ">
        
        <button
          className="bg-blue-500 text-white rounded mt-2 p-4 px-4"
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
      </div> */}
      <div>
        {allMessages && allMessages.length > 0 ? (
          allMessages.map((msg, index) => (
            <div key={index} className="bg-gray-200 p-2 rounded mt-2">
              {msg}
            </div>
          ))
        ) : (
          <div className="bg-gray-200 p-2 rounded mt-2">No messages yet.</div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
