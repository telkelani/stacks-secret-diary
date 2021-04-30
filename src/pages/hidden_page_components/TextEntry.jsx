import React, {useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import {AudioPlayer} from './AudioPlayer'
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
                <Card.Title>Images</Card.Title>
                
                <Carousel>
                    {textEntry.images.map( (image) => {
            
                        return (
                            <Carousel.Item>
                                <img src={image} width="40%" height="20%" />
                            </Carousel.Item>
                        )

                    })}
                    
                </Carousel>

                <Card.Title>Audios</Card.Title>

                {textEntry.audios.map( (audio) => {
                    console.log("audio "+audio)
                    return (
                            
                        <AudioPlayer fileName={audio[0]} audioFile={audio[1]} />
                            
                        )

                })}


                   
            </Card.Body>
        </Card>
            



        
            
      
            )
}