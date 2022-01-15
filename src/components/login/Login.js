import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Login.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



//need to add button for sending password reset link to email
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginAuth= () => {
    const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
    // ...
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const passwordChange = (e) => {
    e.preventDefault()
    setPassword(e.target.value)

  }

  const emailChange =(e) => {
    e.preventDefault()
    setEmail(e.target.value)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("login button works");
  }


    return (
        <div className='loginDiv'>
        <h3>Login</h3>
        <h5>Sign up for an account <a id="here">here</a></h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={emailChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={passwordChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        </div>
    )
}

export default Login
