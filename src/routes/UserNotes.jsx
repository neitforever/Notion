import React, { useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const loader = async ({ params: { id } }) => {
  const notes = await fetch(`http://localhost:5001/users/${id}/notes`).then(
    (r) => r.json()
  );
  return { notes };
};

export default function UserNotes() {
  const { notes } = useLoaderData();
  const [deletedNotes, setDeletedNotes] = useState([]);

  const handleDeleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5001/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setDeletedNotes([...deletedNotes, id]);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const sortedNotes = [...notes].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  return (
    <Box className="flex flex-col h-full w-full">
      <Box>
        <Typography className="flex flex-col items-center" variant="h3">
          NOTES
        </Typography>
      </Box>
      <Box className="flex flex-col items-center mb-24 mt-24">
        <Button
          component={NavLink}
          to="/home/notes/create-note/"
          variant="contained"
        >
          <Typography className="pl-24 pr-24 pt-2 pb-2" variant="h6">
            Add new note
          </Typography>
        </Button>
      </Box>
      <Box className="flex flex-col items-center">
        {sortedNotes.map((note) => {
          const date = new Date(note.createdAt);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          });

          if (!deletedNotes.includes(note.id)) {
            return (
              <Box
                className="mb-5  border-black border-2 p-4 w-8/12"
                key={note.id}
              >
                <Box className="flex flex-row w-full justify-between">
                  <NavLink to={`/home/notes/view-note/${note.id}`}>
                    <Box className="flex flex-row">
                      <Typography variant="h5" className="pr-4 font-bold">
                        {note.name}
                      </Typography>
                      <Typography variant="h5" className="pr-4 text-gray-500">
                        {formattedDate}
                      </Typography>
                    </Box>
                  </NavLink>
                  <Box>
                    <NavLink
                      className="pr-4"
                      to={`/home/notes/edit-note/${note.id}`}
                    >
                      <EditIcon fontSize="large" />
                    </NavLink>
                    <DeleteIcon
                      className=" cursor-pointer"
                      fontSize="large"
                      onClick={() => handleDeleteNote(note.id)}
                    />
                  </Box>
                </Box>
              </Box>
            );
          }
          return null;
        })}
      </Box>
    </Box>
  );
}
