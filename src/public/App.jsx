import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../routes/Login.jsx";
import AboutUser from "../routes/AboutUser.jsx";
import UserContextProvider from "../components/UserContextProvider.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import UserNotes, { loader as notesLoader } from "../routes/UserNotes.jsx";
import Choice from "../routes/Choice.jsx";
import SignUp from "../routes/SignUp.jsx";
import CreateNote from "../routes/CreateNote.jsx";
import EditNote, { loader as noteEditLoader } from "../routes/EditNote.jsx";
import HomeLayout from "../routes/HomeLayout.jsx";
import PageNotFound from "../routes/PageNotFound.jsx";
import ViewNote, { loader as viewNoteLoader } from "../routes/ViewNote.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Choice />,
  },
  {
    path: "/sign/",
    element: <SignUp />,
  },
  {
    path: "/login/",
    element: <Login />,
  },
  {
    path: "/home/",
    element: (
      <RequireAuth>
        <HomeLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/home/about/",
        element: <AboutUser />,
      },
      {
        path: "/home/notes/:id",
        loader: notesLoader,
        element: <UserNotes />,
      },
      {
        path: "/home/notes/create-note",
        element: <CreateNote />,
      },
      {
        path: "/home/notes/edit-note/:id",
        loader: noteEditLoader,
        element: <EditNote />,
      },
      {
        path: "/home/notes/view-note/:id",
        loader: viewNoteLoader,
        element: <ViewNote />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}
