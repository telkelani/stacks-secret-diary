import React, {useContext, useEffect, useState} from 'react'
import {TextEntry} from './TextEntry'
import { EntryContext } from '../../providers/EntryProvider'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { v4 as uuid } from 'uuid';
import {saveEntriesToGaia, getEntriesFromGaia} from '../../storage'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
function getTimeStamp(){
    const now = new Date().toISOString()
    const date = now.split("T")[0]
    const time = now.substring(now.indexOf("T")+1,now.indexOf("."))
    return date+" "+time
}   


export function TextEntries(){
 
    /**
     * Modal State variables
     */
    const [show, setShow] = useState(false);
    const handleClose = () => {
        
        setShow(false);}
    const handleShow = () => setShow(true);

    /**
     * Entries state variables
     */
    const [entries, setEntries] = useContext(EntryContext)

    /*useEffect renders this function when the DOM renders
    * The second  argument specifies that this should only when the page is loaded (mounted)*/
    useEffect( () => {
        getEntries()      
    },[])


    /**
     * Get entries = fetch the JSON file of all the entries from Gaia and then set them as the new state
     * 
     */
    const getEntries = async () => {
        try{
            let fetchedEntries = await getEntriesFromGaia()
            let new_state = fetchedEntries.entry
            if (new_state.length>1){
                new_state = new_state.slice(1,)
            }
            setEntries(new_state)
        }

        catch (e) {
            console.log("caught")
        }


    }

    


    const addEntry = (value) => {
        if (value === ''){
            return
        }
        if (value.trim() == ''){
            
            alert("Please enter some text")
        }
        else{
            const confirmed = window.confirm("Are you sure you want to add entry? Remember, you cannot edit the entry once it is added")
            if (confirmed){
                
                setEntries(prevState => {
                let newEntries = [...prevState,
                        {
                    id:uuid(),
                    date:getTimeStamp(),
                    text:value
                }]
                saveEntry(newEntries)
                
                if (newEntries[0].text=="No entries"){
                    newEntries = newEntries.slice(1,)
                }
                return newEntries
                })
                    
                handleClose()
                
            }
            
        }
    }
    /* PUTTING AND RECEIVING DATA from GAIA */

    const saveEntry = (entry) => {
        saveEntriesToGaia(entry)
    }




    return (
        <div>

       

            <h1>Journal Entries ✍</h1>

            
            {entries.reverse().map( (textEntry) => <TextEntry 
                key={textEntry.id} 
                textEntry={textEntry}
                />)
            }
            <Button variant="success" onClick={handleShow}>Add Entry</Button>

            



                



            <Modal show={show} onHide={handleClose} animation={true}>
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
            <Button variant="primary" onClick={() => addEntry(document.getElementById("new entry").value)}>
                Add Entry
            </Button>
            </Modal.Footer>
            </Modal>
        
        </div>
        
        )
 
}