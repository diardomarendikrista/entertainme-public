import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import Loader from "react-loader-spinner";
import {
  GET_ENTERTAINME,
  GET_MOVIE_ID,
  UPDATE_MOVIE
 } from '../queries';

export default function EditMovie () {  
  let { id } = useParams();
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [posterpath, setPosterpath] = useState('');
  const [popularity, setPopularity] = useState('');
  const [tags, setTags] = useState('');

  const { data , loading } = useQuery(GET_MOVIE_ID, {
    variables: {
      id
    }
  });
  const [
    editMovie,
    // eslint-disable-next-line
    { data: dataEditMovie, loading: loadingEditMovie, error: errorEditMovie }
  ] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{ query: GET_ENTERTAINME }]
  });

  useEffect(_ => {
    if (data) {
      setTitle(data.Movie.title);
      setOverview(data.Movie.overview);
      setPosterpath(data.Movie.poster_path);
      setPopularity(data.Movie.popularity);
      setTags(data.Movie.tags.join('; '));
    }
  }, [data])

  const history = useHistory();

  const cancelBtn = () => {
    history.push('/');
  }

  const tagToArray = (tags) => {
    return tags.split('; ').filter(tag => tag);
  }

  const updateExitingMovie = (event) => {
    event.preventDefault();
    const movie = {
      title,
      overview,
      poster_path: posterpath,
      popularity: +popularity,
      tags: tagToArray(tags)
    };
    // console.log(movie);

    editMovie({
      variables: {
        id,
        updateMovie: movie
      }
    })

    history.push('/');
  }

  if (errorEditMovie) {
    return (
      <div className="body">
        <div className="center-mid">
          <h3>Error.. please contact your administrator</h3>
        </div>
      </div>
    )
  }
  if (loading) {
    return (
      <div className="body">
        <div className="center-mid">
          <Loader type="Rings" color="#C01E2B" height={80} width={80} />
        </div>
      </div>
    );
  }
  else
  return (
    <div className="body">
      <div className="input-form">
        <h3>Edit Movie</h3>
        <form onSubmit={(event) => updateExitingMovie(event)}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" placeholder="eg: Avengers" value={title} onChange={(event) => setTitle(event.target.value)} required/>
          </div>
          <div className="form-group">
            <label>Overview</label>
            <input type="text" className="form-control" placeholder="Overview / Description" value={overview} onChange={(event) => setOverview(event.target.value)} required/>
          </div>
          <div className="form-group">
            <label>Poster Path</label>
            <input type="text" className="form-control" placeholder="eg: http://www.imgur.com/image.jpg" value={posterpath} onChange={(event) => setPosterpath(event.target.value)} required/>
          </div>
          <div className="form-group">
            <label>Popularity</label>
            <input type="number" className="form-control" placeholder="eg: 9.5" value={popularity} onChange={(event) => setPopularity(event.target.value)} required/>
          </div>
          <div className="form-group">
            <label>Tags (separate by "; " semicolon and space )</label>
            <input type="text" className="form-control" placeholder="eg: war; movie; anime;" value={tags} onChange={(event) => setTags(event.target.value)} required/>
          </div>
          <button type="submit" className="btn btn-primary">Edit Movie</button>
          <button onClick={() => cancelBtn()} className="btn btn-secondary btn-cancel">Cancel</button>
        </form>
      </div>
    </div>
  )
}