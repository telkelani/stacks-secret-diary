import React, {useState} from 'react'
import {EntryContext} from '../../providers/EntryProvider'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ReactFileReader from 'react-file-reader';
import ImageUploader from 'react-images-upload';
// UI code for modal ( State is in parent )


export function AddEntryModal(props){
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


            

                
            <ImageUploader 
                withPreview
                onChange={(e) => props.imageUpload(e)}>
            </ImageUploader>



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