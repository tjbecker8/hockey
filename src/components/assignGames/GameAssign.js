import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth, } from '../../firebase';
import GameAssignVerify from './GameAssignVerify'

const GameAssign = (props) => {

  const [date, setDate] = useState('')
  const [id, setId] = useState('')
  const [assigned, setAssigned] = useState(false)
  const [requests, setRequests] = useState([])




  const Assign = () => {
    setAssigned(!assigned)
  }

  const getRequests = async (i) => {
    const q = query(collection(db, "games", i, "requested"), where("requested", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setRequests(requests => [... requests, {
        data: doc.data(),
        id: doc.id,
        name: doc.data().name
      }])

      console.log(doc.id, " => ", doc.data());
    });

  }

  useEffect(() => {
    console.log("mm", requests.length);
    setId(props.info.id)
    let thisDate = new Date(props.info.data.dateTime.seconds * 1000)
    let localDate = thisDate.toLocaleString()
    setDate(localDate)
    getRequests(props.info.id)
    }, []);

    return (
      <tr>
      <td>{date}</td>
      <td>G{props.info.data.grade}</td>
      <td>ref</td>
      <td>ref</td>
      <td>line</td>
      {(!assigned ?
      <td><Button variant="info" onClick={() => {Assign()}}>Assign</Button></td> : <td><Button variant="success" onClick={() => {Assign()}}>Assigned</Button></td>
    )}

      </tr>
        )
  }



export default GameAssign
