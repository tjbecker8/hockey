import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import './game.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'






const Game = (props) => {
  useEffect(() => {
    console.log("props", props.info.data);
  });

    return (

        <div className="gameDiv"  >

        <Nav.Link href="/viewgame">

          <Row>
            <Col>{props.info.date}</Col>
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

        </Nav.Link>
        </div>
    )
}

export default Game
