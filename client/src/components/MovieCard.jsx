import React from 'react'
import { Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Trash, PencilSquare, BookmarkStarFill } from 'react-bootstrap-icons';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { cache } from '../config/graphql'
import {
  GET_ENTERTAINME,
  DELETE_MOVIE,
  GET_FAVORITES
 } from '../queries';

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

  const setFavourite = (movie) => {
    const existingData = cache.readQuery({
      query: GET_FAVORITES
    })

    const alreadyFavorited = existingData.favorites.find(favorite => favorite._id === movie._id)
    if (!alreadyFavorited) {
      cache.writeQuery({
        query: GET_FAVORITES,
        data: {
          favorites: [movie, ...existingData.favorites]
        }, 
      });
      Swal.fire(
        'Favorited!',
        `${movie.title} added to your favorites!`,
        'success'
      );
    } else {
      Swal.fire(
        '',
        `${movie.title} already on your favorites!`,
        'info'
      );
    }
  }

  return (
    <>
      <Card className="card m-1" style={{ width: '16rem' }}>
        <div className="card-img-zoom">
          <Card.Img className="card-img" variant="top" src={movie.poster_path} />
        </div>
        <Card.Body>
          <Card.Title><span className="card-title">{ movie.title }</span></Card.Title>
          <Card.Text className="card-text">
            <span className="card-text-param" >Tags</span> : { formatTags(movie.tags) } <br/>
            <span className="card-text-param" >Overview</span> : { movie.overview } <br/>
          </Card.Text>
          <div className="popularity-tag">
            { movie.popularity }
          </div>
          <div className="btn-favourite">
            <BookmarkStarFill onClick={() => setFavourite(movie)} style={{ fontSize:50, color:'#DA1F2C' }} />
          </div>
          <div className="option-btn">
            <PencilSquare onClick={() => editMovie(movie._id)} style={{ fontSize:25, marginRight:15, color:'cyan' }}/>
            <Trash onClick={() => delMovie(movie._id)} style={{ fontSize:25, color:'red' }}/>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}