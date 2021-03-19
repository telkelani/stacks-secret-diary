import React, {useContext, useEffect, useState} from 'react'
import {TextEntry} from './TextEntry'
import { EntryContext } from '../../providers/EntryProvider'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { v4 as uuid } from 'uuid';
import {saveEntriesToGaia, getEntriesFromGaia} from '../../storage'
import { Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function getTimeStamp(){
    const now = new Date().toISOString()
    const date = now.split("T")[0]
    const time = now.substring(now.indexOf("T")+1,now.indexOf("."))
    return date+" "+time
}   

function getDate(date){
    const input_date = date.toISOString()
    const new_date = input_date.split("T")[0]
    const time = input_date.substring(input_date.indexOf("T")+1,input_date.indexOf("."))
    return new_date+" "+time
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
            setEntries(new_state)
            console.log(new_state)
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
    const [query,setQuery] = useState('')

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const displayEntries = () => {
        
        let entriestodisplay = entries.filter(function(entry){
            
            //Parse entry date (It isnt parsed properly in mobile)
            //Break down timestamp into its date and time parts
            let splitted_datetime = entry.date.split(" ")
            let splitted_date = splitted_datetime[0].split("-") 
            let splitted_time = splitted_datetime[1].split(":")
        
            console.log("entry date string "+entry.date)
            console.log(splitted_datetime)
            console.log("entry date "+ splitted_date)
            console.log("entry time "+ splitted_time)
            console.log("start date "+startDate)
            console.log("end date "+endDate)

            let entry_date = new Date(splitted_date[0],splitted_date[1]-1,splitted_date[2],splitted_time[0]
                ,splitted_time[1],splitted_time[2]) 
                //Parsing date using new Date(string) was problematic for mobile
                //Had to break down the date into separate parts and create a new date object where the year, month, day, etc 
                //is a separate argument
                //Month is -1 as January in javascript is 0 not 1
            

            
            console.log("Parsed DATE", entry_date)
            if (startDate != null && endDate!= null){
                console.log("condition "+new Date(entry.date) >= startDate && new Date(entry.date) <= endDate)
               return  entry.text.toLowerCase().indexOf(query.toLowerCase()) !== -1 && 
               (entry_date >= startDate && entry_date <= endDate)

            }
            return entry.text.toLowerCase().indexOf(query.toLowerCase()) !== -1 
            


        })
        
        return entriestodisplay

    }


    let entriestodisplay = displayEntries()


    const searchStyles= {
        marginBottom: '5vh',
        paddingLeft:'5%',paddingRight: '5%',paddingBottom:'2vh', boxShadow: '5px 5px 5px 5px black'}

    return (
        <div>


            <h1>Journal Entries ✍</h1>
            {/* Cant make this a separate function as the input loses focus when it gets called as a component as it 
            DOM has to re render */}
            <Form style={searchStyles}>
                <Form.Group>
                    <Form.Label>Search entry text</Form.Label>
                    <Form.Control defaultValue={query} onChange={(e) =>  setQuery(e.target.value)} type="text"></Form.Control>
                    
                </Form.Group>
            </Form>

            <Row style={{marginBottom: '5vh'}}>
                <Col xs={12} md={3}> 
                    <p>Search by Date and Time</p>
                </Col>
                <Col xs={11} md={4}>
                    From:
                    <DatePicker timeFormat="HH:mm:ss"    dateFormat="yyyy-MM-dd HH:mm:ss" showTimeInput isClearable selected={startDate} onChange={(e) => setStartDate(e)} startDate={startDate} endDate={endDate}  > </DatePicker>

                </Col>

                <Col xs={11} md={4}>
                To:
                    <DatePicker timeFormat="HH:mm:ss" dateFormat="yyyy-MM-dd HH:mm:ss"  showTimeInput isClearable  selected={endDate} onChange={(e)=>setEndDate(e)} endDate={endDate} minDate={startDate} > </DatePicker>
                </Col>
            </Row>
            
            
           
            
            
            {entriestodisplay.reverse().map( (textEntry) => <TextEntry 
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