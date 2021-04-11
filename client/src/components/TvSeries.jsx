import React from 'react'
import { Card } from 'react-bootstrap';

export default function MovieCard (props) {
  const { tvSeries } = props;

  const formatTags = (tags) => {
    return tags.join(', ')
  }

  return (
    <>
      <Card className="card m-1" style={{ width: '16rem' }}>
        <div className="card-img-zoom">
          <Card.Img className="card-img" variant="top" src={tvSeries.poster_path} />
        </div>
        <Card.Body>
          <Card.Title className="card-title">{ tvSeries.title }</Card.Title>
          <Card.Text className="card-text">
            popularity : { tvSeries.popularity } <br/>
            tags : { formatTags(tvSeries.tags) } <br/>
            overview : { tvSeries.overview } <br/>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}