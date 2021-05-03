import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Header} from './Header'
import { Link } from 'react-router-dom'
import {Entries} from './Entries'
import { UsefulLinks } from './UsefulLinks'

export function HiddenPage(){

  const nopadding = {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #8efa97 30% , #8cdead)'
  }
  


  
  return (
      <Container fluid fill="100%" style={nopadding}>
        
        <Header />
        <Container fluid>
          <Row>
            <Col md={9} className="text-center">
              <Entries />
            </Col>
            <Col md={3}>
              <UsefulLinks />
            </Col>

          </Row>
                
        </Container>
        
      </Container>




  )
}
