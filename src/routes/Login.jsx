import React, { useContext, useState } from "react";
import { UserContext } from "../components/UserContextProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { User } from "../util/validation";
import { Box, Button, Typography } from "@mui/material";
import "tailwindcss/tailwind.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: null, password: null });

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogin() {
    try {
      User.parse({
        email,
        password,
      });
      setErrors({ email: null, password: null });

      const query = new URLSearchParams({ email, password }).toString();
      fetch(`http://localhost:5001/users?${query}`)
        .then((r) => r.json())
        .then((users) => {
          if (users.length > 0) {
            userContext.onChange(users[0]);
            navigate("/home");
          } else {
            setErrors({ email: { message: "Invalid user" }, password: null });
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
          setErrors({ general: "Login failed. Please try again." });
        })
        .finally(() => {
          if (
            errors.email === null &&
            errors.password === null &&
            errors.general === null
          ) {
            setErrors({ invalidUser: "Invalid email or password" });
          }
        });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors({
          email: err.errors.find((error) => error.path[0] === "email") || null,
          password:
            err.errors.find((error) => error.path[0] === "password") || null,
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
          Login
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
        <Box className="flex flex-col items-center justify-center w-8/12 h-1/4  mb-2">
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

        <Box className="mt-24">
          <Button variant="contained" onClick={handleLogin} className="mt-4">
            <Typography className="pl-32 pr-32 pt-4 pb-4" variant="h4">
              Login
            </Typography>
          </Button>
          {errors.invalidUser && (
            <Box className="text-red-400">
              <Typography variant="h5">{errors.invalidUser}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
