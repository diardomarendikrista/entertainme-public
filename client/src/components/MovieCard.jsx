import React from 'react'
import { Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';

const GET_ENTERTAINME = gql`
  query Entertainme {
    Movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

const DELETE_MOVIE = gql`
  mutation deleteMovie($_id: ID) {
    deleteMovie(_id: $_id) {
      message
    }
  }
`

export default function MovieCard (props) {
  const { movie } = props;
  const history = useHistory();

  const [
    deleteMovie,
    // eslint-disable-next-line
    { data: dataDeleteMovie, loading: loadingDeleteMovie, error: errorDeleteMovie }
  ] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_ENTERTAINME }]
  });

  const formatTags = (tags) => {
    return tags.join(', ')
  }

  const delMovie = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMovie({
          variables: {
            _id: id
          }
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  const editMovie = (id) => {
    history.push(`/editmovie/${id}`);
  }

  return (
    <>
      <Card className="card m-1" style={{ width: '16rem' }}>
        <div className="card-img-zoom">
          <Card.Img className="card-img" variant="top" src={movie.poster_path} />
        </div>
        <Card.Body>
          <Card.Title className="card-title">{ movie.title }</Card.Title>
          <Card.Text className="card-text">
            popularity : { movie.popularity } <br/>
            tags : { formatTags(movie.tags) } <br/>
            overview : { movie.overview } <br/>
          </Card.Text>
          <div className="option-btn">
            <PencilSquare onClick={() => editMovie(movie._id)} style={{ fontSize:25, marginRight:15, color:'cyan' }}/>
            <Trash onClick={() => delMovie(movie._id)} style={{ fontSize:25, color:'red' }}/>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}