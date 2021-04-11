import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import { PlusCircle  } from 'react-bootstrap-icons';
import MovieCard from '../components/MovieCard';
import TvSeries from '../components/TvSeries';

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

export default function Home (props) {
  const { data, loading } = useQuery(GET_ENTERTAINME);
  const history = useHistory();

  useEffect( _ => {
    document.title = 'Entertainme';
  }, [data])

  const showAddMovie = () => {
    history.push('/addmovie');
  }

  return (
    <div className="container">
      <div>
        <h3>Movie <button onClick={() => showAddMovie()} className="btn btn-danger"><PlusCircle style={{marginBottom:4, fontSize:20}}/> add</button></h3>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {
          loading ? <h1>loading movie</h1> :
          data.Movies.map(movie => (
            <MovieCard
              movie={movie}
              key={movie._id}
            />
          ))
        }
      </div>
      <div>
        <h3>TV Series</h3>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {
          loading ? <h1>loading tv series</h1> :
          data.tvSeries.map(tvSeries => (
            <TvSeries
              tvSeries={tvSeries}
              key={tvSeries._id}
            />
          ))
        }
      </div>
    </div>
  )
}