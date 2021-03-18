import React from 'react';
import './Signin.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { authenticate } from '../../auth';
import { Jumbotron } from 'react-bootstrap';

export const Signin = () => {
  const containerStyles = {
    display: "flex", 
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'rgba(255,0,0,0.5)',
    height: '100vh'
  }

  const jumboStyles = {
    textAlign: "center",
    backgroundColor: "rgba(100,100,67,0.4)"
  }

  const buttonStyles = {
    position: "fixed",
    top: "0",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderColor: "rgba(0,0,0,0.4)"
  }
  return (
    <Container fluid style={containerStyles}>
        <Button style={buttonStyles} href="/">Back to Disguise Page</Button>
        <Jumbotron style={jumboStyles}>
        <h1>Your evidence secured by Stacks</h1>
        <p>Sign in to Stacks to control your data</p>

        <Button className="sign-in-button" variant="secondary" onClick={() => authenticate()}>
        Sign in using Blockstack</Button>

        </Jumbotron>
    </Container>
  );
};
