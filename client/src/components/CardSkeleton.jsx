import React from 'react';
import { Card } from 'react-bootstrap';

export default function MovieCard () {
  return (
    <>
      <Card className="m-1" style={{ width: '16rem', backgroundColor: 'gray' }}>
        <div className="card-img-zoom">
        </div>
        <Card.Body>
          <Card.Title> </Card.Title>
          <Card.Text className="card-text">
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}