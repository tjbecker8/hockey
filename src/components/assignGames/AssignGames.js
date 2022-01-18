import React from 'react'
import './assignGames.css'
import Table from 'react-bootstrap/Table'
import GameAssign from './GameAssign'

const AssignGames = () => {
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
              <GameAssign />
              <GameAssign />
              <GameAssign />
            </tbody>
          </Table>
        </div>
    )
}

export default AssignGames
