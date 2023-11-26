import { Box, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
export default function PageNotFound() {
  return (
    <Box className="w-screen h-screen flex flex-col items-center justify-center">
      <Typography variant="h2" className="pb-8">
        404
      </Typography>
      <Typography variant="h1" className="pb-8">
        Page not found
      </Typography>
      <Typography variant="h2" className="pb-44">
        Go to page:
        <NavLink className=" text-red-400 ml-4" to="/home" end={true}>
          Home
        </NavLink>
      </Typography>
    </Box>
  );
}
