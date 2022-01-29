import React, { useContext, useEffect } from 'react'
import './homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faAddressCard, faHockeyPuck, faBlind, faDumpsterFire, faEraser, faTrashAlt, faSkating, faFingerprint } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth";


const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser, loading, admin, manager } = useContext(AuthContext);

  useEffect(() => {
    console.log("admin", admin);
    console.log("manager", manager);
  }, [])

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
                  <FontAwesomeIcon icon={faSkating} size="6x" />
                  <h4>My Games</h4>
                </div>
              </Col>

              {(admin ?
              <Col className="colHome">
                <div onClick={() => {click("assigngames")}}>
                  <FontAwesomeIcon icon={faBlind} size="6x" />
                  <h4>Assign Games</h4>
                </div>
              </Col>
              : <div></div>)}

              {(admin || manager ?
              <Col className="colHome">
                <div onClick={() => {click("newgame")}}>
                  <FontAwesomeIcon icon={faDumpsterFire} size="6x" />
                  <h4>New Game</h4>
                </div>
              </Col> : <div></div>
              )}
              {( admin ?
              <Col className="colHome">
                <div onClick={() => {click("admin")}}>
                  <FontAwesomeIcon icon={faFingerprint} size="6x" />
                  <h4>Admin</h4>
                </div>
              </Col> : <div></div>
              )}

            </Row>
          </Container>




        </div>
    )
}

export default HomePage
