import React from 'react'
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Game from './Game.js'

const games = [1, 1, 1, 1, 1]


const Schedule = () => {
    return (
        <div>
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
            {(games.length > 0 ) ? (
        { games.map((i) => {
          return (
         <Game key={i}/>
        )})
      }
      </div>
      </div>
    ) : <p>Games is not greater than 0 </p>}
        </Container>
        </Stack>

        </div>
    )
}

export default Schedule
