import React, {useContext, useEffect, useState} from 'react'
import {TextEntry} from '../components/TextEntry'
import { EntryContext } from '../providers/EntryProvider'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { v4 as uuid } from 'uuid';
import {saveEntriesToGaia, getEntriesFromGaia} from '../storage'


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
    const [textEntries, setTextEntry] = useContext(EntryContext)

    useEffect( () => {
        getEntries()
            

            
            
        
        
        
    },[])

    const getEntries = async () => {
        try{
            let fetchedEntries = await getEntriesFromGaia()
            let new_state = fetchedEntries.entry
            if (new_state.length>1){
                new_state = new_state.slice(1,)
            }
            setTextEntry(new_state)
        }

        catch (e) {
            console.log("caught")
        }


    }

    


    const addTextEntry = (value) => {
        if (value === ''){
            return
        }
        if (value.trim() == ''){
            
            alert("Input something dummy")
        }
        else{
            const confirmed = window.confirm("you gucci?")
            if (confirmed){
                
                setTextEntry(prevState => {
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
        <div style={{display:"flex", flexFlow:"column wrap", marginTop:"10vh"}}>   
            
            {textEntries.map( (textEntry) => <TextEntry 
            key={textEntry.id} 
            textEntry={textEntry}
             />)
            }
            {<button onClick={() => getEntries()}>GAIA RETRIEVE</button>}
            {/* <input id="uwu"></input> */}
            {/* <button onClick={() => saveEntry(document.getElementById("uwu").value)}>GAIA SAVE</button> */}
            <Button variant="primary" style={{width:"50rem"}} onClick={handleShow}>Add Entry</Button>



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
            <Button variant="primary" onClick={() => addTextEntry(document.getElementById("new entry").value)}>
                Add Entry
            </Button>
            </Modal.Footer>
            </Modal>

            


        </div>
        )
 
}