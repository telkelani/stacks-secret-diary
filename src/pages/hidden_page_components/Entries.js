import React, {useEffect, useState, useRef} from 'react'
import {Entry} from './Entry'

import Button from 'react-bootstrap/Button'
import { v4 as uuid } from 'uuid';
import {saveEntriesToGaia, getEntriesFromGaia, saveAudioToGaia} from '../../storage'
import {Search} from './Search'
import {AddEntryModal} from './AddEntryModal'
import Collapse from 'react-bootstrap/Collapse'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './Entries.css'

import ScrollAnimation from 'react-animate-on-scroll'

var bootbox = require('bootbox')

function getTimeStamp(){
    const now = new Date().toLocaleString("en-GB",{timeZone: 'Europe/London'})

    const date = now.split(", ")[0]
    const time = now.split(", ")[1]

    return date+" "+time
}   




export function Entries(){
 
    /**
     * Modal State variables
     */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setImages([]) //When add Entry button is pressed, images are reset
        setAudios([])
        setAudioFiles([])
        setShow(true)};

    /**
     * Entries state variables
     */
    const [entries, setEntries] = useState([])
    const [images,setImages] = useState([])
    const [audios, setAudios] = useState([])
    const [audioFiles, setAudioFiles] = useState([])

    /*useEffect renders this function when the DOM renders
    * The second  argument specifies that this should only when the page is loaded (mounted)*/
    useEffect( () => {

        bootbox.dialog({message:'<span><i class="fa fa-spin fa-spinner"></i> Loading Entries</span>'})
        try{
            getEntries().then(() => bootbox.hideAll())
             
        }

        catch (error){
            console.log(error)
        }
        
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
        }

        catch (e) {
            bootbox.alert("No entries")
        }

       


    }


// Uploading Images on this component bcoz of state. the state has to be here in order for all the entries to be fetched
    const imageUpload =  (files) => {
        files.forEach(file => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            
            reader.onload = () => {
                var image = new Image()
                image.src = reader.result
                
                //A valid image will always have a width and a height
                if (image.width == 0 && image.height == 0){
                    //The preview will still show a corrupt image
                    //But it will not be uploaded as images state is reset
                    //so vulnerability is patched
                    alert("This is not an image file")
                    setImages([])
                }
                else{
                    setImages(images=>[...images,reader.result])
                }
            }
        })
        

       
        }
    
    const uploadAudio = (e) => 
        {
            setAudios([])
            let fileArray = Array.from(e.target.files)
            if (fileArray.length == 0){
                setAudios([])
                setAudioFiles([])
                
            }
            else {
                fileArray.forEach( file => {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = () => {
                    
                       const fileContent = reader.result
                       
                       
                       setAudios(prev => [...prev,[file.name,fileContent]])
                       setAudioFiles(prev => [...prev, file.name])
                    }
                })

            }

        }

 

        
    const addEntry =  (text) => {
        if (text === ''){
            alert("Please enter some text")
            
        }
        else if (text.trim() == ''){
            alert("Please enter some text")
            
        }
        else{
            const confirmed = window.confirm("Are you sure you want to add entry? Remember, you cannot edit the entry once it is added")
            if (confirmed){
                setEntries( prevEntries => {
                let id = uuid()
                let newEntries = [...prevEntries,
                        {
                    id:id,
                    date:getTimeStamp(),
                    text:text,
                    images: images,
                    audios: audioFiles
                }]
                
                console.log(audios)
                saveEntry(newEntries, audios)
                
                
                // listFilesFromGaia()
                return newEntries
                })

    
                handleClose()
            
            }

            
        }
    }
    /* PUTTING AND RECEIVING DATA from GAIA */
  
    const saveEntry = async (entry, audios) => {
        let response = await saveEntriesToGaia(entry)

        let currentEntry = entry[entry.length-1]
        for (let i = 0; i < audios.length; i++){
            let fileResponse = await saveAudioToGaia(currentEntry.id,audios[i])
        }
        console.log(audios.length)
        
    }

    /**
     *  Search by text or date (This cannot be in Search Component as this is needed to be returned here)
     */
     const [query,setQuery] = useState('')

     const [startDate, setStartDate] = useState(null)
     const [endDate, setEndDate] = useState(null)

     const NoEntries = () => {
        var element = null
        if (entries.length == 0){
            element = <h3>No entries here. Click Add Entry to add a new entry</h3>
        }
        return element
     }

     const displayEntries = () => {

        
        let entriestodisplay = entries.filter(function(entry){
            //Parse entry date (It isnt parsed properly in mobile)
            //Break down timestamp into its date and time parts
            let splitted_datetime = entry.date.split(" ")
            let splitted_date = splitted_datetime[0].split("/") 
            let splitted_time = splitted_datetime[1].split(":")

    
            
            let entry_date = new Date(splitted_date[2],splitted_date[1]-1,splitted_date[0],splitted_time[0]
                ,splitted_time[1],splitted_time[2]) 
                //Parsing date using new Date(string) was problematic for mobile
                //Had to break down the date into separate parts and create a new date object where the year, month, day, etc 
                //is a separate argument
                //Month is -1 as January in javascript is 0 not 1
    
            if (startDate != null && endDate!= null){
               return  entry.text.toLowerCase().indexOf(query.toLowerCase()) !== -1 && 
               (entry_date >= startDate && entry_date <= endDate)
    
            }
            return entry.text.toLowerCase().indexOf(query.toLowerCase()) !== -1 
            
    
    
        })
        
        
        return entriestodisplay
    
    }


    //This returns the entries based on search (If nothing is searched will just return all entries)
    let entriestodisplay = displayEntries() 

    const [openSearch, setOpenSearch] = useState(false)
    const searchButton = useRef(null)

    return (
        
        <div>

            {/* Title */}
    
            <h1>Journal <i class="fas fa-book-reader" style={{color: '#52a3cc'}}></i>  Entries </h1>

            <Row>

            <Col className="text-left">
      
            <Button className="search-button" ref={searchButton} onClick={()=> setOpenSearch(!openSearch)} 
            aria-controls="search-collapse-content"
            aria-expanded={openSearch}
            >
                Search Entries <i class="fas fa-search"></i>
            </Button>

            </Col>



            <Col className="text-right">
            
                {/* Add Entry at the top of entries, as it have to scroll down to see add entry */}
                <Button variant="success" onClick={handleShow}>Add Entry</Button>
                <AddEntryModal 
                show={show} 
                handleClose={handleClose} 
                addEntry={addEntry}
                imageUpload={imageUpload}
                uploadAudio={uploadAudio}
                /> 
            </Col>

            </Row>

            
            <Collapse in={openSearch} 
            onEnter={() => searchButton.current.innerHTML = "Hide Search"} 
            onExit={() => searchButton.current.innerHTML = "Search Entries <i class='fas fa-search'></i>"}>
                <div id="search-collapse-content">
                    <Search
                        query={query}
                        setQuery={setQuery}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />

                </div>
            </Collapse>
            
            {/* Will display all entries in reverse order (most recent) */}
            <NoEntries />
                {entriestodisplay.reverse().map( (entry) => <Entry 
                    key={entry.id} 
                    entry={entry}
                    />)
                }


        
        </div>
        
        )
 
}