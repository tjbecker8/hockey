import React, { useState, useEffect, } from 'react'
import Button from 'react-bootstrap/Button'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';



const Game = (props) => {

const [id, setId] = useState('')
const [date, setDate] = useState('')
const [confirmed, setConfirmed] = useState(false)
const [uid, setUid] = useState('')


  useEffect(() => {

    setId(props.info.data.game)
    setConfirmed(props.info.data.accepted)
    let thisDate = new Date(props.info.data.date.seconds * 1000)
    let localDate = thisDate.toLocaleString()
    setDate(localDate)
    setUid(props.uid)
  }, [])

  const AcceptGame = () => {
    if (!confirmed) {
      setConfirmed(!confirmed)
      confirmGame()
    } else {
      console.log("game already confirmed");
    }
  }

  const confirmGame = async () => {
    const gameRef = doc(db, "games", id, "requested", uid);
    await updateDoc(gameRef, {
      accepted: true
    });
    const refGameRef = doc(db, "users", uid, "games", id)
    await updateDoc(refGameRef, {
      accepted: true
    });
    //need function to set the ref, ref/line, or line slot


  }

    return (
      <tr>
        <td>{date}</td>
        <td>Grade</td>
        <td>Ref</td>
        <td>ref/Line</td>
        <td>Line</td>
        <td>{(!confirmed ? <Button variant="warning" onClick={() => {AcceptGame()}}>Accept Game</Button> : <Button variant="success" onClick={() => {AcceptGame()}}>Game Accepted</Button>)}</td>
      </tr>
    )
}

export default Game
