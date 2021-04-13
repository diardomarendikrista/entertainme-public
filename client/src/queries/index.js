import { gql } from '@apollo/client';

export const GET_ENTERTAINME = gql`
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

export const ADD_MOVIE = gql`
  mutation addMovie($newMovie: MovieInput) {
    addMovie(newMovie: $newMovie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation deleteMovie($_id: ID) {
    deleteMovie(_id: $_id) {
      message
    }
  }
`

export const GET_MOVIE_ID = gql`
  query GetMovie($id: ID) {
    Movie(_id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_TVSERIES_ID = gql`
  query GetTvSeries($id: ID) {
    tvSerie(_id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const UPDATE_MOVIE = gql`
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

export const GET_FAVORITES = gql`
  query GetFavorites {
    favorites @client
  }
`