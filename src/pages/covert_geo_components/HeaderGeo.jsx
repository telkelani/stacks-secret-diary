import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { SecretPassage } from './SecretPassage'
function Header(){
    return (
        <Container fluid> 
            <Row style={{background:'#ace5d4'}}>
                <Col xs={3} md={3}>
                    <SecretPassage />
                </Col>
                <Col xs={3} md={6} className="text-center">
                    <h1 style={{marginTop: '5vh'}}>Capitals Quiz <i class="fas fa-globe-europe fa-spin" style={{color:'#52a3cc'}}></i></h1>
                </Col>

            </Row>

        </Container>
        )
}

export default Header;