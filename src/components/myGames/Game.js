import React, { useState, useEffect, } from 'react'
import Button from 'react-bootstrap/Button'
import { doc, updateDoc, getDocs, collection, where } from "firebase/firestore";
import { db } from '../../firebase';
import Badge from 'react-bootstrap/Badge'



const Game = (props) => {

const [id, setId] = useState('')
const [date, setDate] = useState('')
const [confirmed, setConfirmed] = useState(false)
const [uid, setUid] = useState('')
const [refs, setRefs] = useState([])
const [fresh, setFresh] =useState(false)

const getRefs = async (gameId) => {
  const gamesSnapshot = await getDocs(collection(db, "games", gameId, "requested"), where("assigned", "==", true));
  gamesSnapshot.forEach((doc) => {
    console.log("other refs", doc.data(), doc.id);
    setRefs(refs => [ ... refs, {
      data: doc.data(),
      id: doc.id
    }])
  })
}


  useEffect(() => {
    setId(props.info.data.game)

    setConfirmed(props.info.data.accepted)
    let thisDate = new Date(props.info.data.date.seconds * 1000)
    let localDate = thisDate.toLocaleString()
    setDate(localDate)
    setUid(props.uid)
    getRefs(props.info.data.game)
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
    for (const obj of refs) {
      if (obj.id === uid) {
    obj.data.accepted = true;
    setFresh(true)
    break;
  }
}
console.log("updated accepted", refs);

    //need function to set the ref, ref/line, or line slot
  }



    return (
      <tr>
        <td>{date}</td>
        <td>Grade</td>
        {(refs[0] ? <td>{
          (refs[0].data.accepted ? <Badge bg="success">{refs[0].data.name}</Badge> : <Badge bg="secondary">{refs[0].data.name}</Badge>)
        }</td> : <td>no ref</td>)}
        {(refs[1] ? <td>{
          (refs[1].data.accepted ? <Badge bg="success">{refs[1].data.name}</Badge> : <Badge bg="secondary">{refs[1].data.name}</Badge>)
        }</td> : <td>no ref</td>)}
        {(refs[2] ? <td>{
          (refs[2].data.accepted ? <Badge bg="success">{refs[2].data.name}</Badge> : <Badge bg="secondary">{refs[2].data.name}</Badge>)
        }</td> : <td>no ref</td>)}


        <td>{(!confirmed ? <Button variant="warning" onClick={() => {AcceptGame()}}>Accept Game</Button> : <Button variant="success" onClick={() => {AcceptGame()}}>Game Accepted</Button>)}</td>
      </tr>
    )
}

export default Game
