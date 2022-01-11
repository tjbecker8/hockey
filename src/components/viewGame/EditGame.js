import React from 'react'
import './EditGame.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const EditGame = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hey this shit works" );;
  }

    return (
        <div className="EGDiv">
        <h3>Edit Game</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date and Time</Form.Label>
            <Form.Control type="datetime-local"  />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Grade</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option> //need to change so default grade shows up from game
              <option value="1">G1</option>
              <option value="2">G2</option>
              <option value="3">G3</option>
              <option value="4">G4</option>
              <option value="4">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ref</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Ref</option> //need to change so default ref shows up from game
              <option value="1">name</option>
              <option value="2">name</option>
              <option value="3">name</option>
              <option value="4">name</option>
              <option value="4">name</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ref/Line</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Ref/Linesman</option> //need to change so default ref shows up from game
              <option value="1">name</option>
              <option value="2">name</option>
              <option value="3">name</option>
              <option value="4">name</option>
              <option value="4">name</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Line</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Linesman</option> //need to change so default ref shows up from game
              <option value="1">name</option>
              <option value="2">name</option>
              <option value="3">name</option>
              <option value="4">name</option>
              <option value="4">name</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Game Notes</Form.Label>
              <Form.Control as="textarea" rows={2} defaultValue="games notes already there, use onchange for editing w/ hooks" />
            </Form.Group>

          <Button variant="primary" type="submit">
            Edit Game
          </Button>
        </Form>

        </div>
    )
}

export default EditGame
