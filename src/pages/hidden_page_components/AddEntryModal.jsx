import React, {useState, useRef} from 'react'
import {EntryContext} from '../../providers/EntryProvider'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ImageUploader from 'react-images-upload';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {AudioPlayer} from './AudioPlayer'



// UI code for modal ( State is in parent )


export function AddEntryModal(props){
    const audioUploader = useRef(null)
    const [audioFiles, setAudioFiles] = useState([])

    return (
        <div> 
            <Modal show={props.show} onHide={props.handleClose} animation={true}>
            <Modal.Header closeButton>
            <Modal.Title>Add Entry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea id="new entry" style={{height: "50vh", width: "100%"}}></textarea>
            </Modal.Body>
            <Modal.Footer>


            

            <Row>
                <Col>
                <input ref={audioUploader} 
                type="file" multiple={true}  accept="audio/*" onChange={(e) => props.previewAudio(e)}/>
                
                {audioFiles.map(file => 
                
                <AudioPlayer fileName={file[0]} audioFile={file[1]} />)}
                

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



            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            
            <Button variant="primary" onClick={() => props.addEntry(document.getElementById("new entry").value)}>
                Add Entry
            </Button>

            </Modal.Footer>
            </Modal>
        </div>)
}