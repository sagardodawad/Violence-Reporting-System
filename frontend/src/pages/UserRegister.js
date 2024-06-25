/** @format */

import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Validates Indian phone numbers
    return phoneRegex.test(phoneNumber);
  };

  const validateFields = () => {
    const newErrors = {};

    if (!userName.trim()) {
      newErrors.userName = "Username is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (password !== verifyPassword) {
      newErrors.verifyPassword = "Passwords do not match.";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!isValidPhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/auth/signup", {
        userName,
        email,
        password,
        phoneNumber,
      });
      console.log("User registered successfully:", response.data);
      alert("Registration successful! Please login.");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Error registering user: ${
          error.response
            ? error.response.data.message || "Internal Server Error"
            : error.message
        }`
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <TextField
          label="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.userName}
          helperText={errors.userName}
          autoComplete="off"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
           autoComplete="off"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
           autoComplete="off"
        />
        <TextField
          label="Verify Password"
          type="password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.verifyPassword}
          helperText={errors.verifyPassword}
           autoComplete="off"
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
           autoComplete="off"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          fullWidth
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default UserRegister;
