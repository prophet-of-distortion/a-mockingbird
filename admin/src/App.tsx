import React, { useState, useEffect } from 'react';
import { Button, Container, Header, Icon, Modal, Table } from 'semantic-ui-react'
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

  const [formOpen, setFormOpen] = useState({ open: false });

  const openForm = () => setFormOpen({ open: true })
  const closeForm = () => setFormOpen({ open: false })

  const renderMappings = (mappings: any) => {
    if (!mappings) { return [] }
    return mappings.map((mapping: any, index: number) => {
      const [pattern, response] = mapping;
      return (
        <Table.Row key={index}>
          <Table.Cell>
            {pattern}
          </Table.Cell>
          <Table.Cell className='response'>
            {JSON.stringify(response)}
          </Table.Cell>
          <Table.Cell>
            <Button circular icon='pencil' onClick={openForm} />
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
            <Table.HeaderCell colSpan="2">Response</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {renderMappings(mappings)}
        </Table.Body>

      </Table>

      <Modal open={formOpen.open} onClose={closeForm}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your e-mail
              address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>

    </Container>
  );
}

export default App;
