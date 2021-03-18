import React, {useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export function TextEntry({textEntry}){

    const cardDisplay = {
        background: 'red'
        
    }
    return (
        <Card style={{background: '#40eddc', marginTop: '2vh', marginBottom: '2vh'}}>
            <Card.Body >
                <Card.Title>{textEntry.date}</Card.Title>
                    <Card.Text style={{textAlign: "left"}}>
                        {textEntry.text}
                    </Card.Text>
                </Card.Body>
        </Card>
            



        
            
      
            )
}