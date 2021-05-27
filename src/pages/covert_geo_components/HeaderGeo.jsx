import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { SecretPassage } from './SecretPassage'

import './CovertGeo.css'
function Header(){
    return (
        <Container fluid> 
            <Row className="header">
                {/* Bootstrap grid is divided into 12 columns
                * Secret passage will take up 3 columns in mid-size screens (laptops)
                * and extra-small size screens (mobiles)
                */}
                <Col xs={3} md={3}>
                    <SecretPassage />
                </Col>
                {/* The rest of the header will take up 3 columns for extra-small screens
                  * For laptops it will take 6 columns 
                 */}
                <Col xs={3} md={6} className="text-center">
                    <h1 className="covert-title">Capitals Quiz <i class="fas fa-globe-europe fa-spin" style={{color:'#52a3cc'}}></i></h1>
                </Col>
            </Row>

        </Container>
        )
}

export default Header;