import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './newGame.css'
import db from '../../firebase';

const NewGame = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hey this shit works" );;
  }

    return (
        <div className='newGameDiv'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date and Time</Form.Label>
            <Form.Control type="datetime-local"  />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Grade</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">G1</option>
              <option value="2">G2</option>
              <option value="3">G3</option>
              <option value="4">G4</option>
              <option value="4">Other</option>
            </Form.Select>
          </Form.Group>


        <Button  variant="primary" type="submit">
          Create Game
        </Button>

        </Form>

        </div>
    )
}

export default NewGame
