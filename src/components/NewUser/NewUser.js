import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './newUser.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const NewUser = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

const signUp = () => {
  const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
    console.log("user", user);
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("err", errorCode);
    console.log("errmss", errorMessage);
    // ..
  });

}


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("signup button works");
    signUp()

  }

  const passwordChange = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
    console.log(e.target.value);
  }

  const emailChange =(e) => {
    e.preventDefault()
    setEmail(e.target.value)
    console.log(e.target.value);
  }
    return (
        <div className='newUserDiv'>
        <h3>Sign up for a new account</h3>
        <h5>If you already have an account. Sign in <a id="here">here</a></h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={emailChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={passwordChange} />
            <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, and
            must not contain spaces, special characters, or emoji.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        </div>
    )
}

export default NewUser
