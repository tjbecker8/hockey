import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import './game.css'






const Game = (props) => {


    return (

        <div className="gameDiv"  >
        <Nav.Link href="/viewgame">

          <Row>
            <Col>{props.info.date}</Col>
            <Col>{props.info.time}</Col>
            <Col>{props.info.grade}</Col>
            <Col>{props.info.ref1}</Col>
            <Col>{props.info.ref2}</Col>
            <Col>{props.info.ref3}</Col>
          </Row>

        </Nav.Link>
        </div>
    )
}

export default Game
