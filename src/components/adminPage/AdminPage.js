import React from 'react'
import './adminPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUserMinus, faUsers, faToiletPaper, faUserLock } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
  useNavigate
} from "react-router-dom";
import PopUpAdmin from "./PopUpAdmin"

const AdminPage = () => {

  const navigate = useNavigate();

  const click = (input) => {
    navigate('/'+input)
  }


    return (
        <div className="adminDiv">

        <h2>Admin Page</h2>

        <Container className="containerHome">
          <Row>
            <Col className="colHome">
              <div onClick={() => {click("addadmin")}}>
                <FontAwesomeIcon icon={faUserLock} size="6x" />
                <h4>Manage Admin</h4>
              </div>
            </Col>
            <Col className="colHome">
              <div onClick={() => {click("profile")}}>
                <FontAwesomeIcon icon={faUsers} size="6x" />
                <h4>Manage Users</h4>
              </div>
            </Col>
            <Col className="colHome">
              <div onClick={() => {click("profile")}}>
                <FontAwesomeIcon icon={faToiletPaper} size="6x" />
                <h4>Manage League Admin</h4>
              </div>
            </Col>

            <Col className="colHome">
              <PopUpAdmin />
            </Col>



          </Row>
        </Container>


        </div>
    )
}

export default AdminPage
