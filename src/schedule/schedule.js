import React from 'react'
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


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
          </Container>
        </Stack>

        </div>
    )
}

export default Schedule
