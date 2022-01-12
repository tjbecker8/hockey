import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Login.css'


//need to add button for sending password reset link to email
const Login = () => {
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
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        </div>
    )
}

export default Login
