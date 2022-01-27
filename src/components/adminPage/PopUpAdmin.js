import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUserMinus, faUsers, faToiletPaper, faUserLock } from '@fortawesome/free-solid-svg-icons'
import Table from 'react-bootstrap/Table'
import User from './User'

const PopUpAdmin = () => {

  const [refs, setRefs] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"))
    querySnapshot.forEach((doc) => {
      console.log("gotten");
      setRefs(refs => [...refs, {
        data: doc.data(),
        id: doc.id,
      }])
    });
  }


  useEffect(() => {
    getUsers()
  }, [])


    return (
        <div>
        <Button variant="light" onClick={handleShow}>
          <FontAwesomeIcon icon={faToiletPaper} size="6x" />
          <h4>Manage Admin</h4>
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Set Admins</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Admin</th>
                  <th>League</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  refs.map((i, index) => {
                    console.log("i", i.data);
                    return(
                      <User key={index} data={i.data} />
                    )})
                }
              </tbody>
            </Table>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>`
      </Modal>

        </div>
    )
}

export default PopUpAdmin
