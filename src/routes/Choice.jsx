import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "tailwindcss/tailwind.css";

export default function Choice() {
  return (
    <Box className="flex justify-center items-center h-screen w-screen">
      <Box className="w-1/2 flex justify-between">
        <Button component={NavLink} to="/login" variant="contained">
          <Typography className="pt-10 pb-10 pl-10 pr-10" variant="h4">
            Log In
          </Typography>
        </Button>
        <Button component={NavLink} to="/sign" variant="contained">
          <Typography className="pt-10 pb-10 pl-10 pr-10" variant="h4">
            Sign Up
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
