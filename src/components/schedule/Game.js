import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import './game.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {
  Link
} from "react-router-dom";






const Game = (props) => {

  const [date, setDate] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {

    setId(props.info.id)
  console.log("id", id);
    let thisDate = new Date(props.info.data.dateTime.seconds * 1000)
    setDate(thisDate.toISOString().split(':', 2).join(":"))
  });

    return (

        <div className="gameDiv"  >

        <Link to={`/viewgame/${id}`}>

          <Row>
            <Col>{date}</Col>
            <Col>{props.info.data.grade}</Col>
            <Col>{props.info.data.ref}</Col>
            <Col>{props.info.data.refline}</Col>
            <Col>{props.info.data.line}</Col>
            <Col>
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{props.info.data.notes}</Tooltip>}>
                <span className="d-inline-block">
                  <p>
                    Notes
                  </p>
                </span>
              </OverlayTrigger>


            </Col>
          </Row>

        </Link>
        </div>
    )
}

export default Game
