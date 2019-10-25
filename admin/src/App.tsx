import React, { useState, useEffect } from 'react';
import { Container, Header, Icon } from 'semantic-ui-react'
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
    <Container>
      <Header as='h2'>
        <Icon className='fab fa-facebook' />
        <Header.Content>
          Header
          <Header.Subheader>Manage your preferences</Header.Subheader>
        </Header.Content>
      </Header>
      <p>{JSON.stringify(mappings)}</p>
    </Container>
  );
}

export default App;
