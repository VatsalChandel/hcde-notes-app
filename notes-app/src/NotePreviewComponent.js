import React, { useState } from 'react';
import './NotePreviewComponent.css';

const NotePreviewComponent = ({ noteId, title, content, updateNote }) => {


  const [editingTitle, setEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const [editingContent, setEditingContent] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleDoubleClickTitle = () => setEditingTitle(true);
  const handleTitleChange = (e) => setEditedTitle(e.target.value);
  const handleTitleBlur = () => {
    setEditingTitle(false);
    updateNote(noteId, editedTitle, editedContent);
    console.log("Title Changed")
  };

  const handleDoubleClickContent = () => setEditingContent(true);
  const handleContentChange = (e) => setEditedContent(e.target.value);
  const handleContentBlur = () => {
    setEditingContent(false);
    updateNote(noteId, editedTitle, editedContent);
    console.log("Content Changed")
  };

  return (
    <div className="note-preview">

      <div className="note-title">

        {editingTitle ? (
          <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            autoFocus
          />

        ):(
          <div onDoubleClick={handleDoubleClickTitle}>{editedTitle}</div>
        )}
        
      </div>

      <div className="note-content">

        {editingContent ? (
          <input
            value={editedContent}
            onChange={handleContentChange}
            onBlur={handleContentBlur}
            autoFocus
          />

        ) : (
          <div onDoubleClick={handleDoubleClickContent}>{editedContent}</div>
        )}
      </div>

    </div>
  );
};

export default NotePreviewComponent;
