import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import './profile.css'
import { auth, db } from '../../firebase';
import { getAuth, updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";



const Profile = () => {


  const [name, setName] = useState('Tom Becker')
  const [image, setImage] = useState("https://firebasestorage.googleapis.com/v0/b/refsched-7a9be.appspot.com/o/Screen%20Shot%202022-01-17%20at%2012.24.10%20PM.png?alt=media&token=52cfbbac-08ab-4d3e-86a2-387cc438f462")
  const [phone, setPhone] = useState('555-5555')
  const [facebook, setFacebook] = useState('empty link')
  const [email, setEmail] = useState('me@here.com')
  const [userId, setUserId] = useState("1")
  const [isRef, setIsRef] = useState(false)

  const auth = getAuth();




  const getUserInfo =  async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const data = docSnap.data()
      setName(data.displayName)
      setEmail(data.email)
      setPhone(data.phone)
      setIsRef(data.isRef)
      setImage(data.image)
      setFacebook(data.facebook)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }



  const profileUpdate = () => {
    
    }

    useEffect(() => {
      console.log("user", auth.currentUser.uid);
      setUserId(auth.currentUser.uid)
      getUserInfo(auth.currentUser.uid)
    }, [userId]);

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
