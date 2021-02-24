import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Header} from '../components/Header'
import {getUserData} from '../auth'
import { Link } from 'react-router-dom'
import {TextEntries} from './TextEntries'
import {VideoEntries} from './VideoEntries'

export function HiddenPage(){
  const nopadding = {
    paddingLeft: 0,
    paddingRight: 0
  }
  const username = getUserData().username
  console.log(getUserData().profile.stxAddress)
  const current_url = window.location.pathname
  console.log(current_url)
  return (



      <Container fluid style={nopadding}>
        
        <Header />
        <Container>
          <Row>
            <Col className="text-center">
              <TextEntries />
            </Col>
            <Col className="text-center">
              <VideoEntries />
            </Col>
          </Row>
                
        </Container>
        
      </Container>




  )
}
