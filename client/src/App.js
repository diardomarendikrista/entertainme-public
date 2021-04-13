import React from "react";
import { ApolloProvider } from '@apollo/client/react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import client from './config/graphql';
import Home from './pages/Home';
import Navbar from './components/NavBar';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import DetailMovie from './pages/DetailMovie';
import DetailTvSeries from './pages/DetailTvSeries';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <ApolloProvider client={client} >
      <Navbar />
        <Switch>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/addmovie">
            <AddMovie />
          </Route>
          <Route path="/movie/:id">
            <DetailMovie />
          </Route>
          <Route path="/tvseries/:id">
            <DetailTvSeries />
          </Route>
          <Route path="/editmovie/:id">
            <EditMovie />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;
