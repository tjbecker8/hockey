import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import './game.css'






const Game = (props) => {
  useEffect(() => {
    console.log("props", props.info.data);
  });

    return (

        <div className="gameDiv"  >

        <Nav.Link href="/viewgame">

          <Row>
            <Col>{props.info.date}</Col>
            <Col>{props.info.data.notes}</Col>
            <Col>{props.info.data.grade}</Col>
            <Col>{props.info.data.ref}</Col>
            <Col>{props.info.data.refline}</Col>
            <Col>{props.info.data.line}</Col>
          </Row>

        </Nav.Link>
        </div>
    )
}

export default Game
