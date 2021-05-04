import React from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { userSession } from '../../auth';

import './Entries.css'
import $ from 'jquery'
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
  return (
    <Navbar expand="md"   bg="#8efa97">

      <Navbar.Brand className="mr-auto" id="globe" href="/" >
        <i  className="fas fa-globe-americas"></i><span> Back to Quiz</span>
        
      </Navbar.Brand>

      <SignOutButton />
    </Navbar>

    )
}
