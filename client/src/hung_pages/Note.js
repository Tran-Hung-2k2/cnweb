// Note.js
import React from 'react';

const Note = ({ note, onClick }) => {
  return (
    <li className="note" onClick={onClick}>
      <strong>{note.title}</strong>
      <p>{note.content}</p>
    </li>
  );
};

export default Note;