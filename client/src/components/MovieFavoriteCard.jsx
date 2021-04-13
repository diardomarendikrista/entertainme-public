import React from 'react'
import { Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export default function MovieFavoriteCard (props) {
  const { movie } = props;
  const history = useHistory();
  // eslint-disable-next-line

  const formatTags = (tags) => {
    return tags.join(', ')
  }
  
  const goDetailMovie = (id) => {
    history.push(`/movie/${id}`);
  }

  return (
    <>
      <Card className="card m-1" style={{ width: '16rem' }}>
        <div className="card-img-zoom">
          <Card.Img onClick={() => goDetailMovie(movie._id)} className="card-img" variant="top" src={movie.poster_path} />
        </div>
        <Card.Body>
          <Card.Title onClick={() => goDetailMovie(movie._id)}><span className="card-title">{ movie.title }</span></Card.Title>
          <Card.Text className="card-text">
            <span className="card-text-param" >Popularity</span> : { movie.popularity } <br/>
            <span className="card-text-param" >Tags</span> : { formatTags(movie.tags) } <br/>
            <span className="card-text-param" >Overview</span> : { movie.overview } <br/>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}