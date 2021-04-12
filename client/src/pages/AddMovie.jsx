import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/client';
import {
  GET_ENTERTAINME,
  ADD_MOVIE
 } from '../queries';

export default function AddMovie (props) {  
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [posterpath, setPosterpath] = useState('');
  const [popularity, setPopularity] = useState('');
  const [tags, setTags] = useState('');

  const [
    addMovie,
    // eslint-disable-next-line
    { data: dataAddMovie, loading: loadingAddMovie, error: errorAddMovie }
  ] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: GET_ENTERTAINME }]
  });

  const history = useHistory();

  const cancelBtn = () => {
    history.push('/');
  }

  const tagToArray = (tags) => {
    return tags.split('; ').filter(tag => tag);
  }

  const addNewMovie = (event) => {
    event.preventDefault();
    const movie = {
      title,
      overview,
      poster_path: posterpath,
      popularity: +popularity,
      tags: tagToArray(tags)
    };
    // console.log(movie);

    addMovie({
      variables: {
        newMovie: movie
      }
    })

    history.push('/');
  }

  if (errorAddMovie) {
    return (
      <h1>error add Movie</h1>
    )
  }
  return (
    <div className="input-form">
      <h3>Add Movie</h3>
      <form onSubmit={(event) => addNewMovie(event)}>
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
        <button type="submit" className="btn btn-primary">Add Movie</button>
        <button onClick={() => cancelBtn()} className="btn btn-secondary btn-cancel">Cancel</button>
      </form>
    </div>
  )
}