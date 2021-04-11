import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery, gql } from '@apollo/client';

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

const GET_MOVIE_ID = gql`
  query GetMovie($_id: ID) {
    Movie(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

const UPDATE_MOVIE = gql`
  mutation editMovie($id: ID, $updateMovie: MovieInput) {
    editMovie(_id: $id, updateMovie: $updateMovie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export default function EditMovie () {  
  let { _id } = useParams();
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [posterpath, setPosterpath] = useState('');
  const [popularity, setPopularity] = useState('');
  const [tags, setTags] = useState('');
  console.log(_id);

  const { data , loading } = useQuery(GET_MOVIE_ID);
  const [
    editMovie,
    // eslint-disable-next-line
    { data: dataEditMovie, loading: loadingEditMovie, error: errorEditMovie }
  ] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{ query: GET_ENTERTAINME }]
  });

  useEffect(_ => {
    console.log(data, 'ini dataaa');
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
        newMovie: movie
      }
    })

    history.push('/');
  }

  if (errorEditMovie) {
    return (
      <h1>error add Movie</h1>
    )
  }
  if (loading) {
    return <h1>Loading...</h1>
  }
  else
  return (
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
  )
}