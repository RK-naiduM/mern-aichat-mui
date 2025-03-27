import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button, CircularProgress, Paper } from "@mui/material";
import axios from "axios";

const Chatbot = ({ tier }) => {
  const [messages, setMessages] = useState(() => {
    // Load messages from sessionStorage when the component mounts
    const savedMessages = sessionStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // Save messages to sessionStorage whenever they change
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { sender: "user", text: input };
  const updatedMessages = [...messages, userMessage];
  setMessages(updatedMessages);
  sessionStorage.setItem("chatHistory", JSON.stringify(updatedMessages)); // Store in session storage

  setInput("");
  setIsLoading(true);

  try {
    const response = await axios.post(
      "http://52.86.234.22:5000/chat",
      { userQuery: input },
      {
        headers: { "x-auth-token": localStorage.getItem("token") },
      }
    );

    console.log("Bot Response:", response.data);

    const botMessage = {
      sender: "bot",
      text: response.data.reply || "No response from bot.",
    };
    
    const newMessages = [...updatedMessages, botMessage];
    setMessages(newMessages);
    sessionStorage.setItem("chatHistory", JSON.stringify(newMessages)); // Update session storage
  } catch (error) {
    console.error("Chatbot error:", error);
    const errorMessage = { sender: "bot", text: "Error retrieving response." };
    const newMessages = [...updatedMessages, errorMessage];
    setMessages(newMessages);
    sessionStorage.setItem("chatHistory", JSON.stringify(newMessages)); // Store even on error
  } finally {
    setIsLoading(false);
  }
};


  return (
    <Paper sx={{ padding: 3, display: "flex", flexDirection: "column", height: "450px", maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
        {tier} Chatbot
      </Typography>

      <Box sx={{ flexGrow: 1, overflowY: "auto", marginBottom: 2, paddingRight: 1 }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: msg.sender === "user" ? "row-reverse" : "row",
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                padding: 1.5,
                borderRadius: 2,
                backgroundColor: msg.sender === "user" ? "#1976d2" : "#e0e0e0",
                color: msg.sender === "user" ? "white" : "black",
                wordBreak: "break-word",
                boxShadow: 1,
              }}
            >
              <Typography variant="body1">{msg.text}</Typography>
            </Box>
          </Box>
        ))}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ marginBottom: 1 }}
          disabled={isLoading}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{ height: "100%" }}
          disabled={isLoading}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default Chatbot;
