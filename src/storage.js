
import { userSession } from './auth';
import { Storage } from '@stacks/storage';
import $ from 'jquery'
const storage = new Storage({ userSession });


let fileName = 'new_entries.json'

var jquery = require('jquery')
var bootstrap = require('bootstrap')
var bootbox = require('bootbox')


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



export async function saveAudioToGaia(entryId,audio){

    var response;
    const fileName = entryId+"_"+audio[0]

    var requestDialog = bootbox.dialog({
        message: `<span><i class="fa fa-spin fa-spinner"></i> Uploading ${audio[0]}. Please Wait. Do NOT refresh the page</span>`
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
        
        console.log(error)
        
    }

}






