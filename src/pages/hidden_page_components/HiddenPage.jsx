import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Header} from './Header'
import { Link } from 'react-router-dom'
import {Entries} from './Entries'
import { UsefulLinks } from './UsefulLinks'

import ScrollAnimation from 'react-animate-on-scroll'

export function HiddenPage(){

  const HiddenPageStyle = {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: '100vh',
    background: 'linear-gradient(to right, #a3d6b2 50% , #8cdead)'
  }
  


  
  return (
      <Container fluid fill="100%" style={HiddenPageStyle}>
        
        <Header />
        <Container fluid>
          <Row>
            <Col md={9} className="text-center">
              <ScrollAnimation animateIn="fadeInDown" duration={2.5}>
                <Entries />

              </ScrollAnimation>
              
            </Col>
            <Col md={3}>
              <UsefulLinks />
            </Col>

          </Row>
                
        </Container>
        
      </Container>




  )
}
