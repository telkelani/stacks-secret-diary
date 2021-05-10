import React, {useState, useRef, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ImageUploader from 'react-images-upload';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {AudioPlayer} from './AudioPlayer'
import compress from 'compress-base64'
import { Form } from 'react-bootstrap';


// UI code for modal ( State is in parent)

export function AddEntryModal(props){
    const audioUploader = useRef(null)
    const [audioFiles, setAudioFiles] = useState([])

    useEffect( () => {
        setAudioFiles([])
    }, [])
    

    const previewAudio = (e) => 
    {
        const resetFileInput = () => {
            audioUploader.current.value = null
            setAudioFiles([])
            props.uploadAudio(e) //Feed the changes back to entries component

        }
        
        let fileArray = Array.from(e.target.files)

        fileArray.forEach( file => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            
            reader.onloadend = () => {
               const fileContent = reader.result
               const fileExt = file.name.split(".").pop()               
               //Decoding audio to check if the file is truly an audio
               //possible to spoof extension
               //e.g. can save a text file as .mp3 
               var decodeAudio = new Audio(fileContent)
               decodeAudio.onerror = () => {
                   alert("This is not an audio file")
                   resetFileInput()
               }
               console.log(fileExt)

               if (file.size > 7000000){

                   alert("Pick a file that is less than 7MB")
                   resetFileInput()
               }

               
               else{
                if (fileExt == "mp3" || fileExt == "ogg" || fileExt == "wav" || fileExt=="m4a"){
                    setAudioFiles(prev => [...prev,[file.name,fileContent]])
                }
                else{
                    alert("File extension not supported")
                    resetFileInput()
                }
                   
               }
            }
        })
    }

    
    return (
        
        <div> 
            <Modal show={props.show} onHide={props.handleClose} animation={true}>
            <Modal.Header closeButton>
            <Modal.Title>Add Entry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control placeholder="Enter text here" as="textarea" id="new entry"></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>


            

            <Row>
                <Col>
            
           
                    <Col className="text-left">
                        <h3>Upload Audio</h3>
                        <p>Max File Size: 6MB</p>
                        <p>Extensions accepted: .ogg|.wav|.m4a|.mp3</p>

                        <Form>
                        <Form.File ref={audioUploader}
                        multiple={true}
                        accept=".ogg,.wav,.m4a,.mp3" 
                        onChange={(e) => {props.uploadAudio(e); previewAudio(e)}}>

                        </Form.File>

                </Form>

                
                    {audioFiles.map(file => 
                    
                    <AudioPlayer fileName={file[0]} audioFile={file[1]} />)}
                </Col>
        

                </Col>



            </Row>

            <Row>
            <Col>
                    <ImageUploader 
                        withPreview
                        onChange={(e) => props.imageUpload(e)}>
                    </ImageUploader>
                </Col>
            </Row>


            <Modal.Footer>
            <Button variant="secondary" onClick={() =>
                {
                setAudioFiles([]);
                props.handleClose();
                }
                }>
                Close
            </Button>
            
            <Button variant="success" onClick={() => {
                setAudioFiles([]) //Reset preview 
                props.addEntry(document.getElementById("new entry").value)}}>
                Add Entry
            </Button>

            </Modal.Footer>
            </Modal>
        </div>)
}