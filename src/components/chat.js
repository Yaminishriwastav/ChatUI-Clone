import React, { useState, useEffect } from "react";
import Message from "./Message";
import { getAnswer } from "./questionhandler";
import "../style/chat.css";

const Chat = ({ setIsLoggedIn, user }) => {
  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("chatHistory")) || {};
  });
  const [input, setInput] = useState("");
  const [currentChat, setCurrentChat] = useState(() => {
    return localStorage.getItem("currentChat") || `chat-${Date.now()}`;
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const loggedInUser = user || JSON.parse(localStorage.getItem("loggedInUser")) || {};

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
    localStorage.setItem("currentChat", currentChat);
    localStorage.setItem("darkMode", darkMode);
  }, [messages, currentChat, darkMode]);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const currentChatMessages = Array.isArray(messages[currentChat]) ? messages[currentChat] : [];
  
    // ✅ Update chat with user message
    const updatedChat = {
      ...messages,
      [currentChat]: [...currentChatMessages, { text: input, sender: "user" }],
    };
  
    setMessages(updatedChat);
    setInput("");
  
    // ✅ Get the bot response
    const botResponse = getAnswer(input);
  
    if (botResponse === "I couldn't find an answer. Try searching on Google.") {
      // ✅ Show an alert for Google search
      const searchChoice = window.confirm(
        "I couldn't find an answer. Do you want to search on Google?"
      );
  
      if (searchChoice) {
        // ✅ Open Google Search
        window.open(`https://www.google.com/search?q=${encodeURIComponent(input)}`, "_blank");
      }
    } else {
      // ✅ Add bot response to chat
      setTimeout(() => {
        setMessages({
          ...updatedChat,
          [currentChat]: [...updatedChat[currentChat], { text: botResponse, sender: "bot" }],
        });
      }, 1000);
    }
  };

  const handleNewChat = () => {
    const newChatID = `chat-${Date.now()}`;
  
    // ✅ Add welcome message when starting a new chat
    setMessages({
      ...messages,
      [newChatID]: [],
    });
  
    setCurrentChat(newChatID);
  };

  const deleteChat = (chatID) => {
    const updatedChats = { ...messages };
    delete updatedChats[chatID];
    setMessages(updatedChats);
    if (currentChat === chatID) {
      setCurrentChat(Object.keys(updatedChats)[0] || `chat-${Date.now()}`);
    }
  };

  const deleteAllChats = () => {
    setMessages({});
    setCurrentChat(`chat-${Date.now()}`);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className={`chat-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h3>Previous Chats</h3>
          <button className="close-sidebar" onClick={toggleSidebar}>×</button>
        </div>
        <button className="new-chat" onClick={handleNewChat}>+ New Chat</button>
        <div className="chat-list">
          {Object.keys(messages).length > 0 ? (
            Object.keys(messages).map((chatID) => (
              <div key={chatID} className="chat-item-container">
                <button className="chat-item" onClick={() => setCurrentChat(chatID)}>
                  {messages[chatID]?.[0]?.text?.substring(0, 20) || "Untitled Chat"}
                </button>
                <button className="delete-chat" onClick={() => deleteChat(chatID)}>🚮</button>
              </div>
            ))
          ) : (
            <p className="no-chats">No previous chats</p>
          )}
        </div>

        {Object.keys(messages).length > 0 && (
          <button className="delete-all" onClick={deleteAllChats}>Delete All Chats</button>
        )}

        {/* ✅ Account Section */}
        <div className="account-section">
          <h4>Account</h4>
          <p><strong>Email:</strong> {loggedInUser.email ? loggedInUser.email : "N/A"}</p>
          <button className="logout" onClick={() => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("loggedInUser");
            setIsLoggedIn(false);
          }}>
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      {!sidebarOpen && (
        <button className="open-sidebar" onClick={toggleSidebar}>☰</button>
      )}

      {/* Main Chat Section */}
      <div className="chat-box">
        <div className="chat-header">
          <h2>ChatGPT Clone</h2>
          <div className="header-buttons">
            <button className="toggle-mode" onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        <div className="chat-messages">
          {messages[currentChat] && messages[currentChat].length > 0 ? (
            messages[currentChat].map((msg, index) => (
              <Message key={index} text={msg.text} sender={msg.sender} />
            ))
          ) : (
            <div className="welcome-message">Hi! How can I help you today?</div>
          )}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            onFocus={() => setMessages((prev) => {
              const updated = { ...prev };
              if (updated[currentChat]?.length === 0) {
                delete updated[currentChat];
              }
              return updated;
            })}
            placeholder="Type a message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
