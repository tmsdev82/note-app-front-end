import React, { useState, useEffect } from "react";
import "./App.css";
import BackendService from "./services/BackendService";
import { NoteData } from "./models/NoteData";
import NoteFormComponent from "./components/noteFormComponent";

function App() {
  const [notesData, setNotesData] = useState<NoteData[]>([]);
  const [newNote, setNewNote] = useState<NoteData>({ title: "", content: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const fetchNotes = async () => {
    try {
      const notes = await BackendService.getNotesData();
      setNotesData(notes);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  useEffect(() => {  
    fetchNotes();
  }, []);

  const handleFormSubmit = async () => {
    setEditingIndex(null);
    await fetchNotes();
  };

  const handleFormCancel = () => {
    setEditingIndex(null);
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleDelete = async (index: number) => {
    try {
      await BackendService.deleteNoteData(index);
      await fetchNotes();
    } catch (error) {
      console.error("Failed to delete and fetch notes:", error);
    }
  } 

  return (
    <div className="App">
      <header>
        <h1>Notes App</h1>
      </header>
      <section>
        {editingIndex === null && (
          <NoteFormComponent initialNote={newNote} index={null} isEdit={false} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
        )}
      </section>
      <section>
        <h2>Notes</h2>
        {notesData.length > 0 ? (
          <div className="notes-container">
            {notesData.map((note, index) => (
              <div key={index} className="note-card">
              {editingIndex === index ? (
                <NoteFormComponent initialNote={note} index={index} isEdit={true} onSubmit={handleFormSubmit} onCancel={handleFormCancel}/>
              ) : (
                <>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <section>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </section>
                </>
              )}
            </div>
            ))}
          </div>
        ) : (
          <p>No notes available</p>
        )}
      </section>
    </div>
  );
}
export default App;
