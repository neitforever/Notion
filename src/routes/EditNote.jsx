import { useCallback, useContext, useState, useRef } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import { Box, Button, Typography } from "@mui/material";

export const loader = async ({ params: { id } }) => {
  const note = await fetch(`http://localhost:5001/notes/${id}`).then((r) =>
    r.json()
  );
  return { note };
};

export default function EditNote() {
  const { user } = useContext(UserContext);
  const { note } = useLoaderData();
  const [NoteName, setNoteName] = useState(note.name);
  const [NoteText, setNoteText] = useState(note.noteText);
  const navigate = useNavigate();

  const handleSetNoteName = useCallback((e) => {
    setNoteName(e.target.value);
  }, []);

  const handleSetNoteText = useCallback((e) => {
    setNoteText(e.target.value);
  }, []);

  const handleSaveEditNote = async () => {
    try {
      const Note = {
        userId: note.userId,
        id: note.id,
        createdAt: note.createdAt,
        name: NoteName,
        noteText: NoteText,
      };
      await fetch(`http://localhost:5001/notes/${note.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Note),
      });

      navigate(`/home/notes/${user.id}`);
    } catch (err) {}
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
          <Typography variant="h3">Edit note</Typography>
        </Box>
        <Box></Box>
      </Box>
      <Box className="flex flex-col items-center w-8/12">
        <input
          placeholder="Name"
          value={NoteName}
          onChange={handleSetNoteName}
          className="border-black border-2 p-4 bg-slate-500 mb-2 h-12 w-full"
          maxLength={20}
        />

        <textarea
          placeholder="Note text..."
          value={NoteText}
          onChange={handleSetNoteText}
          className="border-black border-2 p-4 bg-slate-500 mb-2 h-60 w-full break-all resize-none overflow-y-hidden"
          maxLength={1200}
        />
        <Box className="mt-24">
          <Button
            variant="contained"
            onClick={handleSaveEditNote}
            className="mt-4"
          >
            <Typography className="pl-32 pr-32 pt-4 pb-4" variant="h4">
              Save
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
