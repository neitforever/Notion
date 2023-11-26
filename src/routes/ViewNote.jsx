import { useContext, useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const loader = async ({ params: { id } }) => {
  const note = await fetch(`http://localhost:5001/notes/${id}`).then((r) =>
    r.json()
  );
  return { note };
};

export default function ViewNote() {
  const { user } = useContext(UserContext);
  const { note } = useLoaderData();
  const navigate = useNavigate();
  const [deletedNotes, setDeletedNotes] = useState([]);

  const handleDeleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5001/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate(`/home/notes/${user.id}`);
      setDeletedNotes([...deletedNotes, id]);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

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
          <Typography variant="h3">{note.name}</Typography>
        </Box>
        <Box>
          <NavLink
            className="pr-4"
            to={`/home/notes/edit-note/${note.id}`}
            end={true}
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
      <Box className="flex flex-col items-center w-8/12">
        <Typography className="border-black border-2 p-4 bg-slate-500 mb-2 w-full break-all h-auto">
          {note.noteText}
        </Typography>
      </Box>
    </Box>
  );
}
