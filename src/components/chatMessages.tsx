import React, { useEffect, useState } from 'react';
import { Message } from '../types/types';

// Assuming you have the currentUserProfile available in this component
const currentUserProfile = {
  id: '1',
  // ... other user profile properties
};

const ChatMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Check for messages when the component mounts
    const message = window.localStorage.getItem(`messageFor_${currentUserProfile.id}`);

    if (message) {
      const messageType = message.startsWith("admin:") ? "admin-message" : "student-message";

      // Add the message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now(), // Use a unique ID
          type: messageType,
          text: message,
        },
      ]);

      // Clear the message from local storage
      window.localStorage.removeItem(`messageFor_${currentUserProfile.id}`);
    }
  }, []); // This effect runs once on component mount

  return (
    <div className="chat-box">
      {messages.map((message, index) => (
        <div key={index} className={message.type}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
