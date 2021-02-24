import React, {useContext, useState} from 'react'
import {TextEntry} from '../components/TextEntry'
import { EntryContext } from '../providers/EntryProvider'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function getTimeStamp(){
    const now = new Date().toISOString()
    const date = now.split("T")[0]
    const time = now.substring(now.indexOf("T")+1,now.indexOf("."))
    return date+" "+time
}
export function TextEntries(){
    const [textEntries, setTextEntry] = useContext(EntryContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addTextEntry = (value) => {
        
    
        if (value.trim() == ''){
            alert("Input something dummy")
        }
        else{
            const confirmed = window.confirm("you gucci?")
            if (confirmed){
                setTextEntry(prevState => [...prevState,{
                    id:prevState.id+1,
                    date:getTimeStamp(),
                    text:value}])
                handleClose()
            }
            
        }
    }

    return (
        <div style={{display:"flex", flexFlow:"column wrap", marginTop:"10vh"}}>
            {textEntries.map( (textEntry) => <TextEntry key={textEntry.id} textEntry={textEntry}/>)}
            <Button variant="primary" style={{width:"50rem"}}
            onClick={handleShow}>Add Entry</Button>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Add Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea id="new entry" style={{height: "50vh", width: "100%"}}></textarea>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => addTextEntry(document.getElementById("new entry").value)}>
                    Add Entry
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        )
 
}