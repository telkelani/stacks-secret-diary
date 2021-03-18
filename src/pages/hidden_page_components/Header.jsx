import React from 'react';
import Container from 'react-bootstrap/Container'
import {Navbar, Nav} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { getPerson, getUserData, userSession } from '../../auth';
import {secret_path} from '../../components/App'
import {UsefulLinks} from './UsefulLinks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

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
        <i class="fas fa-globe-americas" ></i>
      </Navbar.Brand>

      <SignOutButton />
    </Navbar>

    )
}
