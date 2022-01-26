import React, { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack'
import './ViewGame.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'
import { doc, getDoc, Timestamp, getDocs, collection, updateDoc, query } from "firebase/firestore";
import { db } from '../../firebase';
import {
  useParams, useNavigate
} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Dropdown from 'react-bootstrap/Dropdown'




const ViewGame = (props) => {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState('')
  const [game, setGame] = useState({dateTime: new Date(), grade:"1"});
  const [date, setDate] = useState('')
  const [grade, setGrade] =useState('')
  const [datedisplay, setDatedisplay] = useState('')
  const [refs, setRefs] = useState([])
  const [ref1, setRef1] = useState(null)
  const [ref2, setRef2] = useState(null)
  const [ref3, setRef3] = useState(null)


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
      const data = docSnap.data()
      setGrade(data.grade)
      if (data.notes.length > 0) {
        setNotes(docSnap.data().notes)
      }
      setGame(data)
      setRef1(data.ref1)
      setRef2(data.ref2)
      setRef3(data.ref3)


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
              (ref1 ? <Badge pill bg={(ref1.accepted ? "success" : "secondary")}>{ref1.name}</Badge> : "N/A")
            }</div>
          <div className="bg-light border">{
            (ref2 ? <Badge pill bg={(ref2.accepted ? "success" : "secondary")}>{ref2.name}</Badge> : "N/A")
            }
          </div>
          <div className="bg-light border">
            {
            (ref3 ? <Badge pill bg={(ref3.accepted ? "success" : "secondary")}>{ref3.name}</Badge> : "N/A")
            }
          </div>
          <div>
            <Dropdown >
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Requested Game
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {
                  refs.map((i, index)=> {
                    console.log("hhh", i);
                    return (
                      <Dropdown.Item key={index} href="#/action-1">{i.Name}</Dropdown.Item>
                  )})
                }
              </Dropdown.Menu>
            </Dropdown>

          </div>
          <div className="bg-light border">{(notes ? notes : "No notes")}</div>
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
              <br></br>
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
