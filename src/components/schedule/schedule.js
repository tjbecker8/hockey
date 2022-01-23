import React, { useState, useEffect, useContext, } from 'react';
import Game from './Game.js'
import './Schedule.css';
import { collection, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db, } from '../../firebase';
import Table from 'react-bootstrap/Table'
import { AuthContext } from "../../auth";




//change this to a table on react bootstrap

const Schedule = () => {
  const [games, setGames] = useState([])
  const [id, setId] = useState(1)
  const { currentUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState('')
  const uid = currentUser.uid


  const getGames = async () => {
    const today = new Date()
    const yesterday = today.setDate(today.getDate() - 1)
    const querySnapshot = await getDocs(collection(db, "games"), where("dateTime", ">=", yesterday));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log("game", doc.data());
      setGames(games => [...games, {
        data: doc.data(),
        id: doc.id,
      }])
        });
          }


  const getUserInfo = async (uid) => {
    const userRef = doc(db, "users", uid)
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setDisplayName(docSnap.data().displayName)

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }


  useEffect(() => {
    setId(uid)
    getUserInfo(uid)
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              { games.map((i, index) => {
                return (
               <Game info={i} user={id} displayName={displayName} key={index} />
              )})
            }
            </tbody>
          </Table>




        </div>
    )
}

export default Schedule
