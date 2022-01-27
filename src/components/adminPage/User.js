import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, } from '../../firebase';

const User = (props) => {
  const [admin, setAdmin] = useState(props.data.admin)
  const [manager, setManager] = useState(props.data.manager)

  const SetAdmin = (uid) => {
    const userRef = doc(db, "users", uid)
    if (admin) {
      updateDoc(userRef, {
        admin: false,
      })
      setAdmin(false)
    } else {
    updateDoc(userRef, {
      admin: true,
    })
    setAdmin(true)
  }}

  const SetManager = (uid) => {
    const userRef = doc(db, "users", uid)
    if (manager) {
      updateDoc(userRef, {
        manager: false,
      })
      setManager(false)
    } else {

    updateDoc(userRef, {
      manager: true,
    })
    setManager(true)
  }}


    return (
      <tr key={props.index}>
        <td>{props.data.displayName}</td>
        <td>{(props.data.admin ? "yes" : "no")}</td>
        <td>{(props.data.leagueManager ? "yes" : "no")}</td>
        <td><Button variant="info" onClick={() => {SetAdmin(props.data.userId)}}>{(admin ? "Remove Admin" : "Add As Admin")}</Button></td>
        <td><Button variant="dark" onClick={() => {SetManager(props.data.userId)}}>{(manager ? "Remove Manager" : "Add As Manager")}</Button></td>
      </tr>
    )
}

export default User
