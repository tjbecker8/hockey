import React from 'react'
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Game from './Game.js'
import Col from 'react-bootstrap/Col'
import './Schedule.css';




const Schedule = () => {
  const games = [
    {
      date: '12/12/21',
      time: "18:30",
      grade: "t1",
      ref1: "tom",
      ref2: "ted",
      ref3: "rich",
    },
    {
      date: '12/12/22',
      time: "18:30",
      grade: "t1",
      ref1: "tom",
      ref2: "ted",
      ref3: "rich",
    },
    {
      date: '12/12/23',
      time: "18:30",
      grade: "t1",
      ref1: "tom",
      ref2: "ted",
      ref3: "rich",
    }
  ]
    return (
        <div className='topDiv'>
        <Stack gap={3}>
          <Container>
            <Row>
              <Col>Date</Col>
              <Col>Time</Col>
              <Col>Grade</Col>
              <Col>Ref</Col>
              <Col>Ref/Line</Col>
              <Col>Line</Col>
            </Row>

        { games.map((i, index) => {
          return (
         <Game info={i} key={index} />
        )})
      }

        </Container>
        </Stack>

        </div>
    )
}

export default Schedule
