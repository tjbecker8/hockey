import React, { useState, useEffect } from 'react';
import './EditGame.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { doc, getDoc, Timestamp, getDocs, collection, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import { useParams, } from 'react-router-dom';



//need to still do, so refs on game automatically populate in the three sections

const EditGame = () => {

    const { id } = useParams();
    const [game, setGame] = useState({dateTime: new Date(), grade:"1"});
    const [date, setDate] = useState('')
    const [datedisplay, setDatedisplay] = useState('')
    const [grade, setGrade] =useState('')
    const [refs, setRefs] = useState([])
    const [ref, setRef] = useState(null)
    const [refline, setRefline] = useState(null)
    const [line, setLine] = useState(null)
    const [notes, setNotes] = useState('')


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


    const getGame = async () => {
      getRefs()
      const docRef = doc(db, "games", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        // console.log("Document data:", docSnap.data().grade);
        setGrade(docSnap.data().grade)
        setNotes(docSnap.data().notes)
        setGame(docSnap.data())
        let thisDate = new Date(docSnap.data().dateTime.seconds * 1000)
        setDate(thisDate)
        setDatedisplay(thisDate.toISOString().split(':', 2).join(":"))

      } else {
        console.log("No such document!");
      }
    }



    useEffect(() => {
      getGame()
      console.log("gameid", id);
    }, [id]);

    const dateChange = (e) => {
      e.preventDefault();
      setDate(e.target.valueAsDate)
    }

    const gradeChange = (e) => {
      e.preventDefault();
      setGrade(e.target.value)
    }

    const refChange = (e) => {
      e.preventDefault();
      setRef(e.target.value)
    }

    const refLineChange = (e) => {
      e.preventDefault();
      setRefline(e.target.value)
    }

    const LineChange = (e) => {
      e.preventDefault();
      setLine(e.target.value)
    }

    const addNotes = (e) => {
      e.preventDefault()
      setNotes(e.target.value)
    }



  const handleSubmit = async (e) => {
    e.preventDefault();
    const gameRef = doc(db, "games", id)
      updateDoc(gameRef, {
        dateTime: date,
        grade: grade,
        ref: ref,
        refLine: refline,
        line: line,
        notes: notes,
      })
      console.log("Document updated with ID: ", gameRef.id);

  }

    return (
        <div className="EGDiv">
        <h3>Edit Game</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date and Time</Form.Label>

            <DateTimePicker
              onChange={setDate}
              value={date}
              />


          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Grade</Form.Label>
            <Form.Select aria-label="Default select example" onChange={gradeChange}>
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
            <Form.Select aria-label="Default select example" onChange={refChange}>
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
            <Form.Select aria-label="Default select example" onChange={refLineChange}>
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
            <Form.Select aria-label="Default select example" onChange={LineChange}>
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
              <Form.Control as="textarea" rows={2} defaultValue={notes} onChange={addNotes} />
            </Form.Group>

          <Button variant="primary" type="submit">
            Edit Game
          </Button>
        </Form>

        </div>
    )
}

export default EditGame
