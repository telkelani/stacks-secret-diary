import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import {AudioPlayer} from './AudioPlayer'
import { listFilesFromGaia } from '../../storage'
import { getGlobalScope } from 'blockstack/lib/utils'
import { createPortal } from 'react-dom'


export function TextEntry({textEntry}){
    const [audioFiles, setAudioFiles] = useState([])
    const [loadAudio, setLoadAudio] = useState(false)
    useEffect (() => {
        setLoadAudio(false)
    }, [])
    useEffect( () => {
        if (loadAudio) {

            getAudioFiles()
        }
    }, [loadAudio])
    async function  getAudioFiles(){

        const files = textEntry.audios
        const filesFromServer = []
        for (var i=0; i<files.length;i++){
            const fileFromServer = await listFilesFromGaia(textEntry, files[i])
            filesFromServer.push(fileFromServer)
        }

        setAudioFiles(filesFromServer)

        

        
    }
    
    const AudioBody = ({file}) => {
        var elem = null
        if (file) {
            if (loadAudio){
                elem = <AudioPlayer fileName={file.fileName} audioFile={file.data} />
            }
        }

        return elem
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
                
                <button onClick={(e) => setLoadAudio(true)}>Load Audio</button>
                

                {audioFiles.map(file => <AudioBody file={file}/>)}


                   
            </Card.Body>
        </Card>
            



        
            
      
            )
}