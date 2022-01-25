import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { collection, query, where, getDocs, doc, updateDoc, setDoc } from "firebase/firestore";
import { db, } from '../../firebase';
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
  const [ref1, setRef1] = useState(null)
  const [ref2, setRef2] = useState(null)
  const [ref3, setRef3] = useState(null)


  const Assign = () => {
    if (!assigned) {
      setAssigned(true)
      const gameRef = doc(db, "games", id)
      updateDoc(gameRef, {
        assigned: true,
        ref1: ref1,
        ref2: ref2,
        ref3: ref3
      })
      requests.forEach((ref) => {
        if (ref1.id === ref.id || ref2.id === ref.id || ref3.id === ref.id) {
          const gameOfficialsRef = doc(db, "games", id, "requested", ref.id)
          updateDoc(gameOfficialsRef, {
            assigned: true,
          })
          const officialsGamesRef = doc(db, "users", ref.id, "games", id)
          setDoc(officialsGamesRef, {
            game: id,
            accepted: accepted,
            date: jsDate,
          })
          console.log("doc written");
        }
      })
    } else {
      alert("Game Already Assigned, go to edit to make changes")
    }
  }


  // const Assign = async () => {
  //   if (!assigned) {
  //   setAssigned(true)
  //   const gameRef = doc(db, "games", id)
  //     updateDoc(gameRef, {
  //       assigned: true,
  //     })
  //     if (requests.length < 4) {
  //       console.log("requests", requests);
  //       requests.forEach((ref) => {
  //
  //         const gameOfficialsRef = doc(db, "games", id, "requested", ref.id)
  //         updateDoc(gameOfficialsRef, {
  //           assigned: true,
  //         })
  //         const officialsGamesRef = doc(db, "users", ref.id, "games", id)
  //         setDoc(officialsGamesRef, {
  //           game: id,
  //           accepted: accepted,
  //           date: jsDate,
  //         })
  //
  //       console.log("doc written");
  //       })
  //     } else {
  //       console.log("more than 3 refs, still need to set up");
  //     }
  //   } else {
  //     console.log("game already assigned");
  //   }
  //
  // }

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

  const setAssignedRefs = () => {
    const propsdat = props.info.data
    setRef1(propsdat.ref1)
    setRef2(propsdat.ref2)
    setRef3(propsdat.ref3)

  }


  useEffect(() => {
    setAssignedRefs()
    setId(props.info.id)
    let thisDate = new Date(props.info.data.dateTime.seconds * 1000)
    let localDate = thisDate.toLocaleString()
    setJsDate(thisDate)
    setDate(localDate)
    getRequests(props.info.id)
    setAssigned(props.info.data.assigned)
    }, []);

    const dropClick = (id, name, ref) => {

      if(ref === 1) {
        setRef1({
          id: id,
          name: name,
          assigned: true,
        })
      }
      else if (ref === 2) {
        setRef2({
          id: id,
          name: name,
          assigned: true,
        })
      }
      else if (ref === 3) {
        setRef3({
          id: id,
          name: name,
          assigned: true,
        })
      }
    }

    return (
      <tr>
      <td>{date}</td>
      <td>G{props.info.data.grade}</td>
      <td>
        <DropdownButton id="dropdown-basic-button" title={(ref1 ? ref1.name : "ref1")} variant="secondary">
        {
          requests.map((i, index) => {
            return(
              <Dropdown.Item key={index} onClick={ () => {
                  dropClick(i.id, i.name, 1)
                }} >{i.name}</Dropdown.Item>
            )
          })
        }
        </DropdownButton>
      </td>

      <td>
        <DropdownButton id="dropdown-basic-button" title={(ref2 ? ref2.name : "ref2")} variant="secondary">
        {
          requests.map((i, index) => {
            return(
              <Dropdown.Item key={index} onClick={ () => {
                  dropClick(i.id, i.name, 2)
                }} >{i.name}</Dropdown.Item>
            )
          })
        }
        </DropdownButton>
      </td>


      <td>
        <DropdownButton id="dropdown-basic-button" title={(ref3 ? ref3.name : "ref3")} variant="secondary">
        {
          requests.map((i, index) => {
            return(
              <Dropdown.Item key={index} onClick={ () => {
                  dropClick(i.id, i.name, 2)
                }} >{i.name}</Dropdown.Item>
            )
          })
        }
        </DropdownButton>
      </td>


      {(!assigned ?
      <td><Button variant="info" onClick={() => {Assign()}}>Assign</Button></td> : <td><Button variant="success" onClick={() => {Assign()}}>Assigned</Button></td>
    )}

      </tr>
        )
  }



export default GameAssign
