import React, { useState, useEffect } from 'react';
import './App.css';
import BackendService from './services/BackendService'; 

function App() {
  const [testData, setTestData] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BackendService.getTestData(); 
        setTestData(data); 
      } catch (error) {
        console.error('Failed to fetch test data:', error);
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
    </div>
  );
}

export default App;
