import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import './game.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {
  Link,
  useNavigate
} from "react-router-dom";
import { doc, getDoc, Timestamp, getDocs, collection, updateDoc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';








const Game = (props) => {

  const [date, setDate] = useState('')
  const [id, setId] = useState('')
  const [requested, setRequested] = useState(false)
  const [userId, setUserId] = useState(null)

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



  useEffect(() => {

    setId(props.info.id)
    getRequests(props.info.id, props.user)
    setUserId(props.user)
    // console.log("game user Id", props.user);
    let thisDate = new Date(props.info.data.dateTime.seconds * 1000)

    let localDate = thisDate.toLocaleString()
    console.log("local", localDate);
    setDate(localDate)
  }, []);


//need to add update to individual user profile to find games faster
  const clickRequest = () => {
    console.log("request clicked");
    const gameRef = doc(db, "games", id, "requested", userId)
    if (!requested) {
    setRequested(!requested)
      setDoc(gameRef, {
        user: userId,
        requested: true
      })
    } else {
      setDoc(gameRef, {
        user: userId,
        requested: false
      })
      setRequested(!requested)
    }
  }





    return (

        <div className="gameDiv" >



          <Row>


            <Col>{date}</Col>

            <Col>{props.info.data.grade}</Col>
            <Col>{props.info.data.ref}</Col>
            <Col>{props.info.data.refline}</Col>
            <Col>{props.info.data.line}</Col>
            <Col>
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{props.info.data.notes}</Tooltip>}>
                <span className="d-inline-block">
                  <p className="gameP" onClick={ () => {clicked()} }>
                    Notes
                  </p>
                </span>
              </OverlayTrigger>
            </Col>


            <Col>{
                (requested != true ? <Button variant="primary" onClick={ () => {clickRequest()} } >Request</Button> :
                <Button variant="success" onClick={ () => {clickRequest()} } >Requested</Button>)
            }</Col>
          </Row>



        </div>
    )
}

export default Game
