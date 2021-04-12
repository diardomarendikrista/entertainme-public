import React from 'react';
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/client';
import MovieFavoriteCard from '../components/MovieFavoriteCard';
import { GET_FAVORITES } from '../queries';

export default function Favorites () {
  const { data, loading, error } = useQuery(GET_FAVORITES);
  const history = useHistory();

  const goToHome = () => {
    history.push('/');
  }

  const emptyFavourite = () => {
    return (
      <div className="favourite-empty text-center">
        <h2 className="text-light">Oh noo...</h2>
        <h3 className="text-light">your favourite list is still empty</h3>
        <button onClick={() => goToHome()} className="btn btn-outline-light">get some favourite</button>
      </div>
    )
  }

  if (loading) return <h1>Loading..</h1>
  if (error) return <h1>Error!</h1>
  return (
    <div class="body">
      <div className="container2">
        <div>
          <p className="text-left favourite-title">Your Favourite</p>
        </div>
        <div className="d-flex flex-wrap justify-content-left">
          { data.favorites.length < 1 ? emptyFavourite() :
            data.favorites?.map(favorite => (
              <MovieFavoriteCard
                movie={favorite}
                key={favorite._id}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}