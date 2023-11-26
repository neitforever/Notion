import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import { Box, Button, Typography } from "@mui/material";
import "tailwindcss/tailwind.css";

export default function CreateNote() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [noteText, setNoteText] = useState("");

  function handleCreateNote() {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    fetch("http://localhost:5001/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        noteText,
        userId: userId,
        createdAt: Date.now(),
      }),
    })
      .then((response) => response.json())
      .then((createdNote) => {
        console.log("Note created:", createdNote);
        navigate(`/home/notes/${user.id}`);
      })
      .catch((error) => {
        console.error("Note creation failed:", error);
      });
  }

  return (
    <Box className="flex flex-col items-center">
      <Box className="w-8/12 mb-4 flex items-center justify-between">
        <Button
          component={NavLink}
          to={`/home/notes/${user.id}`}
          variant="contained"
        >
          <Typography className="pt-1 pb-1" variant="h8">
            Back
          </Typography>
        </Button>
        <Box className="pr-16">
          <Typography variant="h3">Create new note</Typography>
        </Box>
        <Box></Box>
      </Box>
      <Box className="flex flex-col items-center w-8/12">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-black border-2 p-4 bg-slate-500 mb-2 h-12 w-full"
          maxLength={20}
        />
        <textarea
          placeholder="Note text..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="border-black border-2 p-4 bg-slate-500 mb-2 h-60 w-full break-all resize-none overflow-y-hidden"
          maxLength={1200}
        />
        <Box className="mt-24">
          <Button
            variant="contained"
            onClick={handleCreateNote}
            className="mt-4"
          >
            <Typography className="pl-32 pr-32 pt-4 pb-4" variant="h4">
              Create
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
