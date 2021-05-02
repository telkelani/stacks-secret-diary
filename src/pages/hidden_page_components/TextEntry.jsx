import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import {AudioPlayer} from './AudioPlayer'
import { listFilesFromGaia } from '../../storage'
import { getGlobalScope } from 'blockstack/lib/utils'
import { createPortal } from 'react-dom'
import $ from 'jquery'
import { dialog } from 'bootbox'

export function TextEntry({textEntry}){

    var jquery = require('jquery')
    var bootstrap = require('bootstrap')
    var bootbox = require('bootbox')


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
        var loadingAudio = bootbox.dialog({
            message: `Loading Audios... (loaded 0 of ${files.length}) files`,
            closeButton: false
        })


        for (var i=0; i<files.length;i++){
   
            const fileFromServer = await listFilesFromGaia(textEntry, files[i])
            if (fileFromServer){

                var loadedFile = bootbox.dialog({
                    message: `${files[i]} loaded: \n\n(${i+1} of ${files.length} files)`
                })
                filesFromServer.push(fileFromServer)
            }
            else{
                bootbox.dialog({
                    message: `${files[i]} Does not exist`
                })
            }

        }

        loadingAudio.modal('hide')
        

     

        setAudioFiles(filesFromServer)

        

        
    }
    
    const AudioBody = ({file}) => {
        var elem = null


        if (loadAudio) {
            if (file ){
                elem = <AudioPlayer fileName={file.fileName} audioFile={file.data} />
            }
            else{
                alert("Error uploading")
            }
        }


        return elem
    }

    const NoAudioFiles = () => {
        var elem = <p>No audio uploaded</p>
        if (textEntry.audios.length > 0){
            elem = null
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
                
                <Button onClick={(e) => setLoadAudio(true)}>Load Audio</Button>
                <NoAudioFiles />
                {audioFiles.map(file => <AudioBody file={file} />)}
            </Card.Body>
        </Card>
            



        
            
      
            )
}