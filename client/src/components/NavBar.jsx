import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { StarFill, HouseFill } from 'react-bootstrap-icons';
import logo from '../assets/logo.png';

export default function NavBar () {
  const history = useHistory();

  const goToHome = (event) => {
    event.preventDefault();
    history.push('/');
  }
  
  const goToFavorites = (event) => {
    event.preventDefault();
    history.push('/favorites');
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home" onClick={(event) => goToHome(event)} style={{ marginRight: '50px' }}>
        <img
          src={logo}
          height="40"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{marginBottom:5}}>
          <Nav.Link onClick={(event) => goToHome(event)} href="/"><HouseFill style={{marginBottom:3}}/> Home</Nav.Link>
          <Nav.Link onClick={(event) => goToFavorites(event)} href="#favourites"><StarFill style={{marginBottom:3, marginLeft:5}}/> Favourite</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}