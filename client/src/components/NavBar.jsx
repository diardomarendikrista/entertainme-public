import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { StarFill } from 'react-bootstrap-icons';
import logo from '../assets/logo.png';

export default function NavBar () {
  const history = useHistory();

  const goToHome = (event) => {
    event.preventDefault();
    history.push('/');
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ marginBottom: '20px' }}>
      <Navbar.Brand href="#home" onClick={(event) => goToHome(event)} >
        <img
          src={logo}
          height="35"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Nav>
          <Nav.Link href="#favourite">Favourite <StarFill style={{marginBottom:3}}/></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}