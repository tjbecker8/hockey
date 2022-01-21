import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import './game.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {
  useNavigate
} from "react-router-dom";
import { doc, getDocs, collection, updateDoc, setDoc, query, } from "firebase/firestore";
import { db } from '../../firebase';
import Badge from 'react-bootstrap/Badge'








const Game = (props) => {

  const [date, setDate] = useState('')
  const [id, setId] = useState('')
  const [requested, setRequested] = useState(false)
  const [userId, setUserId] = useState(null)
  const [accepted, setAccepted] =useState([])
  const [requests, setRequests] = useState([])
  const [userAccepted, setUserAccepted] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [refresh, setRefresh] = useState(false)

  let navigate = useNavigate();

  const clicked = () => {
    navigate(`/viewgame/${id}`)
  }

  // const getRequests = async (i, u) => {
  //   const docRef = doc(db, "games", i, "requested", u);
  //   const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       const req = docSnap.data().requested
  //       // console.log("req", req);
  //       if (req == true ) {
  //         setRequested(true)
  //       }
  //     }
  // }

  const getAccepted = async (i) => {
    const q = query(collection(db, "games", i, "requested"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("req", doc.data());
      setRequests(requests => [ ...requests, {
        Name: doc.data().name,
        id: doc.id,
        accepted: doc.data().accepted,
        assigned: doc.data().assigned,
        requested: doc.data().requested,
      }])
      if (doc.data().assigned === true) {
        console.log("reqtrue", doc.data());
        /// assigned and accepted are two different things
        setAccepted(accepted => [ ...accepted, {
          Name: doc.data().name,
          id: doc.id,
          accepted: doc.data().accepted,
          assigned: doc.data().assigned,
          requested: doc.data().requested,
        }])
      }
      if (doc.id === props.user && doc.data().requested === true) {
        setRequested(true)
      }
      if (doc.id === props.user && doc.data().accepted === true) {
        setUserAccepted(true)
      }
    });
    setRefresh(true)
    console.log(requests);
    console.log("meo", accepted);
  }



  useEffect(() => {

    setId(props.info.id)
    // getRequests(props.info.id, props.user)
    setUserId(props.user)
    getAccepted(props.info.id)
    setDisplayName(props.displayName)

    // console.log("game user Id", props.user);
    let thisDate = new Date(props.info.data.dateTime.seconds * 1000)
    let localDate = thisDate.toLocaleString()
    setDate(localDate)
  }, []);





  const clickRequest = async () => {

    const gameRef = doc(db, "games", id, "requested", userId)
    if (!userAccepted) {
    if (!requested) {
    setRequested(!requested)
      await setDoc(gameRef, {
        user: userId,
        requested: true,
        name: displayName,
        accepted: false,
      })
    const gRef = doc(db, "games", id)
    await updateDoc(gRef, {
      assigned: false,
    })
    } else {
      await updateDoc(gameRef, {
        requested: false,
      })
      setRequested(!requested)
    }
  } else {
    alert("Game has already been acepted, you are responsible for finding cover if you can no longer do it.")
  }
  }





    return (

          <tr className="gameDiv">


            <td>{date}</td>

            <td>{props.info.data.grade}</td>

            {(requests[0] && requests[0].assigned === true ? <td className="acceptedTD">
              <Badge pill bg={(requests[0].accepted ? "success" : "secondary")}>
                {requests[0].Name}
              </Badge>
            </td> : <td></td>)}

            {(requests[1] && requests[1].assigned === true ? <td className="acceptedTD">
              <Badge pill bg={(requests[1].accepted ? "success" : "secondary")}>
                {requests[1].Name}
              </Badge>
            </td> : <td></td>)}
            {(requests[2] && requests[2].assigned === true ? <td className="acceptedTD">
              <Badge pill bg={(requests[2].accepted ? "success" : "secondary")}>
                {requests[2].Name}
              </Badge>
            </td> : <td></td>)}
            <td>
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{props.info.data.notes}</Tooltip>}>
                <span className="d-inline-block">
                  <p className="gameP" onClick={ () => {clicked()} }>
                    Notes
                  </p>
                </span>
              </OverlayTrigger>
            </td>


            <td>{
                (requested != true ? <Button variant="primary" onClick={ () => {clickRequest()} } >Request</Button> :
                <Button variant="success" onClick={ () => {clickRequest()} } >Requested</Button>)
            }</td>
        </tr>




    )
}

export default Game
