import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Button, Container, Form, Header, Icon, Modal, Table, TextArea } from 'semantic-ui-react'
import './App.css';
import ApiClient from './apiClient';

enum Modes {
  ADD,
  EDIT,
  VIEW
}

const App: React.FC = () => {
  const DEFAULT_FORM_STATE = {
    pattern: '',
    response: {},
    open: false,
  }

  const[formState, setFormState] = useState({
    id: -1,
    response: '',
  });
  const handleInputChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  }

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const apiClient = new ApiClient();
    const {id, response } = formState;
    apiClient.updateMapping(id, JSON.parse(response)).then((data) => {
      if (data.success) {
        setMappings(data.mappings);
        setFormOpen({ ...formOpen, open: false });
      }
    });
  }

  const[mode, setMode] = useState(Modes.VIEW)

  const [mappings, setMappings] = useState([]);
  useEffect(() => {
    const apiClient = new ApiClient();
    apiClient.getMappings().then((data) => {
      setMappings(data);
    });
  }, []);

  const [formOpen, setFormOpen] = useState(DEFAULT_FORM_STATE);

  const openForm = (id: number, pattern: string, response: any, mode: Modes = Modes.VIEW) => {
    setMode(Modes.EDIT)
    setFormState({
      ...formState,
      id,
      response: JSON.stringify(response, null, 2),
    })
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
          <Table.Cell
            className='response'
            onClick={() => openForm(index, pattern, mapping, Modes.VIEW)}
          >
            {JSON.stringify(response)}
          </Table.Cell>
          <Table.Cell>
            <Button
              circular
              icon='pencil'
              onClick={() => openForm(index, pattern, mapping, Modes.EDIT)}
            />
          </Table.Cell>
        </Table.Row>
      );
    })
  }

  let modalContent, saveEditButton;
  switch(mode) {
    case Modes.EDIT:
      modalContent = (
        <Form onSubmit={handleFormSubmit}>
          <Form.Field
            control={TextArea}
            label='Response'
            name='response'
            placeholder='Response'
            rows='20'
            value={formState.response}
            onChange={handleInputChange}
          />
        </Form>
      );

      saveEditButton = (
        <Button
          color='green'
          onClick={handleFormSubmit}
        >
          <Icon name='save' /> Save
        </Button>
      );
      break;

    default:
        modalContent = (
          <code>
            {JSON.stringify(formOpen.response, null, 2)}
          </code>
        );

        saveEditButton = (
          <Button
            color='black'
            onClick={() => setMode(Modes.EDIT)}
          >
            <Icon name='edit outline' /> Edit
          </Button>
        );
  }

  return (
    <Container>
      <Header as='h2'>
        <Icon circular inverted color='blue' name='quidditch' />
        <Header.Content>
          Mockingbird
          <Header.Subheader>Things are never as bad as they seem.</Header.Subheader>
        </Header.Content>
      </Header>

      <Button primary>Add item</Button>

      <Table selectable structured>

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
        <Modal.Header>
          {formOpen.pattern}
        </Modal.Header>
        <Modal.Content>
          {modalContent}
        </Modal.Content>
        <Modal.Actions className="form-actions">
          <Button basic onClick={closeForm}>
            <Icon name='close' /> Cancel
          </Button>
          {saveEditButton}
          <Button color='red'>
            <Icon name='trash' /> Delete
          </Button>
        </Modal.Actions>
      </Modal>

    </Container>
  );
}

export default App;
