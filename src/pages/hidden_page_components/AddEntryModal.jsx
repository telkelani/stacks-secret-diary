import React, {useState, useRef, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ImageUploader from 'react-images-upload';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {AudioPlayer} from './AudioPlayer'
import compress from 'compress-base64'
import { Form } from 'react-bootstrap';


// UI code for modal

export function AddEntryModal(props){
    const audioUploader = useRef(null) //Reference to file input for audios

    //Used to add preview and manage uploads of files
    //An array of arrays, where each element will consist of [filename, base64encoding]
    const [audioFiles, setAudioFiles] = useState([]) 

    //Audiofiles are reset when page is re-rendered
    useEffect( () => {
        setAudioFiles([])
    }, [])
    

    /**
     * Allows user to play audios they have selected so they can double check their entry submission
     * Important as user cannot edit entry once it is submitted
     * @param {event} e : The event handler
     */
    const previewAudio = (e) => 
    {
        //Resets file input selection
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
               const fileExt = file.name.split(".").pop() //Get extension string

               //Decoding audio to check if the file is truly an audio
               //prevents possible extension spoofing
               //e.g. can save a text file as .mp3 
               var decodeAudio = new Audio(fileContent)
               decodeAudio.onerror = () => {
                   alert("This is not an audio file")
                   resetFileInput()
               }
               
               //This is the limit the audio file can be due to Blockstack Gaia restrictions
               if (file.size > 7000000){

                   alert("Pick a file that is less than 7MB")
                   resetFileInput() //Reset selection on error
               }

               
               else{
                //If the extension is right, add the file name and the data string url to the list of audiofiles
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
            {/* Getting the modal state (show, handleClose) from Entries.js  */}
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
                        
                        //accept/* does not work on iOS safari
                        accept=".ogg,.wav,.m4a,.mp3" 

                        // Update state of Entries.js with new files, also preview the files using function in this component
                        onChange={(e) => {props.uploadAudio(e); previewAudio(e)}}>

                        </Form.File>

                </Form>

                    {/* List all audio files with name and content
                        AudioPlayer component renders <audio> HTML tag
                     */}
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