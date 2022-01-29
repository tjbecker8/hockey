import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './newGame.css'
import { db } from '../../firebase';
import { collection, addDoc, setDoc, doc, } from "firebase/firestore";

const NewGame = () => {

  const [date, setDate] = useState(null);
  const [grade, setGrade] = useState('1')
  const [disabled, setDisabled] = useState(false)
  const [games, setGames] = useState([])



  const handleSubmit = async (e) => {
    setDisabled(true)

    e.preventDefault();
    if (date && grade != null) {
    const docRef =  await addDoc(collection(db, "games"), {
      dateTime: date,
      grade: grade,
      ref3: null,
      ref1: null,
      ref2: null,
      notes: '',
    });
    console.log("Document written with ID: ", docRef.id);

    setDisabled(false)

    setGames(games => [...games, {
      dateTime: date,
      grade: grade,
    }])
  } else {
   alert("Date and Time cannot be empty")
 }
  }


  const dateChange = (e) => {
    const dtte = new Date(e.target.value)
    console.log("nnn", dtte);
    e.preventDefault();
    setDate(dtte)
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


        <Button  variant="primary" type="submit" disabled={disabled}>
          Create Game
        </Button>

        </Form>

        <br></br>

        {(games.length > 0 ?
          <div>
            <p>Games added:</p>
            { games.map((i, index) => {
              return (
                <div>
                  <p>Date: {i.dateTime.toLocaleString()}</p>
                  <p>Grade: {i.grade}</p>
                </div>
              )
            })}
        </div> : <div></div>)}

        </div>
    )
}

export default NewGame
