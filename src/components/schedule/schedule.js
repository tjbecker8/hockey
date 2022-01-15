import React, { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Game from './Game.js'
import Col from 'react-bootstrap/Col'
import './Schedule.css';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase';



//change this to a table on react bootstrap

const Schedule = () => {
  const [games, setGames] = useState([])
  const [id, setid] = useState(1)

  const getGames = async () => {
    const today = new Date()
    const yesterday = today.setDate(today.getDate() - 1)
    const querySnapshot = await getDocs(collection(db, "games"), where("dateTime", ">=", yesterday));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setGames(games => [ ... games, { //not working//
        data: doc.data(),
        id: doc.id,
      }])
      console.log("info", doc.id, " => ", doc.data());
});

  }

  useEffect(() => {
    getGames()
  }, [id]);

  const gamesTest = [
    {
      date: '12/12/21',
      time: "18:30",
      grade: "t1",
      ref1: "tom",
      ref2: "ted",
      ref3: "rich",
    },
    {
      date: '12/12/22',
      time: "18:30",
      grade: "t1",
      ref1: "tom",
      ref2: "ted",
      ref3: "rich",
    },
    {
      date: '12/12/23',
      time: "18:30",
      grade: "t1",
      ref1: "tom",
      ref2: "ted",
      ref3: "rich",
    }
  ]



    return (
        <div className='topDiv'>
          <h3>{games.length}</h3>
        <Stack gap={3}>
          <Container>
            <Row>
              <Col>Date</Col>
              <Col>Time</Col>
              <Col>Grade</Col>
              <Col>Ref</Col>
              <Col>Ref/Line</Col>
              <Col>Line</Col>
            </Row>

        { games.map((i, index) => {
          return (
         <Game info={i} key={index} />
        )})
      }

        </Container>
        </Stack>

        </div>
    )
}

export default Schedule
