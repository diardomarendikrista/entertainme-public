import React from 'react'
import { Card } from 'react-bootstrap';
import { BookmarkStarFill } from 'react-bootstrap-icons';

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
          <Card.Title><span className="card-title">{ tvSeries.title }</span></Card.Title>
          <Card.Text className="card-text">
            <span className="card-text-param" >tags</span> : { formatTags(tvSeries.tags) } <br/>
            <span className="card-text-param" >overview</span> : { tvSeries.overview } <br/>
          </Card.Text>
          <div className="popularity-tag">
            { tvSeries.popularity }
          </div>
          <div className="btn-favourite">
            <BookmarkStarFill style={{ fontSize:50, color:'#DA1F2C' }} />
          </div>
        </Card.Body>
      </Card>
    </>
  )
}