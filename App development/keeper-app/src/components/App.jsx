import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

   const [notes, setNotes] = useState([]);

  function addNote(newNote){
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(noteKey) {
    setNotes((prevNotes) => {
      let newNotes = prevNotes;
      newNotes.splice(noteKey, 1); // removing item from array at index
      return [...newNotes];
    });
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note, noteIndex) => {
        return (
          <Note key={noteIndex} id={noteIndex} title={note.title} content={note.content} deleteNote={deleteNote} />
        );
      })}
      
      <Footer />
    </div>
  );
}

export default App;