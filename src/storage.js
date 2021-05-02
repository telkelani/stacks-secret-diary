
import { userSession } from './auth';
import { Storage } from '@stacks/storage';
import { faAllergies } from '@fortawesome/free-solid-svg-icons';
const storage = new Storage({ userSession });


let fileName = 'new_entries.json'

var jquery = require('jquery')
var bootstrap = require('bootstrap')
var bootbox = require('bootbox')


export const saveEntriesToGaia = async (entry, audios) => {
    var response;
    let fileResponse;
    var reqDialog = bootbox.dialog({message: 'Adding Entry... \n Please Do NOT refresh'})
    try {
    response = await storage.putFile(fileName, JSON.stringify({entry}))
    reqDialog.modal('hide')
    bootbox.dialog({message:'Entry added'})
    }

    
    

    catch(error){
        console.log(error)
        reqDialog.modal('hide')
        alert("Entry saved but audio not saved. ")
        window.location.reload()
    }


    return response
    
    
  };



export async function saveAudioToGaia(entryId,audio){

    var response;


    const fileName = entryId+"_"+audio[0]

    var requestDialog = bootbox.dialog({
        message: `Uploading ${audio[0]}. Please Wait. Do NOT refresh the page`
    })


    const data = audio[1]

    const objectToStringify = {
        entryId: entryId,
        fileName: audio[0],
        data: data
    }
    try {
        response = await storage.putFile(fileName, JSON.stringify(objectToStringify))
        bootbox.dialog({
            message:`Successfully uploaded ${audio[0]}`,
            closeButton: true})
        requestDialog.modal('hide')

    }

    catch (error){
        console.log(error)
        bootbox.alert("Upload failed")
    }
    

    return response

}

export async function listFilesFromGaia(entry, audioFileName){
    var promise;
    try {
        let entryId = entry.id
        let fileName = entryId+"_"+audioFileName
        const fileJSON = await storage.getFile(fileName)
        promise = JSON.parse(fileJSON)
    }
    
    catch(error){
        // alert(`File ${audioFileName} does not exist`)
    }

    return promise
}


export async function getEntriesFromGaia(){
    try{
    const entriesJSON = await storage.getFile(fileName)
        if (entriesJSON){
            const json_promise = JSON.parse(entriesJSON)
            return json_promise
        }
        
    }

    catch( error ){
        //This is better because I am not adding an entry that says No entries, the json will just be the entries
        
        console.log(error)
        
    }

}






