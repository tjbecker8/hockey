import React, { useContext, useEffect, useState } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { AuthContext } from "../../auth";
import { getAuth, signOut } from "firebase/auth";






const TopBar = () => {
  const auth = getAuth();
  const { currentUser, loading } = useContext(AuthContext);
  const [user, setUser] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

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
              <Navbar.Brand href="/">CIHRA Schedule</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {( !currentUser ?
                    <Nav.Link href="/schedule">Schedule</Nav.Link> : <Nav.Link href="/login"></Nav.Link>
                  )}

                {(!currentUser ? <Nav.Link href="/login">Login/SignUp</Nav.Link>
                  :
              <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item href="/mygames">My Games</NavDropdown.Item>
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href="/" onClick={ ()=>{logOut()} }>Logout</NavDropdown.Item>
              </NavDropdown>
              )}
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        </div>
    )
}

export default TopBar
