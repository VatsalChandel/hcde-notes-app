import React, { useState, useEffect } from 'react';
import './Home.css'; 
import NotePreviewComponent from './NotePreviewComponent';
import { db, auth } from './firebase';
import { query, where, collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const notesCollection = collection(db, 'notes');
  const navigate = useNavigate();

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // There has to be a current user to get notes 
      if (currentUser) {
        console.log(currentUser)
        setUser(currentUser); // set the user 
        fetchNotes(currentUser.uid); // get the notes for user 

        // no user so empty everything and make them login 
      } else {
        setNotes([]); 
        navigate('/login'); 
      }
    });
  
    return () => unsubscribe(); 
  }, [navigate]);
  

  // Function to get the notes based on the userID from the login 
  const fetchNotes = async (userID) => {
    console.log("Trying to get the notes")
    try {
      const q = query(notesCollection, where('userId', '==', userID)); // Filter notes by userId
      const notesSnapshot = await getDocs(q);
    
      const userNotes = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotes(userNotes);

    } catch (error) {
      console.error('Error fetching notes:', error); // Usually because I didnt set id in firebase
    }
  };

  // Add a new note but needs userID 
  const addNote = async () => {
    if (!user) return; 
  
    const newNoteNumber = notes.length + 1;

    const newNote = {
      title: `My note ${newNoteNumber}`,
      content: `Note content ${newNoteNumber}`,
      userId: user.uid, 
    };
  
    try {

      const docRef = await addDoc(notesCollection, newNote);
      setNotes((prevNotes) => [
        ...prevNotes,
        { id: docRef.id, ...newNote },
      ]);

    } catch (error) {
      console.error('Error adding note:', error);
    }
  };
  

  // Update an existing note
  const updateNote = async (id, updatedTitle, updatedContent) => {

    try {

      const noteRef = doc(db, 'notes', id);
      await updateDoc(noteRef, {
        title: updatedTitle,
        content: updatedContent,
      });

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, title: updatedTitle, content: updatedContent } : note
        )
      );

    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  // Sign out the user
  const handleSignOut = async () => {
    try {

      await signOut(auth);
      setNotes([]); // No user means no Notes 
      navigate('/login');

    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  

  return (

    <div className="Home">

      <header className="top-bar">
        <h1>Notes</h1>

        <div className="actions">
          <button className="add-note" onClick={addNote}>
            ➕ Add note
          </button>
          <button className="sign-out" onClick={handleSignOut}>
            Sign out
          </button>
        </div>

      </header>
      <main className="main-content">
        {notes.map((note) => (
          <NotePreviewComponent
            key={note.id}
            noteId={note.id}
            title={note.title}
            content={note.content}
            updateNote={updateNote}
          />
        ))}
      </main>
    </div>
  );
}

export default Home;
