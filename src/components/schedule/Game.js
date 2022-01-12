import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Game = (props) => {
    return (
        <div>

          <Row>
            <Col>{props.info.date}</Col>
            <Col>{props.info.time}</Col>
            <Col>{props.info.grade}</Col>
            <Col>{props.info.ref1}</Col>
            <Col>{props.info.ref2}</Col>
            <Col>{props.info.ref3}</Col>
          </Row>

        </div>
    )
}

export default Game
