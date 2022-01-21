import React from 'react'
import './homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faAddressCard, faHockeyPuck, faBlind } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
  useNavigate
} from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const click = (input) => {
    navigate('/'+input)
  }
    return (
        <div className="home">

        <h1>CHIRA Scheduling App</h1>
          <Container className="containerHome">
            <Row>
              <Col className="colHome">
                <div onClick={() => {click("schedule")}}>
                  <FontAwesomeIcon icon={faCalendarAlt} size="6x" />
                  <h4>Schedule</h4>
                </div>
              </Col>
              <Col className="colHome">
                <div onClick={() => {click("profile")}}>
                  <FontAwesomeIcon icon={faAddressCard} size="6x" />
                  <h4>Profile</h4>
                </div>
              </Col>
              <Col className="colHome">
                <div onClick={() => {click("mygames")}}>
                  <FontAwesomeIcon icon={faHockeyPuck} size="6x" />
                  <h4>My Games</h4>
                </div>
              </Col>
              <Col className="colHome">
                <div onClick={() => {click("assigngames")}}>
                  <FontAwesomeIcon icon={faBlind} size="6x" />
                  <h4>Assign Games</h4>
                </div>
              </Col>
            </Row>
          </Container>




        </div>
    )
}

export default HomePage
