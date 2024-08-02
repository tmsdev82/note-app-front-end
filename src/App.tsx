import React, { useState, useEffect } from 'react';
import './App.css';
import BackendService from './services/BackendService'; 
import {NoteData} from './models/NoteData';

function App() {
  const [testData, setTestData] = useState({ title: '', content: '' });
  const [notesData, setNotesData] = useState<NoteData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BackendService.getTestData(); 
        const notes = await BackendService.getNotesData();
        setTestData(data); 
        setNotesData(notes);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>{testData.title}</h1>
      </header>
      <div>
        {testData.content}
      </div>
      <section>
        <h2>Notes</h2>
        {notesData.length > 0 ? (
          <div>
            {notesData.map((note, index) => (
              <div key={index}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
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
