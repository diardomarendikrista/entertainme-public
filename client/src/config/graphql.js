import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_FAVORITES } from '../queries';

export const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache
});

cache.writeQuery({
  query: GET_FAVORITES,
  data: {
    favorites: []
  }
});

export default client;