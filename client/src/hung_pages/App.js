import React, { useState } from 'react';
import NoteList from './NoteList';
import Help from './Help';
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
    
     <div className="App">
     <header className="App-header">
         <h1>Ứng Dụng React Help</h1>
     </header>
     <Help />
 </div>
  );
};

export default App;