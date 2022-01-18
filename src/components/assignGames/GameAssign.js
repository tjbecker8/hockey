import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'

const GameAssign = (props) => {

  const [date, setDate] = useState('')
  const [id, setId] = useState('')
  const [assigned, setAssigned] = useState(false)


  const Assign = () => {
    setAssigned(!assigned)
  }

  useEffect(() => {
    console.log("mm", props.info.data);
    setId(props.info.id)
    let thisDate = new Date(props.info.data.dateTime.seconds * 1000)
    let localDate = thisDate.toLocaleString()
    setDate(localDate)
    }, []);

    return (

          <tr>
            <td>{date}</td>
            <td>G{props.info.data.grade}</td>
            <td>ref</td>
            <td>ref</td>
            <td>line</td>

            {(!assigned ?
            <td><Button variant="info" onClick={() => {Assign()}}>Assign</Button></td> : <td><Button variant="success" onClick={() => {Assign()}}>Assigned</Button></td>
          )}

          </tr>

    )
}

export default GameAssign
