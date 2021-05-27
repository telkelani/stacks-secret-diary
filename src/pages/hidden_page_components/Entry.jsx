import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import {AudioPlayer} from './AudioPlayer'
import { listAudioFilesFromGaia } from '../../storage'

import $ from 'jquery'
import { dialog } from 'bootbox'

import './Entries.css'

//This component is to render an individual entry. 
export function Entry({entry}){

    /** INITIAL VARIABLES */
    var jquery = require('jquery')
    var bootstrap = require('bootstrap')
    var bootbox = require('bootbox')
    const [audioFiles, setAudioFiles] = useState([]) //Same as Entries.js
    const [loadAudio, setLoadAudio] = useState(false) //Tracks if user clicked button to initiate whether audio should be loaded
    /** -------------------- */

    /** LOADING ENTRY DATA */

        //Audios not loaded on runtime, as image and text data are retrieved from Gaia quicker than audio
    //Therefore might mislead user into thinking they have not uploaded audio, when in fact they have
    useEffect (() => {
        setLoadAudio(false)
    }, []) 

    //When the user clicks the load Audio button, it should get the audio files from Gaia. 
    useEffect( () => {
        if (loadAudio) {
            getAudioFiles() 
        }
    }, [loadAudio])

    /**
     * getAudioFiles() - Gets the correct audio files for the entry
     */
    async function  getAudioFiles(){

        const files = entry.audios
        const loadedFilesFromGaia = []
        
        //Dialog that should be shown when audio is being retrieved from Gaia
        var loadingAudio = bootbox.dialog({
            message: `<span><i class="fa fa-spin fa-spinner"></i> Loading Audios... (loaded 0 of ${files.length}) files</span>`,
            closeButton: false
        })

        for (var i=0; i<files.length;i++){


            const fileFromGaia = await listAudioFilesFromGaia(entry, files[i]) //Calls async function defined in storage.js
            
            if (fileFromGaia){

                var loadedFile = bootbox.dialog({
                    message: `<i class="fas fa-check-circle"></i> ${files[i]} loaded: \n\n(${i+1} of ${files.length} files)`
                })
                //If there is a response from the Gaia hub, then push that file into the loaded files from Gaia
                loadedFilesFromGaia.push(fileFromGaia)

            }
            else{
                //If there is no response, then popup to user that file does not exist (Failed to upload on Gaia hub)
                bootbox.dialog({
                    message: `${files[i]} Does not exist`
                })
                
                
            }

        }
        
        loadingAudio.modal('hide')
        setAudioFiles(loadedFilesFromGaia) //Set the state to the files that have been loaded
    }
    /** -------------------- */
    
    /** LOADING MEDIA FOR ENTRY */

    const AudioBody = ({file}) => {
        var elem = null //If there was no audio loaded, then this will be null and not render

        //If audio has been uploaded for entry, then display it with <audio> tag
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

    //Will render the <p> tag if no audio has been uploaded, If there has a button called Load Audio will show
    const AudioFiles = () => {
        var elem = <p>No audio uploaded</p>
        if (entry.audios.length > 0){
            elem = <Button className="search-button" onClick={(e) => setLoadAudio(true)}>Load Audio</Button>
        }
        return elem
    }

    //Same as above but for images
    //Images are loaded into a bootstrap carousel instead of listed out
    const ImageFiles = () => {
        var elem = <p>No images uploaded</p>
        if (entry.images.length > 0){
            elem = <Carousel>
            {entry.images.map( (image) => {
    
                return (
                    <Carousel.Item>
                        <img src={image} width="40%" height="20%" />
                    </Carousel.Item>
                )

            })}
            
        </Carousel>
        }
        return elem
    }
    /** -------------------- */

    /** DISPLAY EVERYTHING */

    return (

            <Card id="entry" >
                <Card.Body >
                    <Row>
                        <Col>
                            <Card.Title>{entry.date}</Card.Title>
                                <Card.Text style={{textAlign: "left"}}>
                                    {entry.text}
                                </Card.Text>
                        </Col>
                    </Row>

                    <Container className="attachments-container">

                    
                    <Row>
                        <Col className="text-center">
                            <h4>Attachments</h4>
                        </Col>
                    </Row>
                    <Row>

                        <Col >
                                <Card.Title>Images</Card.Title>

                                <ImageFiles />  
      
                            
                            </Col>

                            <Col>

                                <Card.Title>Audios</Card.Title>
                                <AudioFiles />
                                {audioFiles.map(file => <AudioBody file={file} />)}

                                    
                            
                            </Col>


                    </Row>

                    </Container>


    

                    
  
                    

               

      



                    </Card.Body>
                </Card>
                
                



        
            
      
            )
}