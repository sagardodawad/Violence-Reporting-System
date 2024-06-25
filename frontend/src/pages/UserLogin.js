/** @format */

import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios";
// import { api } from "./api";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8081/auth/login", {
        email,
        password,
      });
      console.log("Logged in successfully:", response.data);

      const token = response.data.token;
      const userResponse = await axios.get("http://localhost:8081/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = userResponse.data;

      // Store the user role and token in local storage
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("token", token);

      if (user.role === "ADMIN") {
        navigate("/admin-dashboard");
        window.location.reload();
      } else {
        navigate("/report-violence");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid email or password!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{width:"100%"}}>
      <Box mt={4}>
    
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default UserLogin;
