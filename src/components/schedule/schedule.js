import React, { useState, useEffect, useContext, } from 'react';
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Game from './Game.js'
import Col from 'react-bootstrap/Col'
import './Schedule.css';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth, } from '../../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Table from 'react-bootstrap/Table'
import { AuthContext } from "../../auth";




//change this to a table on react bootstrap

const Schedule = () => {
  const [games, setGames] = useState([])
  const [id, setId] = useState(1)
  const { currentUser, loading } = useContext(AuthContext);

  const getGames = async () => {
    const today = new Date()
    const yesterday = today.setDate(today.getDate() - 1)
    const querySnapshot = await getDocs(collection(db, "games"), where("dateTime", ">=", yesterday));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log("game", doc.data());
      setGames(games => [ ... games, {
        data: doc.data(),
        id: doc.id,
      }])
        });
          }

  // const getUser = async () => {
  // await onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     // console.log("user", uid);
  //     setId(uid)
  //     getGames()
  //   } else {
  //   console.log("no user");
  //   }
  // });
  // }

  useEffect(() => {
    setId(currentUser.uid)
    getGames()
  }, []);





    return (
        <div className='topDiv'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Grade</th>
                <th>Ref</th>
                <th>Ref/Line</th>
                <th>Line</th>
                <th>notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { games.map((i, index) => {
                return (
               <Game info={i} user={id} key={index} />
              )})
            }
            </tbody>
          </Table>




        </div>
    )
}

export default Schedule
