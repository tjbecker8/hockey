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
    const arr = []
    const querySnapshot = await getDocs(collection(db, "games"), where("dateTime", ">=", yesterday));
    querySnapshot.forEach((doc) => {
      arr.push({
        data: doc.data(),
        id: doc.id,
        date: new Date(doc.data().dateTime * 1000)
      })
        });
        const sorted = arr.sort((a, b) => a.date - b.date)
        setGames(sorted)
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
            </tbody>
          </Table>
        </div>
    )
}

export default AssignGames
