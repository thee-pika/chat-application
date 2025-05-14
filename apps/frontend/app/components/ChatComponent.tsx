"use client";
import { useSocket } from "@/context/SocketProvider";
import React, { useEffect, useState } from "react";

const ChatComponent = () => {
  const [message, setMessage] = useState<string>("");
  const [allMessages] = useState<string[]>([]);

  const { sendMessage , messages } = useSocket();

  useEffect(() => {
    console.log("Messages from Socket ...", messages);
    if (messages && messages.length > 0) {
      allMessages.push(messages[messages.length - 1]);
      console.log("All Messages ...", allMessages);
    }
  }, [allMessages, messages]);

  const handleSendMessage = () => {
    console.log("Message Sent ...", message);
    if (message.trim() === "") {
      return;
    }
    sendMessage(message);
  };

  return (
    <div>
      <div className=" mx-auto flex ">
        <input
          type="text"
          placeholder="Type your message here..."
          className="border p-2 rounded "
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded mt-2 p-4 px-4"
          onClick={handleSendMessage}
        >Send Message</button>
      </div>
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
