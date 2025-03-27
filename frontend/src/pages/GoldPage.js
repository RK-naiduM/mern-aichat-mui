import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Container, Paper } from "@mui/material";
import Chatbot from "../components/Chatbot";
import UserMenu from "../components/UserMenu"; 
import { motion } from "framer-motion"; // Import Framer Motion for animations

const GoldPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || user?.tier !== "Gold") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right,rgb(237, 216, 100),rgb(223, 212, 82))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <UserMenu />

        {/* Animated Box with Glassmorphism Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={10}
            sx={{
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              padding: 4,
              borderRadius: 3,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#fff",
                textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              Welcome to the Gold Page
            </Typography>
            <Typography
              variant="h6"
              color="white"
              paragraph
              sx={{ opacity: 0.8 }}
            >
              You have Gold-level access.
            </Typography>
            <Chatbot tier="Gold" />
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};


export default GoldPage;
