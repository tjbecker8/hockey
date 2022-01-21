import React, { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack'
import './ViewGame.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'
import { doc, getDoc, Timestamp, getDocs, collection, updateDoc, query } from "firebase/firestore";
import { db } from '../../firebase';
import {
  useParams,
} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'



const ViewGame = (props) => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState('')
  const [game, setGame] = useState({dateTime: new Date(), grade:"1"});
  const [date, setDate] = useState('')
  const [grade, setGrade] =useState('')
  const [ref, setRef] = useState(null)
  const [refline, setRefline] = useState(null)
  const [line, setLine] = useState(null)
  const [datedisplay, setDatedisplay] = useState('')
  const [refs, setRefs] = useState([])
  // const [id, setId] = useState(1)


  const { id } = useParams();

  const getRefs = async () => {
    const q = query(collection(db, "games", id, "requested"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setRefs(refs => [... refs, {
        Name: doc.data().name,
        id: doc.id,
        accepted: doc.data().accepted,
        assigned: doc.data().assigned,
        requested: doc.data().requested,
      }])
    })
  }

  const getGame = async () => {
    const docRef = doc(db, "games", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data().grade);
      setGrade(docSnap.data().grade)
      if (docSnap.data().notes.length > 0) {
        setNotes(docSnap.data().notes)
      }
      setGame(docSnap.data())
      setRef(docSnap.data().ref)
      setRefline(docSnap.data().refline)
      let thisDate = new Date(docSnap.data().dateTime.seconds * 1000)
      setDate(thisDate)
      let localDate = thisDate.toLocaleString()
      setDatedisplay(localDate)
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getGame()
    getRefs()
    console.log("gameid", id);
  }, [id]);
  const addNotes = (e) => {
    e.preventDefault()
    setNotes(e.target.value)
  }

  const exited = () => {
    const gameRef = doc(db, "games", id)
      updateDoc(gameRef, {
        notes: notes,
      })
      console.log("Document updated with ID: ", gameRef.id);
  }



    return (
        <div className='VGDiv'>

        <Stack gap={3}>
          <div className="bg-light border">{datedisplay}</div>
          <div className="bg-light border">{
              (grade < 5  ? "G"+grade : "Other")
            }
          </div>
          <div className="bg-light border">{
              (refs[0] && refs[0].assigned == true ?
                <Badge pill bg={(refs[0].accepted ? "success" : "secondary")}>
                  {refs[0].Name}
                </Badge>
                : "No Ref assigned")
            }</div>
          <div className="bg-light border">{
            (refs[1] && refs[1].assigned == true ?
              <Badge pill bg={(refs[1].accepted ? "success" : "secondary")}>
                {refs[1].Name}
              </Badge>
              : "No Ref/line assigned")
            }
          </div>
          <div className="bg-light border">{
            (refs[2] && refs[2].assigned == true ?
              <Badge pill bg={(refs[2].accepted ? "success" : "secondary")}>
                {refs[2].Name}
              </Badge>
              : "No Line assigned")
            }
          </div>
          <div className="bg-light border">{notes}</div>
          <Button
            variant="secondary"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            >
            Add game notes
          </Button>
          <Collapse in={open} onExited={exited}>
            <div>
              <Form.Control as="textarea" rows={4} defaultValue={notes} onChange={addNotes} />

              <Button onClick={() =>
                  setOpen(!open)
                } >Done</Button>
            </div>
          </Collapse>
        </Stack>

        </div>
    )
}

export default ViewGame
