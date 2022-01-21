import React, { useState, useEffect, useContext } from 'react'
import './myGames.css'
import Table from 'react-bootstrap/Table'
import { auth, db, user } from '../../firebase';
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, where, getDocs, collection, } from "firebase/firestore";
import Game from './Game'
import { AuthContext } from "../../auth";

//need option to reject games

const MyGames = () => {
  const [userId, setUserId] = useState('')
  const [gameIds, setGameIds] = useState([])
  const [games, setGames] = useState([])
  const [refs, setRefs] =useState([])
  const { currentUser, loading } = useContext(AuthContext);


  const getMyGames = async (id) => {
    const today = new Date()
    const yesterday = today.setDate(today.getDate() - 1)
    const querySnapshot = await getDocs(collection(db, "users", id, "games"), where("date", ">=", yesterday));

    querySnapshot.forEach( async (doc) => {
      // console.log("working?", doc.data());
      setGames(games => [ ... games, {
        data: doc.data(),
        id: doc.id,
        refs: refs,
      }])
    })
  }

  // const getUserId = async () => {
  // await onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     // console.log("user", uid);
  //     setUserId(uid)
  //     getMyGames(uid)
  //
  //   } else {
  //   console.log("no user");
  //   }
  // });
  // }

  useEffect(() => {
    setUserId(currentUser.uid)
    getMyGames(currentUser.uid)
    }, []);

    return (
        <div className="myGameDiv">
        <h1>MG</h1>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>Date</th>
              <th>Grade</th>
              <th>Ref</th>
              <th>Ref/Line</th>
              <th>Line</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            { games.map((i, index) => {
              return (
             <Game info={i} key={index} uid={userId} />
            )})
          }

            </tbody>
          </Table>
        </div>
    )
}

export default MyGames
