import React from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { userSession } from '../../auth';


const SignOutButton = () => {
  if (!userSession.isUserSignedIn()) {
    return null;
  }
  return (
    
    <Button variant="danger" onClick={ () => {userSession.signUserOut(); window.location = '/';} }>
    Sign Out
    </Button>)
}

export function Header(){
  const flex = {
    display:"flex",
    justifyContent:"space-around",
    gap: "10vw"}
  return (
    <Navbar expand="md"  bg="#8efa97">

      <Navbar.Toggle aria-controls="collapsed"></Navbar.Toggle>
      
      <Navbar.Collapse id="collapsed">
        <Nav.Link>Text Entries</Nav.Link>
        <Nav.Link>Video Entries (Coming Soon)</Nav.Link>
        <Nav.Link>Audio Entries (Coming Soon)</Nav.Link>

      </Navbar.Collapse>

      <Navbar.Brand href="/">
        <i className="fas fa-globe-americas" ></i>
      </Navbar.Brand>

      <SignOutButton />
    </Navbar>

    )
}
