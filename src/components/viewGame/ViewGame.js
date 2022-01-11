import React from 'react'
import Stack from 'react-bootstrap/Stack'
import './ViewGame.css'
import Button from 'react-bootstrap/Button'

const ViewGame = () => {
    return (
        <div className='VGDiv'>
        <Stack gap={3}>
          <div className="bg-light border">Date and Time</div>
          <div className="bg-light border">Grade</div>
          <div className="bg-light border">Ref1</div>
          <div className="bg-light border">Ref2/Line</div>
          <div className="bg-light border">Line</div>
          <div className="bg-light border">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat lacus et nisl laoreet aliquet. Sed tincidunt justo a fermentum molestie.</div>
          <Button variant="secondary">Add game notes</Button>
        </Stack>

        </div>
    )
}

export default ViewGame
