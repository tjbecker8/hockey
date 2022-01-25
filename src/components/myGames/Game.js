import React, { useState, useEffect, } from 'react'
import Button from 'react-bootstrap/Button'
import { doc, updateDoc, getDocs, collection, where, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import Badge from 'react-bootstrap/Badge'



const Game = (props) => {

const [id, setId] = useState('')
const [date, setDate] = useState('')
const [confirmed, setConfirmed] = useState(false)
const [uid, setUid] = useState('')
// const [refs, setRefs] = useState([])
const [fresh, setFresh] =useState(false)
const [ref1, setRef1] = useState(null)
const [ref2, setRef2] = useState(null)
const [ref3, setRef3] = useState(null)



const getGame = async (g) => {
  const docRef = doc(db, "games", g);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  const data = docSnap.data()
  setRef1(data.ref1)
  setRef2(data.ref2)
  setRef3(data.ref3)
} else {
  console.log("No such document!");
}
}


  useEffect(() => {
    setId(props.info.data.game)
    console.log(props.info.data.game);
    setConfirmed(props.info.data.accepted)
    let thisDate = new Date(props.info.data.date.seconds * 1000)
    let localDate = thisDate.toLocaleString()
    setDate(localDate)
    setUid(props.uid)
    // getRefs(props.info.data.game)
    getGame(props.info.data.game)
  }, [])

  const AcceptGame = () => {
    if (!confirmed) {
      setConfirmed(!confirmed)
      confirmGame()
    } else {
      console.log("game already confirmed");
    }
  }


//need to setup so state adjusts to accepted to for the ref
  const confirmGame = async () => {
    const gameRef = doc(db, "games", id, "requested", uid);
    await updateDoc(gameRef, {
      accepted: true
    });
    const refGameRef = doc(db, "users", uid, "games", id)
    await updateDoc(refGameRef, {
      accepted: true
    });
    const gRef = doc(db, "games", id)
    if (ref1.id === uid) {
    await updateDoc(gRef, {
      ref1: {
        name: ref1.name,
        id: ref1.id,
        assigned: ref1.assigned,
        accepted: true,
      }
    });

  } else if (ref2.id === uid) {
    await updateDoc(gRef, {
      ref2: {
        name: ref2.name,
        id: ref2.id,
        assigned: ref2.assigned,
        accepted: true,
      }
    });
  } else if (ref2.id === uid) {
    await updateDoc(gRef, {
      ref3: {
        name: ref3.name,
        id: ref3.id,
        assigned: ref3.assigned,
        accepted: true,
      }
    });
  }
console.log("updated accepted");
  }



    return (
      <tr>
        <td>{date}</td>
        <td>Grade</td>
        {(ref1 ? <td>{
          (ref1.accepted ? <Badge bg="success">{ref1.name}</Badge> : <Badge bg="secondary">{ref1.name}</Badge>)
        }</td> : <td>no ref</td>)}
        {(ref2 ? <td>{
          (ref2.accepted ? <Badge bg="success">{ref2.name}</Badge> : <Badge bg="secondary">{ref2.name}</Badge>)
        }</td> : <td>no ref</td>)}
        {(ref3 ? <td>{
          (ref3.accepted ? <Badge bg="success">{ref3.name}</Badge> : <Badge bg="secondary">{ref3.name}</Badge>)
        }</td> : <td>no ref</td>)}


        <td>{(!confirmed ? <Button variant="warning" onClick={() => {AcceptGame()}}>Accept Game</Button> : <Button variant="success" onClick={() => {AcceptGame()}}>Game Accepted</Button>)}</td>
      </tr>
    )
}

export default Game
