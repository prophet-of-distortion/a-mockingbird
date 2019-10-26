import React, { useState, useEffect } from 'react';
import { Button, Container, Header, Icon, Modal, Rail, Table } from 'semantic-ui-react'
import './App.css';
import ApiClient from './apiClient';

const App: React.FC = () => {
  const DEFAULT_FORM_STATE = {
    pattern: '',
    response: {},
    open: false,
  }

  const [mappings, setMappings] = useState([]);
  useEffect(() => {
    const apiClient = new ApiClient();
    apiClient.getMappings().then((data) => {
      setMappings(data);
    });
  }, []);

  const [formOpen, setFormOpen] = useState(DEFAULT_FORM_STATE);

  const openForm = (pattern: string, response: any) => {
    setFormOpen({ pattern, response, open: true })
  }
  const closeForm = () => setFormOpen(DEFAULT_FORM_STATE)

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
            <Button circular icon='pencil' onClick={() => openForm(pattern, mapping)} />
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

      <Button primary>Add item</Button>

      <Table structured>

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
        <Modal.Header>{formOpen.pattern}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <code>
              {JSON.stringify(formOpen.response)}
            </code>
          </Modal.Description>
        </Modal.Content>
      </Modal>

    </Container>
  );
}

export default App;
