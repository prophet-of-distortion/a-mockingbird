import React from 'react';
import './App.css';
import ApiClient from './apiClient';

const App: React.FC = () => {
  const apiClient = new ApiClient();

  return (
    <div>
      Mockingbird
    </div>
  );
}

export default App;
