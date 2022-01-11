import React, { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import './ViewGame.css'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'

const ViewGame = () => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState('This is a test')



  const addNotes = (e) => {
    e.preventDefault()
    setNotes(e.target.value)
  }

  const exited = () => {
    console.log("exited the notes");
  }

    return (
        <div className='VGDiv'>
        <Stack gap={3}>
          <div className="bg-light border">Date and Time</div>
          <div className="bg-light border">Grade</div>
          <div className="bg-light border">Ref1</div>
          <div className="bg-light border">Ref2/Line</div>
          <div className="bg-light border">Line</div>
          <div className="bg-light border">{notes}</div>
          <Button
            variant="secondary"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            >
            Add game notes
          </Button>
          <Collapse in={open} onExited={exited}>
            <div>
              <Form.Control as="textarea" rows={4} defaultValue={notes} onChange={addNotes} />
              <Button onClick={() => setOpen(!open)} >Done</Button>
            </div>
          </Collapse>
        </Stack>

        </div>
    )
}

export default ViewGame
