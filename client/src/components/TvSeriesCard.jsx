import React from 'react'
import { Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { BookmarkStarFill } from 'react-bootstrap-icons';

export default function TvSeriesCard (props) {
  const { tvSeries } = props;
  const history = useHistory();

  const formatTags = (tags) => {
    return tags.join(', ')
  }
  
  const goDetailTvSeries = (id) => {
    history.push(`/tvseries/${id}`);
  }

  return (
    <>
      <Card className="card m-1" style={{ width: '16rem' }}>
        <div className="card-img-zoom">
          <Card.Img onClick={() => goDetailTvSeries(tvSeries._id)} className="card-img" variant="top" src={tvSeries.poster_path} />
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