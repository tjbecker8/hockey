import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import './profile.css'
import { auth } from '../../firebase';
import { getAuth, updateProfile } from "firebase/auth";

const Profile = () => {

  const [name, setName] = useState('Tom Becker')
  const [image, setImage] = useState("https://firebasestorage.googleapis.com/v0/b/refsched-7a9be.appspot.com/o/Screen%20Shot%202022-01-17%20at%2012.24.10%20PM.png?alt=media&token=52cfbbac-08ab-4d3e-86a2-387cc438f462")
  const [phone, setPhone] = useState('555-5555')
  const [facebook, setFacebook] = useState('empty link')
  const [email, setEmail] = useState('me@here.com')



  const profileUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(() => {
        // Profile updated!
        // ...
        console.log("profile updated");
      }).catch((error) => {
        // An error occurred
        // ...
        console.log("err updateProfile");
      });
    }

    return (
        <div className="profDiv">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Phone: {phone}</ListGroupItem>
              <ListGroupItem>Facebook: {facebook}</ListGroupItem>
              <ListGroupItem>{email}</ListGroupItem>
              <ListGroupItem>Prefered Contact Method</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link onClick={ () => profileUpdate() } href="#">Update Profile</Card.Link>
              <Card.Link href="#">My Games</Card.Link>
            </Card.Body>
          </Card>

        </div>
    )
}

export default Profile
