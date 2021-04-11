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

function App() {
  return (
    <Router>
      <ApolloProvider client={client} >
      <Navbar />
        <Switch>
          <Route path="/addmovie">
            <AddMovie />
          </Route>
          <Route path="/editmovie/:_id">
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
