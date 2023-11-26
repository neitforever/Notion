import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { z } from "zod";
import { User } from "../util/validation";
import { Box, Button, Typography } from "@mui/material";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const navigate = useNavigate();

  function handleRegister() {
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      User.parse({
        email,
        password,
      });
      setErrors({ email: null, password: null, confirmPassword: null });

      fetch("http://localhost:5001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          createdAt: Date.now(),
        }),
      })
        .then((response) => response.json())
        .then(() => {
          navigate("/login");
        })
        .catch(() => {
          setErrors({ general: "Registration failed. Please try again." });
        });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors({
          email: err.errors.find((error) => error.path[0] === "email") || null,
          password:
            err.errors.find((error) => error.path[0] === "password") || null,
          confirmPassword:
            err.errors.find((error) => error.path[0] === "confirmPassword")
              ?.message || null,
        });
      }
    }
  }

  return (
    <Box className="flex flex-col items-center">
      <Box className="w-8/12 mb-4 flex items-center justify-between mt-10">
        <Button component={NavLink} to="/" variant="contained">
          <Typography className="pt-1 pb-1" variant="h8">
            To choice
          </Typography>
        </Button>
        <Typography className="pr-16" variant="h3">
          Sign Up
        </Typography>
        <Box></Box>
      </Box>
      <Box className="w-full flex flex-col items-center justify-between">
        <Box className="flex flex-col items-center justify-center w-8/12 h-1/4  mb-12">
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-black border-2 p-4 bg-slate-500 h-12 w-full"
          />
          {errors.email && (
            <Box className="text-red-400 absolute top-44">
              <Typography variant="h5">{errors.email.message}</Typography>
            </Box>
          )}
        </Box>
        <Box className="flex flex-col items-center justify-center w-8/12 h-1/4  mb-12">
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-black border-2 p-4 bg-slate-500 mt-4  h-12 w-full"
          />
          {errors.password && (
            <Box className="text-red-400 absolute top-72">
              <Typography variant="h5">{errors.password.message}</Typography>
            </Box>
          )}
        </Box>

        <Box className="flex flex-col items-center justify-center w-8/12 h-1/4  mb-12">
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-black border-2 p-4 bg-slate-500 mt-4  h-12 w-full"
          />
          {errors.confirmPassword && (
            <Box className="text-red-400 absolute top-72">
              <Typography variant="h5">{errors.confirmPassword}</Typography>
            </Box>
          )}
        </Box>

        <Box className="mt-24">
          <Button variant="contained" onClick={handleRegister} className="mt-4">
            <Typography className="pl-32 pr-32 pt-4 pb-4" variant="h4">
              Sign Up
            </Typography>
          </Button>
          {errors.general && (
            <Box className="text-red-400">
              <Typography variant="h5">{errors.general}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
