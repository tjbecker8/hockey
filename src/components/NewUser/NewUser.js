import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './newUser.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc, } from "firebase/firestore";
import { db } from '../../firebase';


const NewUser = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userId, setUserId] = useState("")
  const [displayName, setDisplayName] = useState('')
  const [isRef, setIsRef] = useState(false)

  const addUserDb = async (id) => {
    await setDoc(doc(db, "users", id), {
      displayName: displayName,
      userId: id,
      isRef: isRef,
      image: "https://firebasestorage.googleapis.com/v0/b/refsched-7a9be.appspot.com/o/Screen%20Shot%202022-01-17%20at%2012.24.10%20PM.png?alt=media&token=52cfbbac-08ab-4d3e-86a2-387cc438f462",
      phone: null,
      facebook: null,
      email: email,
    });
    console.log("Document written");
  }

const signUp = () => {
  const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    const uid = user.uid
    setUserId(uid)
    addUserDb(uid)

    // ...
    console.log("user", user);
    console.log("uid", uid);
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

  const nameChange =(e) => {
    e.preventDefault()
    setDisplayName(e.target.value)
    console.log(e.target.value);
  }

  const refChange = () => {
    setIsRef(!isRef)
  }
    return (
        <div className='newUserDiv'>
        <h3>Sign up for a new account</h3>
        <h5>If you already have an account. Sign in <a id="here">here</a></h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Display Name</Form.Label>
            <Form.Control type="text" placeholder="Display Name" onChange={nameChange} />
              <Form.Text className="text-muted">
                Your name to be displayed on the site and schedule
              </Form.Text>
          </Form.Group>



          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={emailChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={passwordChange} />
            <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, and
            must not contain spaces, special characters, or emoji. *need to do test for this, aand add alert
            </Form.Text>
          </Form.Group>
          <input type="checkbox" value="Ref" name="Referee" checked={isRef} onChange={refChange} /> Referee?
            <br></br>
            <br></br>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        </div>
    )
}

export default NewUser
