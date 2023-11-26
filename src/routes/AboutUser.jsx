import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import { Box, Button, Typography } from "@mui/material";
import "tailwindcss/tailwind.css";

export default function AboutUser() {
  const { user } = useContext(UserContext);
  const date = new Date(user.createdAt);
  const formattedTime = date.toLocaleString();

  return (
    <Box className="flex flex-col justify-between h-full w-full">
      <Box className="flex flex-col items-center mt-6 ">
        <Typography variant="h3">About me</Typography>
      </Box>
      <Box className="flex flex-col items-center">
        <Box className="flex items-center gap-4">
          <Typography variant="h4">Email:</Typography>
          <Typography variant="h5" className="text-gray-500">
            <Link to={user.email} target="_blank" rel="noopener noreferrer">
              {user.email}
            </Link>
          </Typography>
        </Box>

        <Box className="flex items-center gap-4 mt-4 ">
          <Typography variant="h4">Date sign up:</Typography>
          <Typography variant="h5" className="text-gray-500">
            {formattedTime}
          </Typography>
        </Box>
      </Box>
      <Box className="flex flex-col items-center mb-8 ">
        <Button
          component={Link}
          to={`/home/notes/${user.id}`}
          variant="contained"
        >
          <Typography className="pl-12 pr-12 pt-2 pb-2" variant="h6">
            Go to notes
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
