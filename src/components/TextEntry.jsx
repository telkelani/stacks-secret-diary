import React, {useEffect} from 'react'
import Card from 'react-bootstrap/Card'


export function TextEntry({textEntry}){

    return (
    <Card style={{marginBottom:"5vh", width: "50rem"}}>
        <Card.Body >
            <Card.Title>{textEntry.date}</Card.Title>
            <Card.Text style={{textAlign: "left"}}>
            {textEntry.text}
            </Card.Text>
        </Card.Body>
    </Card>


        
            
      
            )
}