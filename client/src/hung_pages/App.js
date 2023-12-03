import React, { useState } from 'react';
import NoteList from './NoteList';
import './styles.css'; // Import your CSS file

const App = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Note 1', content: 'This is the content of Note 1' },
    { id: 2, title: 'Note 2', content: 'This is the content of Note 2' },
    // Add more notes as needed
  ]);

  const handleNoteClick = (noteId) => {
    console.log(`Note clicked: ${noteId}`);
    // Add your logic for handling note click
  };

  return (
    <div className="app">
      <h1>Notes App</h1>
      <NoteList notes={notes} onNoteClick={handleNoteClick} />
    </div>
  );
};

export default App;