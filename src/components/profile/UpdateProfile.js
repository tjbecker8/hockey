import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import './profile.css'
import { auth, db, storage } from '../../firebase';
import { getAuth, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const UpdateProfile = () => {

  ///need to change around image, to be urls

  const [name, setName] = useState('Tom Becker')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState("https://firebasestorage.googleapis.com/v0/b/refsched-7a9be.appspot.com/o/Screen%20Shot%202022-01-17%20at%2012.24.10%20PM.png?alt=media&token=52cfbbac-08ab-4d3e-86a2-387cc438f462")
  const [phone, setPhone] = useState('')
  const [facebook, setFacebook] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState("1")
  const [isRef, setIsRef] = useState(false)
  const [imageChange, setImageChange] = useState(false)
  const [progress, setProgress] = useState(0);
  const [newImage, setNewImage] = useState(false)

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
      setUrl(data.image)
      setFacebook(data.facebook)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    console.log("user", auth.currentUser.uid);
    setUserId(auth.currentUser.uid)
    getUserInfo(auth.currentUser.uid)
  }, [userId]);

  const profileUpdate = () => {
      const userRef = doc(db, "users", userId)
        updateDoc(userRef, {
          displayName: name,
          email: email,
          phone: phone,
          facebook: facebook,
          image: url,
          isRef: isRef,
        })
      console.log("Document updated with ID: ", userRef.id);

    }

    const emailChange = (e) => {
      e.preventDefault()
      setEmail(e.target.value)
    }

    const nameChange = (e) => {
      e.preventDefault()
      setName(e.target.value)
    }

    const phoneChange = (e) => {
      e.preventDefault()
      setPhone(e.target.value)
    }

    const facebookChange = (e) => {
      e.preventDefault()
      setFacebook(e.target.value)
    }

    const refChange = () => {
      setIsRef(!isRef)
    }

    const imageUpload = () => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
            profileUpdate()
          });
      }
    );
    }

    const selectImage = (e) => {
      if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setNewImage(true)
    }
    }

    const handleUpdate = (e) => {
      e.preventDefault()
      if (newImage == true) {
        imageUpload()
      } else {
        profileUpdate()
      }
    }


    return (
        <div>
        <div className="profDiv">
        <h2>Update Profile</h2>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Display Name</Form.Label>
              <Form.Control type="text" placeholder='Display Name' onChange={nameChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" onChange={selectImage}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="number" placeholder="Phone" onChange={phoneChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Facebook</Form.Label>
              <Form.Control type="text" placeholder="Facebook Profile" onChange={facebookChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>email</Form.Label>
              <Form.Control type="email" placeholder="email" onChange={emailChange} />
              <Form.Text className="text-muted">
                This will not change your log in, to do that follow this link
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Referee?" checked={isRef} onChange={refChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>

        </div>

        </div>
    )
}

export default UpdateProfile
