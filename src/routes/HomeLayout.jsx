import React, { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import { NavLink, Outlet } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { Box, Divider, Typography } from "@mui/material";
export default function HomeLayout() {
  const { user } = useContext(UserContext);
  console.log(user.id);
  return (
    <div className="flex flex-col h-screen w-screen justify-between">
      <header className="flex justify-between py-8">
        <Typography variant="h6" className="pl-10">
          Hello, {user.email}
        </Typography>
        <Typography>
          <NavLink
            to="/home/about/"
            end={true}
            className="pr-10 text-gray-600 font-semibold text-lg transition duration-300 hover:text-gray-800"
          >
            About
          </NavLink>
          <NavLink
            to={`/home/notes/${user.id}`}
            end={true}
            className="pr-10 text-gray-600 font-semibold text-lg transition duration-300 hover:text-gray-800"
          >
            Notes
          </NavLink>
          <NavLink
            to="/login/"
            end={true}
            className="pr-10 text-gray-600 font-semibold text-lg transition duration-300 hover:text-gray-800"
          >
            Log out
          </NavLink>
        </Typography>
      </header>
      <main className="flex-grow py-8">
        <Outlet />
      </main>
      <footer>
        <Divider className="bg-black" />
        <Box className="flex justify-around py-4">
          <Typography variant="h6" className="text-gray-600">
            Created by: Vlad Ptuashko
          </Typography>
          <Typography variant="h6" className="text-gray-600">
            BSU: 2023
          </Typography>
        </Box>
      </footer>
    </div>
  );
}
