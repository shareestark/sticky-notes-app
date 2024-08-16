import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

/* This container component manages all of the state 
for this application, delegating rendering logic to 
presentational components. */
const App = () => {
  const [notes, setNotes] = useState([
    {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    },
  ]);
  const [searchText, setSearchText] = useState("");

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    };
    setNotes([newNote, ...notes]);
  };

  const onType = (editMeId, updatedKey, updatedValue) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id !== editMeId
          ? note
          : { ...note, [updatedKey]: updatedValue }
      )
    );
  };

  const onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = notes.map((note) => {
      if (!newSearchText) {
        return { ...note, doesMatchSearch: true };
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const hasMatch = title.includes(newSearchText) || description.includes(newSearchText);
        return { ...note, doesMatchSearch: hasMatch };
      }
    });
    setSearchText(newSearchText);
    setNotes(updatedNotes);
  };

  const removeNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  useEffect(() => {
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    const stringifiedNotes = JSON.stringify(notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }, [notes]);

  return (
    <div>
      <Header
        searchText={searchText}
        addNote={addNote}
        onSearch={onSearch}
      />
      <NotesList
        notes={notes}
        onType={onType}
        removeNote={removeNote}
      />
    </div>
  );
};

export default App;
