import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, auth, } from '../../firebase';
import GameAssignVerify from './GameAssignVerify'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const GameAssign = (props) => {

  const [date, setDate] = useState('')
  const [id, setId] = useState('')
  const [assigned, setAssigned] = useState(false)
  const [requests, setRequests] = useState([])
  const [test, setTest] = useState([{
    name: "one",
    id: 1,
  }, {
    name: "two",
    id: 2,
  }, {
    name: "three",
    id: 4,
  }, {
    name: "four",
    id: 5,
  }, {
    name: "five",
    id: 5,
  }
])




  const Assign = async () => {
    setAssigned(!assigned)
    const gameRef = doc(db, "games", id)
      updateDoc(gameRef, {
        assigned: true,
      })
      if (requests.length < 4) {
        requests.foreach((ref) => {
          const gameOfficialsRef = doc(db, "games", id, "officials", ref.id), {
            user: ref.id,
            name: ref.name,
            assigned: true,
            accepted: false,
          }
        })
      } else {
        console.log("more than 3 refs, still need to set up");
      }

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
    });

  }

  useEffect(() => {
    console.log("test", test[1].name);
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
