import React, { useState, useEffect } from 'react';
import './EditGame.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { doc, getDoc, Timestamp, getDocs, collection } from "firebase/firestore";
import { db } from '../../firebase';
import moment from 'moment';





const EditGame = () => {

    const [id, setId] = useState(1)
    const [game, setGame] = useState({dateTime: new Date(), grade:"1"});
    const [date, setDate] = useState('')
    const [grade, setGrade] =useState('')
    const [refs, setRefs] = useState([])

    const getGame = async () => {
      const docRef = doc(db, "games", "pdQasPeTKEhRKRBX9lMr");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data().grade);
        setGrade(docSnap.data().grade)
        setGame(docSnap.data())
        let thisDate = new Date(docSnap.data().dateTime.seconds * 1000)
        setDate(thisDate.toISOString().split(':', 2).join(":"))
      } else {
        console.log("No such document!");
      }
    }

    const getRefs = async () => {
      const querySnapshot = await getDocs(collection(db, "refs"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().name);
        setRefs(refs => [ ... refs, {
          id: doc.id,
          name: doc.data().name,
        }])
      });
    }

    useEffect(() => {
      getGame()
      getRefs()
    }, [id]);




  const handleSubmit = (e) => {
    e.preventDefault();

  }

    return (
        <div className="EGDiv">
        <h3>Edit Game</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date and Time</Form.Label>
            <Form.Control type="datetime-local"  value={date} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Grade</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value={grade}>{grade < 5 ? "G"+grade : "Other"}</option>
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
                {
                  refs.map(ref => (
                    <option key={ref.id} value={ref.id}>{ref.name}</option>
                  ))
                }
              
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ref/Line</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Ref/Linesman</option> //need to change so default ref shows up from game
                {
                  refs.map(ref => (
                    <option key={ref.id} value={ref.id}>{ref.name}</option>
                  ))
                }

            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Line</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Linesman</option> //need to change so default ref shows up from game
                {
                  refs.map(ref => (
                    <option key={ref.id} value={ref.id}>{ref.name}</option>
                  ))
                }

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
