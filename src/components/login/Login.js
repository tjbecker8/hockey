import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Login.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  useNavigate
} from "react-router-dom";


//need to add button for sending password reset link to email
const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginAuth= () => {
    const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      console.log("user", user);
      navigate('/schedule')
    // ...
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errCode", errorCode);
        console.log("errmss", errorMessage);
        if (errorCode == "auth/wrong-password") {
          alert("Wrong Password")
        } if (errorCode == "auth/user-not-found") {
          alert("User Not Found")
        }
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
    loginAuth()
  }

  const goToSignUp = () => {
    navigate('/newuser')
  }


    return (
        <div className='loginDiv'>
        <h3>Login</h3>
        <h5>Sign up for an account <a id="here" onClick={ () => {goToSignUp()}}>here</a></h5>
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
          <p>Forgot your Password? Reset it here</p>
        </Form>

        </div>
    )
}

export default Login
