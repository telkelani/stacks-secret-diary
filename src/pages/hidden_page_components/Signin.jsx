import React from 'react';
import './Signin.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { authenticate } from '../../auth';
import { Jumbotron } from 'react-bootstrap';

import ScrollAnimation from 'react-animate-on-scroll'

export const Signin = () => {

  //For inline css, which overwrites the bootstrap styles
  const containerStyles = {
    display: "flex", 
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'rgba(71, 186, 140,0.7)',
    height: '100vh'
  }

  const jumboStyles = {
    textAlign: "center",
    backgroundColor: "rgba(64, 189, 145,0.7)",
    color: "white"
  }

  const buttonStyles = {
    position: "fixed",
    top: "5vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderColor: "rgba(0,0,0,0.4)"
  }

  const signInButtonStyles = {
    marginTop: '5vh',
    backgroundColor: '#3700ff',
    borderColor: '#3700ff',
    borderRadius: '23px 23px 23px 23px'
}

  return (
    <Container fluid style={containerStyles}>
        <Button style={buttonStyles} href="/">Back to Disguise Page</Button>
        <Jumbotron style={jumboStyles}>
        <h1>Your evidence secured by Blockstack</h1>
        <p>Sign in to your journal with Blockstack to control your data</p>

        <ScrollAnimation animateIn="fadeInUp" duration={2.5}>
          <Button style={signInButtonStyles} variant="secondary" onClick={() => authenticate()}>
          Sign in using Blockstack Ӿ</Button>
        </ScrollAnimation>


        </Jumbotron>
    </Container>
  );
};
