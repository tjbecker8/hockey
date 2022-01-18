import React, { useState, useEffect } from 'react';
import './assignGames.css'
import Table from 'react-bootstrap/Table'
import GameAssign from './GameAssign'
import GameAssignVerify from './GameAssignVerify'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth, } from '../../firebase';

const AssignGames = () => {

  const [games, setGames] = useState([])

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

    useEffect(() => {
      getGames()
      }, []);

    return (
        <div className="AGDiv">
        <h1>AG</h1>
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
             <GameAssign info={i} key={index} />
            )})
          }
              <GameAssign />
              <GameAssign />
              <GameAssign />
              <GameAssignVerify />
            </tbody>
          </Table>
        </div>
    )
}

export default AssignGames
