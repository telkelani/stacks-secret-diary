import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Header} from './Header'
import {getUserData} from '../auth'


export function HiddenPage(){
  const nopadding = {
    paddingLeft: 0,
    paddingRight: 0
  }
  const username = getUserData().username
  console.log(getUserData().profile.stxAddress)
  return (
    <Container fluid style={nopadding}>
      <Header />
      <Container>
        <Row>
          <Col className="text-center">
            <h1>Welcome to your diary, {username.split(".")[0]}</h1>
          </Col>
        </Row>

      </Container>
    </Container>


  )
}