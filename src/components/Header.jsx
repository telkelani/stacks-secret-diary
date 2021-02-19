import React from 'react';
import Container from 'react-bootstrap/Container'
import NavBar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { getPerson, getUserData, userSession } from '../auth';

const SignOutButton = () => {
  if (!userSession.isUserSignedIn()) {
    return null;
  }
  return (
    
    <Button variant="success" onClick={ () => {userSession.signUserOut(); window.location = '/';} }>
    Sign Out
    </Button>)
}

export function Header(){
  const flex = {
    display:"flex",
    justifyContent:"space-around",
    gap: "10vw"}
  return (
    <NavBar style={flex} bg="dark" variant="dark">
      <NavBar.Brand href="/">All Entries</NavBar.Brand>
      <Nav className="ml-auto">
        <Nav.Link>Video Entries</Nav.Link>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Link>Audio Entries</Nav.Link>

      </Nav>

      <Nav className="ml-auto">
        <SignOutButton />
      </Nav>
    </NavBar>

    )
}
