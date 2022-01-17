import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { getAuth, signOut } from "firebase/auth";






const TopBar = () => {
  const auth = getAuth();

  const logOut = () => {
    signOut(auth).then(() => {
  // Sign-out successful.
  console.log("signed out");
}).catch((error) => {
  // An error happened.
  console.log("err on sign out");
});
  }

    return (
        <div>
          <Navbar bg="light" expand="lg" fixed="top">
            <Container>
              <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/schedule">Schedule</Nav.Link>
                <Nav.Link href="/viewgame">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">My Games</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Availability</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/" onClick={ ()=>{logOut()} }>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        </div>
    )
}

export default TopBar
