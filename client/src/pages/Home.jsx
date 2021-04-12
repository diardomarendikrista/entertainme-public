import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { PlusCircle  } from 'react-bootstrap-icons';
import MovieCard from '../components/MovieCard';
import TvSeries from '../components/TvSeriesCard';
import {
  GET_ENTERTAINME,
 } from '../queries';

export default function Home (props) {
  const { data, loading } = useQuery(GET_ENTERTAINME);
  const history = useHistory();

  useEffect( _ => {
    document.title = 'Entertainme';
  }, [])

  const showAddMovie = () => {
    history.push('/addmovie');
  }

  if (loading) return <h1>loading movie</h1>
  else
  return (
    <div class="body">
      <div className="container2">
        <div>
          <h3 className="sub-title">Movie <button onClick={() => showAddMovie()} className="btn btn-danger"><PlusCircle style={{marginBottom:4, fontSize:20}}/> add</button></h3>
        </div>
        <div className="flex-container">
          {
            data.Movies.map(movie => (
              <div className="flex-item">
                <MovieCard
                  movie={movie}
                  key={movie._id}
                />
              </div>
            ))
          }
        </div>
        <hr color="#343A40"/>
        <div>
          <h3 className="sub-title">TV Series</h3>
        </div>
        <div className="flex-container">
          {
            data.tvSeries.map(tvSeries => (
              <div className="flex-item">
                <TvSeries
                  tvSeries={tvSeries}
                  key={tvSeries._id}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}