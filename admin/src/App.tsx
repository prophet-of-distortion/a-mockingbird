import React, { useState, useEffect } from 'react';
import { Container, Header, Icon, Table } from 'semantic-ui-react'
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

  const renderMappings = (mappings: any) => {
    if (!mappings) { return [] }
    return mappings.map((mapping: any, index: number) => {
      const [pattern, response] = mapping;
      return (
        <Table.Row key={index}>
          <Table.Cell>
            {pattern}
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(response)}
          </Table.Cell>
        </Table.Row>
      );
    })
  }

  return (
    <Container>
      <Header as='h2'>
        <Icon circular inverted color='blue' name='quidditch' />
        <Header.Content>
          Mockingbird
          <Header.Subheader>Manage your preferences</Header.Subheader>
        </Header.Content>
      </Header>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Pattern</Table.HeaderCell>
            <Table.HeaderCell>Response</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {renderMappings(mappings)}
        </Table.Body>

      </Table>
    </Container>
  );
}

export default App;
