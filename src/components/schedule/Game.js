import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import './game.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {
  useNavigate
} from "react-router-dom";
import { doc, getDocs, collection, updateDoc, setDoc, query, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import Badge from 'react-bootstrap/Badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser } from '@fortawesome/free-solid-svg-icons'









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
  const [ref1, setRef1] = useState(null)
  const [ref2, setRef2] = useState(null)
  const [ref3, setRef3] = useState(null)


  let navigate = useNavigate();

  const clicked = () => {
    navigate(`/viewgame/${id}`)
  }


  const getRequests = async (i, u) => {
    const docRef = doc(db, "games", i, "requested", u);
    const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const req = docSnap.data().requested
        // console.log("req", req);
        if (req == true ) {
          setRequested(true)
        }
      }
  }

  // const getAccepted = async (i) => {
  //   const q = query(collection(db, "games", i, "requested"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //
  //     setRequests(requests => [ ...requests, {
  //       Name: doc.data().name,
  //       id: doc.id,
  //       accepted: doc.data().accepted,
  //       assigned: doc.data().assigned,
  //       requested: doc.data().requested,
  //     }])
  //     if (doc.data().assigned === true) {
  //
  //       /// assigned and accepted are two different things
  //       setAccepted(accepted => [ ...accepted, {
  //         Name: doc.data().name,
  //         id: doc.id,
  //         accepted: doc.data().accepted,
  //         assigned: doc.data().assigned,
  //         requested: doc.data().requested,
  //       }])
  //     }
  //     if (doc.id === props.user && doc.data().requested === true) {
  //       setRequested(true)
  //     }
  //     if (doc.id === props.user && doc.data().accepted === true) {
  //       setUserAccepted(true)
  //     }
  //   });
  //   setRefresh(true)
  // }

  const theRefs = () => {
    const data = props.info.data
    setRef1(data.ref1)
    setRef2(data.ref2)
    setRef3(data.ref3)
  }



  useEffect(() => {
    console.log("props", props.info.data);
    theRefs()
    setId(props.info.id)
    getRequests(props.info.id, props.user)
    setUserId(props.user)
    // getAccepted(props.info.id)
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
    alert("Game has already been accepted, you are responsible for finding cover if you can no longer do it.")
  }
  }

  const clickEdit = () => {
    navigate(`/editgame/${id}`)
  }




    return (

          <tr className="gameDiv">


            <td>{date}</td>

            <td>{props.info.data.grade}</td>

            {(ref1 ? <td className="acceptedTD">
              <Badge pill bg={(ref1.accepted ? "success" : "secondary")}>
                {ref1.name}
              </Badge>
            </td> : <td></td>
            )}

            {(ref2 ? <td className="acceptedTD">
              <Badge pill bg={(ref2.accepted ? "success" : "secondary")}>
                {ref2.name}
              </Badge>
            </td> : <td></td>
            )}

            {(ref3 ? <td className="acceptedTD">
              <Badge pill bg={(ref3.accepted ? "success" : "secondary")}>
                {ref3.name}
              </Badge>
            </td> : <td></td>
            )}




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
          <td><Button variant="warning" onClick={ () => {clickEdit()} }><FontAwesomeIcon icon={faEraser} size="1x" /></Button></td>
        </tr>




    )
}

export default Game
