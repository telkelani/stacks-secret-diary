import React from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { userSession } from '../../auth';

import './Entries.css'
import $ from 'jquery'

//Will show a sign out button if user is signed in
//When sign out button is clicked, should delete application session from Blockstack
//This DOES NOT SIGN USER OUT OF BLOCKSTACK! BLOCKSTACK IS INDEPENDENT FROM THIS APP. USER has to sign out of Bockstack too
//This behavior is akin to an app utilizing Facebook login, when you sign out of app using Facebook does not mean you sign out of Facebook
const SignOutButton = () => {
  if (!userSession.isUserSignedIn()) {
    return null;
  }
  return (
    
    <Button variant="danger" onClick={ () => {userSession.signUserOut(); window.location = '/';} }>
    Sign Out
    </Button>)
}

//Displays Header for hidden page
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
