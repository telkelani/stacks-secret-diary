import React, {useContext, useEffect, useState} from 'react'
import {TextEntry} from './TextEntry'
import { EntryContext } from '../../providers/EntryProvider'

import Button from 'react-bootstrap/Button'
import { v4 as uuid } from 'uuid';
import {saveEntriesToGaia, getEntriesFromGaia, saveAudioToGaia, listFilesFromGaia} from '../../storage'
import {Search} from './Search'
import {AddEntryModal} from './AddEntryModal'

import compress from 'compress-base64'
import { countBy } from 'underscore';



function getTimeStamp(){
    const now = new Date().toLocaleString("en-GB",{timeZone: 'Europe/London'})
    const date = now.split("T")[0]
    const time = now.substring(now.indexOf("T")+1,now.indexOf("."))
    return date+" "+time
}   




export function TextEntries(){
 
    /**
     * Modal State variables
     */
    const [show, setShow] = useState(false);
    const [images,setImages] = useState([])
    const [audios, setAudios] = useState([])
    const [audioFiles, setAudioFiles] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setImages([]) //When add Entry button is pressed, images are reset
        setShow(true)};

    /**
     * Entries state variables
     */
    const [entries, setEntries] = useState([])

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
            console.log(new_state)
            setEntries(new_state)
        }

        catch (e) {
            console.log(e.message)
            console.log("caught")
        }


    }


// Uploading Images on this component bcoz of state. the state has to be here in order for all the entries to be fetched
    const imageUpload =  (files) => {
        console.log(files)
        files.forEach(file => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                setImages(images=>[...images,reader.result])
            }
        })
        

       
        }
    
    const uploadAudio = (e) => 
        {
            setAudios([])
            let fileArray = Array.from(e.target.files)
    
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

 

        
    const addEntry =  (text) => {
        if (text === ''){
            return
        }
        if (text.trim() == ''){
            
            alert("Please enter some text")
        }
        else{
            const confirmed = window.confirm("Are you sure you want to add entry? Remember, you cannot edit the entry once it is added")
            if (confirmed){
                // let newEntry = {
                //     id: uuid(),
                //     date: getTimeStamp(),
                //     text: text,
                //     audioFiles: audioFiles
                // }
                // console.log(newEntry)
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
                

                // let newEntries = [...prevEntries, newEntry]
                


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
    console.log(entries)
    const saveEntry = async (entry, audios) => {
        let response = await saveEntriesToGaia(entry, audios)
        console.log(response)
    }

    /**
     *  Search by text or date (This cannot be in Search Component as this is needed to be returned here)
     */
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
    
    
            let entry_date = new Date(splitted_date[0],splitted_date[1]-1,splitted_date[2],splitted_time[0]
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
    console.log(TextEntries)
    return (
        
        <div>

            {/* Title */}
            <h1>Journal Entries ✍</h1>

            {/* Search component */}
            <Search
            query={query}
            setQuery={setQuery}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
             />

            {/* Add Entry at the top of entries, as it have to scroll down to see add entry */}
            <Button variant="success" onClick={handleShow}>Add Entry</Button>
            <AddEntryModal 
            show={show} 
            handleClose={handleClose} 
            addEntry={addEntry}
            imageUpload={imageUpload}
            uploadAudio={uploadAudio}
             /> 
            
            {/* Will display all entries in reverse order (most recent) */}
            {entriestodisplay.reverse().map( (textEntry) => <TextEntry 
                key={textEntry.id} 
                textEntry={textEntry}
                />)
            }

        
        </div>
        
        )
 
}