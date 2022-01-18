import React from 'react'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const GameAssignVerify = () => {
    return (

          <tr>
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
            <td><Button variant="info">Assign</Button></td>
          </tr>
    )
}

export default GameAssignVerify
