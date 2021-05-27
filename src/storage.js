
import { userSession } from './auth';
import { Storage } from '@stacks/storage';
import $ from 'jquery'
const storage = new Storage({ userSession });


let fileName = 'new_entries.json' //The json of the entries collated in one json file (except audios)

//Fancy alert boxes
var jquery = require('jquery')
var bootstrap = require('bootstrap')
var bootbox = require('bootbox')

/**
 * Uploads the JSON file defined above to dummy cloud terminal by Gaia hub.
 * storage.putFile() automatically encrypts this file and writes with Gaia hub. 
 * This function makes the data unreadable by cloud providers. The private key needed to decrypt this file is created in authentication session
 *
 */

/** UPLOADING WITH GAIA */
export const saveEntriesToGaia = async (entry) => {
    var response;
    let fileResponse;
    var reqDialog = bootbox.dialog({message: '<span><i class="fa fa-spin fa-spinner"></i> Adding Entry... \n Please Do NOT refresh</span>'})
    try {
    response = await storage.putFile(fileName, JSON.stringify({entry}))
    reqDialog.modal('hide')
    bootbox.dialog({message:'Entry added'})
    }

    
    

    catch(error){
        console.log(error)
        reqDialog.modal('hide')
        alert("Entry saved but audio not saved. ")

        //Refresh the page so that the entry is removed 
        window.location.reload()
    }


    return response
    
    
  };


//Because Gaia Hub has an upload limit of 25MB per file, entries and audios cannot be uploaded together
//This function uploads each audio file and links file to respective entry
export async function saveAudioToGaia(entryId,audio){

    var response;
    const fileName = entryId+"_"+audio[0] //Relates to entry that it was uploaded with by taking saving the file name with entryId as a prefix

    var requestDialog = bootbox.dialog({
        message: `<span><i class="fa fa-spin fa-spinner"></i> Uploading ${audio[0]}. Please Wait. Do NOT refresh the page</span>`
    })


    const data = audio[1] 

    const objectToStringify = {
        entryId: entryId,
        fileName: audio[0],
        data: data
    } //This is the JSON object that is stringified and uploaded with Gaia.
    try {
        response = await storage.putFile(fileName, JSON.stringify(objectToStringify))
        bootbox.dialog({
            message:`<span><i class="fas fa-check-circle"></i> Successfully uploaded ${audio[0]}</span>`,
            closeButton: true})
        requestDialog.modal('hide')
        

    }

    catch (error){
        console.log(error)
        bootbox.alert("Upload failed")
    }
    

    return response

}
/** -------------------- */

/** RETRIEVING FROM GAIA HUB */

//Return audio files from Gaia hub
export async function listAudioFilesFromGaia(entry, audioFileName){
    var promise;
    try {
        let entryId = entry.id
        let fileName = entryId+"_"+audioFileName
        const fileJSON = await storage.getFile(fileName) //Automatically decrypts file if response from Gaia hub is received, with private app key.
        promise = JSON.parse(fileJSON)
    }
    
    catch(error){
        alert(`File ${audioFileName} does not exist`)
    }

    return promise 
}

//Gets the entry from Gaia
export async function getEntriesFromGaia(){


    try{
        
    const entriesJSON = await storage.getFile(fileName) //Automatically decrypts file if response from Gaia hub is received, with private app key.
        if (entriesJSON){
            
            const json_promise = JSON.parse(entriesJSON) 

            return json_promise //Returns promise, as function cannot guarantee that it will return data (which is why it is async)
        }

        
    }

    catch( error ){
        
        console.log(error)
        
    }

}
/** -------------------- */






