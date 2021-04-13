import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { cache } from '../config/graphql'
import Swal from 'sweetalert2';
import Loader from "react-loader-spinner";
import MovieCard from '../components/MovieCard';
import {
  GET_MOVIE_ID,
  GET_ENTERTAINME,
  GET_FAVORITES
 } from '../queries';

export default function DetailMovie () {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_MOVIE_ID, {
    variables: { id }
  })

  const { data: entertainmeData, loading: entertainmeLoading } = useQuery(GET_ENTERTAINME);

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

  if (loading || entertainmeLoading) {
    return (
      <div className="body">
        <div className="center-mid">
          <Loader type="Rings" color="#C01E2B" height={80} width={80} />
        </div>
      </div>
    );
  }
  return (
    <div className="body">
      <div className="container">
        <div className="detail">
          <div>
            <img className="detail-img" src={data.Movie.poster_path} alt={data.Movie.title} />
          </div>
          <div className="detail-info">
            <p className="detail-title">{data.Movie.title}</p>
            <hr/>
            <h3 className="detail-overview">OVERVIEW</h3> 
            <p>{data.Movie.overview}</p>
            <p><span className="detail-sub">Tags</span> : {data.Movie.tags.join(', ')}</p>
            <p><span className="detail-sub">Popularity</span> : {data.Movie.popularity}</p>
            <button onClick={() => setFavourite(data.Movie)} className="btn btn-danger">Favourite</button>
          </div>
        </div>
        <h3 className="sub-title">Other Movies</h3>
        <div className="flex-container">
          {
            entertainmeData.Movies.map(movie => (
              <div className="flex-item">
                <MovieCard
                  movie={movie}
                  key={movie._id}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
   )
 }