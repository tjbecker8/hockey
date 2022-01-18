import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const GameAssignVerify = () => {

  const [date, setDate] = useState('')
  const [id, setId] = useState('')
  const [assigned, setAssigned] = useState(false)

  const Assign = () => {
    setAssigned(!assigned)
  }

    return (
          <div>
            <td>Date</td>
            <td>grade</td>
            <td>
              <DropdownButton id="dropdown-basic-button" title="Ref" variant="secondary">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </td>
            <td>
              <DropdownButton id="dropdown-basic-button" title="Ref/Line" variant="secondary">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </td>
            <td>
              <DropdownButton id="dropdown-basic-button" title="Line" variant="secondary">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </td>
            {(!assigned ?
            <td><Button variant="info" onClick={() => {Assign()}}>Assign</Button></td> : <td><Button variant="success" onClick={() => {Assign()}}>Assigned</Button></td>
          )}
        </div>
    )
}

export default GameAssignVerify
