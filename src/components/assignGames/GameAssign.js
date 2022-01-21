import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { collection, query, where, getDocs, doc, updateDoc, setDoc } from "firebase/firestore";
import { db, auth, } from '../../firebase';
import GameAssignVerify from './GameAssignVerify'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const GameAssign = (props) => {

  const [date, setDate] = useState('')
  const [id, setId] = useState('')
  const [assigned, setAssigned] = useState(false)
  const [requests, setRequests] = useState([])
  const [refId, setRefId] = useState('')
  const [refName, setRefName] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [jsDate, setJsDate] = useState(null)




  const Assign = async () => {
    if (!assigned) {
    setAssigned(!assigned)
    const gameRef = doc(db, "games", id)
      updateDoc(gameRef, {
        assigned: true,
      })
      if (requests.length < 4) {
        console.log("requests", requests);
        requests.forEach((ref) => {

          const gameOfficialsRef = doc(db, "games", id, "requested", ref.id)
          updateDoc(gameOfficialsRef, {
            assigned: assigned,
          })
          const officialsGamesRef = doc(db, "users", ref.id, "games", id)
          setDoc(officialsGamesRef, {
            game: id,
            accepted: accepted,
            date: jsDate,
          })

        console.log("doc written");
        })
      } else {
        console.log("more than 3 refs, still need to set up");
      }
    } else {
      console.log("game already assigned");
    }

  }

  const getRequests = async (i) => {
    const q = query(collection(db, "games", i, "requested"), where("requested", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("****", doc.data());
      setRequests(requests => [... requests, {
        data: doc.data(),
        id: doc.id,
        name: doc.data().name
      }])
    });

  }

  useEffect(() => {

    setId(props.info.id)
    let thisDate = new Date(props.info.data.dateTime.seconds * 1000)
    let localDate = thisDate.toLocaleString()
    setJsDate(thisDate)
    setDate(localDate)
    getRequests(props.info.id)
    setAssigned(props.info.data.assigned)
    }, []);

    return (
      <tr>
      <td>{date}</td>
      <td>G{props.info.data.grade}</td>
      {(requests.length < 4 ? <td>{(requests[0] != undefined ? requests[0].name : "ref")}</td> : <td>
        <DropdownButton id="dropdown-basic-button" title="Ref" variant="secondary">
        {
          requests.map((i, index) => {
            return(
              <Dropdown.Item href="#/action-1">{i.name}</Dropdown.Item>
            )
          })
        }
        </DropdownButton>
      </td> )}

      {(requests.length < 4 ? <td>{(requests[1] != undefined ? requests[1].name : "ref/line")}</td> : <td>
        <DropdownButton id="dropdown-basic-button" title="Ref" variant="secondary">
        {
          requests.map((i, index) => {
            return(
              <Dropdown.Item href="#/action-1">{i.name}</Dropdown.Item>
            )
          })
        }
        </DropdownButton>
      </td> )}


      {(requests.length < 4 ? <td>{(requests[2] != undefined ? requests[2].name : "line")}</td> : <td>
        <DropdownButton id="dropdown-basic-button" title="Ref" variant="secondary">
        {
          requests.map((i, index) => {
            return(
              <Dropdown.Item href="#/action-1">{i.name}</Dropdown.Item>
            )
          })
        }
        </DropdownButton>
      </td> )}


      {(!assigned ?
      <td><Button variant="info" onClick={() => {Assign()}}>Assign</Button></td> : <td><Button variant="success" onClick={() => {Assign()}}>Assigned</Button></td>
    )}

      </tr>
        )
  }



export default GameAssign
