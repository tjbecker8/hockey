import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './newGame.css'
import { db } from '../../firebase';
import { collection, addDoc, setDoc, doc, } from "firebase/firestore";

const NewGame = () => {

  const [date, setDate] = useState(null);
  const [grade, setGrade] = useState(null)



  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef =  await addDoc(collection(db, "games"), {
      dateTime: date,
      grade: grade,
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Game Created")
  }


  const dateChange = (e) => {
    e.preventDefault();
    setDate(e.target.valueAsDate)
  }

  const gradeChange = (e) => {
    e.preventDefault();
    setGrade(e.target.value)
  }

    return (
        <div className='newGameDiv'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date and Time</Form.Label>
            <Form.Control type="datetime-local" onChange={dateChange}  />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Grade</Form.Label>
            <Form.Select aria-label="Default select example" onChange={gradeChange} >
              <option value="1">G1</option>
              <option value="2">G2</option>
              <option value="3">G3</option>
              <option value="4">G4</option>
              <option value="5">Other</option>
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
