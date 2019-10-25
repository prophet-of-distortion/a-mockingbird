import React, { useState, useEffect } from 'react';
import './App.css';
import ApiClient from './apiClient';

const App: React.FC = () => {
  const [mappings, setMappings] = useState([]);

  useEffect(() => {
    const apiClient = new ApiClient();
    apiClient.getMappings().then((data) => {
      setMappings(data);
    });
  }, []);

  return (
    <div>
      Mockingbird
      <p>{JSON.stringify(mappings)}</p>
    </div>
  );
}

export default App;
