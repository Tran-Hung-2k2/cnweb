import React from 'react';
import Note from './Note';

const NoteList = ({ notes, onNoteClick }) => {
  return (
    <div className="note-list">
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} onClick={() => onNoteClick(note.id)} />
        ))}
      </ul>
    </div>
  );
};

export default NoteList;