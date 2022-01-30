import React, { useState, useEffect } from 'react';
import './EditGame.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { doc, getDoc, Timestamp, getDocs, collection, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { confirm } from "react-confirm-box";



//need to still do, so refs on game automatically populate in the three sections

const EditGame = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const [game, setGame] = useState({dateTime: new Date(), grade:"1"});
    const [date, setDate] = useState('')
    const [datedisplay, setDatedisplay] = useState('')
    const [grade, setGrade] =useState('')
    const [refs, setRefs] = useState([])
    const [notes, setNotes] = useState('')
    const [accepted, setRequested] = useState([])
    const [ref1, setRef1] = useState(null)
    const [ref2, setRef2] = useState(null)
    const [ref3, setRef3] = useState(null)
    const [changed1, setChanged1] = useState(null)
    const [changed2, setChanged2] = useState(null)
    const [changed3, setChanged3] = useState(null)


    const getRefs = async () => {
      const querySnapshot = await getDocs(collection(db, "games", id, "requested"));
      querySnapshot.forEach((doc) => {
        setRefs(refs => [ ... refs, {
          id: doc.id,
          name: doc.data().name,
          accepted: doc.data().accepted,
          assigned: doc.data().assigned,
          requested: doc.data().requested,
          user: doc.data().user,
        }])
        if (doc.data().requested === true) {
          setRequested(requested => [...requested, {
            id: doc.id,
            name: doc.data().name,
            accepted: doc.data().accepted,
            assigned: doc.data().assigned,
            requested: doc.data().requested,
            user: doc.data().user,
          }])
        }

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
        setRef1(docSnap.data().ref1)
        setRef2(docSnap.data().ref2)
        setRef3(docSnap.data().ref3)

        let thisDate = new Date(docSnap.data().dateTime.seconds * 1000)
        setDate(thisDate)
        setDatedisplay(thisDate.toISOString().split(':', 2).join(":"))
      } else {
        console.log("No such document!");
      }
    }



    useEffect(() => {
      getGame()
    }, [id]);

    const dateChange = (e) => {
      e.preventDefault();
      setDate(e.target.valueAsDate)
    }

    const gradeChange = (e) => {
      e.preventDefault();
      setGrade(e.target.value)
    }

    const addNotes = (e) => {
      e.preventDefault()
      setNotes(e.target.value)
    }

    const changeRef1 = (e) => {
      e.preventDefault()
      console.log(e.target.value);
      const uid = e.target.value
      if (uid !== "1") {
        const ref = refs.find(x=> x.id === uid)
        console.log("find", ref);
        setChanged1(ref)
      } else if (uid === "1") {
        setChanged1(1)

      }
    }

    const changeRef2 = (e) => {
      e.preventDefault()
      console.log(e.target.value);
      const uid = e.target.value
      console.log("uid", uid);
      if (uid !== "1") {
        const ref = refs.find(x=> x.id === uid)
        console.log("find", ref);
        setChanged2(ref)
      } else if (uid === "1") {
        setChanged2(1)

      }
    }

    const changeRef3 = (e) => {
      e.preventDefault()
      console.log(e.target.value);
      const uid = e.target.value
      console.log("uid", uid);
      if (uid !== "1") {
        const ref = refs.find(x=> x.id === uid)
        console.log("find", ref);
        setChanged3(ref)
      } else if (uid === "1") {
        setChanged3(1)

      }
    }



  const handleSubmit = async (e) => {
    e.preventDefault();
    const gameRef = doc(db, "games", id)
      updateDoc(gameRef, {
        dateTime: date,
        grade: grade,
        notes: notes,
        ref1: (changed1 ? changed1 : ref1),
        ref2: (changed2 ? changed2 : ref2),
        ref3: (changed3 ? changed3 : ref3),
      })
      changeReferees()
  }

  const changed1Update = () => {
    const newRef = doc(db, "games", id, "requested", changed1.id)
      updateDoc(newRef, {
        accepted: false,
        assigned: true,
      })
    const newRefGame = doc(db, "users", changed1.id, "games", id)
      setDoc(newRefGame, {
        game: id,
        accepted: changed1.accepted,
        date: date,
      })
  }

  const changed2Update = () => {
    const newRef = doc(db, "games", id, "requested", changed2.id)
      updateDoc(newRef, {
        accepted: false,
        assigned: true,
      })
      const newRefGame = doc(db, "users", changed2.id, "games", id)
        setDoc(newRefGame, {
          game: id,
          accepted: changed2.accepted,
          date: date,
        })
  }

  const changed3Update = () => {
    const newRef = doc(db, "games", id, "requested", changed3.id)
      updateDoc(newRef, {
        accepted: false,
        assigned: true,
      })
      const newRefGame = doc(db, "users", changed3.id, "games", id)
        setDoc(newRefGame, {
          game: id,
          accepted: changed3.accepted,
          date: date,
        })
  }

  const removeRef1 = async () => {
    const reqRef = doc(db, "games", id, "requested", ref1.id)
    updateDoc(reqRef, {
      accepted: false,
      assigned: false,
    })
    await deleteDoc(doc(db, "users", ref1.id, "games", id));
  }

  const removeRef2 = async () => {
    const reqRef = doc(db, "games", id, "requested", ref2.id)
    updateDoc(reqRef, {
      accepted: false,
      assigned: false,
    })
    await deleteDoc(doc(db, "users", ref2.id, "games", id));
  }

  const removeRef3 = async () => {
    const reqRef = doc(db, "games", id, "requested", ref3.id)
    updateDoc(reqRef, {
      accepted: false,
      assigned: false,
    })
    await deleteDoc(doc(db, "users", ref3.id, "games", id));
  }

  const changeReferees = async () => {
    if (changed1 === 1) {
      removeRef1()
    }
    if (changed1 && changed1 !== 1) {
      if (ref1) {
    if (changed1.id !== ref1.id) {
      removeRef1()
      changed1Update()
    }} else {
      changed1Update()
    }}
    if (changed2 === 1) {
      removeRef2()
    }
  if (changed2 && changed2 !== 1) {
    if (ref2) {
    if (changed2.id !== ref2.id) {
      removeRef2()
      changed2Update()
    }} else {
      changed2Update()
    }}
    if (changed3 === 1) {
      removeRef3()
    }
    if (changed3 && changed3 !== 1) {
      if (ref3) {
    if (changed3.id !== ref3.id) {
      removeRef3()
      changed3Update()
    }} else {
      changed3Update()
    }}
    navigate('/schedule')

  }

  const GameDelete = async () => {
    const result = await confirm("Are you sure?");
    if (result) {
      await deleteDoc(doc(db, "games", id))
      if (ref1) {
        console.log("ref1", ref1);
        await deleteDoc(doc(db, "users", ref1.id, "games", id))
      }
      if (ref2) {
        await deleteDoc(doc(db, "users", ref2.id, "games", id))
      }
      if (ref3) {
        await deleteDoc(doc(db, "users", ref3.id, "games", id))
      }

     navigate('/schedule')
     return;
   }
   console.log("You click No!");
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
            <Form.Label>Ref1</Form.Label>
            <Form.Select aria-label="Default select example" onChange={changeRef1}>
              <option value={(ref1 ? ref1.id : 1)}>{(ref1 ? ref1.name : "ref1")}</option>
                {
                  refs.map(ref => (
                    <option key={ref.id} value={ref.id}>{ref.name}</option>
                  ))
                }
                <option key={1} value={1}>Null</option>


            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ref2</Form.Label>
            <Form.Select aria-label="Default select example" onChange={changeRef2}>
              <option>{(ref2 ? ref2.name : "ref2")}</option>
                {
                  refs.map(ref => (
                    <option key={ref.id} value={ref.id} data={2}>{ref.name}</option>
                  ))
                }

            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ref3</Form.Label>
            <Form.Select aria-label="Default select example" onChange={changeRef3}>
              <option>{(ref3 ? ref3.name : "ref3")}</option>
                {
                  refs.map(ref => (
                    <option key={ref.id} value={ref.id} data={3}>{ref.name}</option>
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
          <br></br>
        <Button variant="danger" onClick={GameDelete}>Delete Game <FontAwesomeIcon icon={faTrashAlt}  /></Button>

        </div>
    )
}

export default EditGame
