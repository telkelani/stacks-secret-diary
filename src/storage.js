
import { userSession } from './auth';
import { Storage } from '@stacks/storage';
const storage = new Storage({ userSession });


let fileName = 'new_entries.json'

var jquery = require('jquery')
var bootstrap = require('bootstrap')
var bootbox = require('bootbox')


export const saveEntriesToGaia = async (entry, audios) => {
    var response;
    let fileResponse;
    try {
    response = await storage.putFile(fileName, JSON.stringify({entry}))

            let currentEntry = entry[entry.length-1]
            let successfulUploads = 0;
            
            for (let i = 0; i < audios.length; i++){

     
                fileResponse = await saveAudioToGaia(currentEntry.id,audios[i])
                successfulUploads++

                
                
                }

            console.log("successfulUploads "+successfulUploads)
        }
    

    catch(error){
        console.log(error)
        alert("Entry saved but audio not saved. ")
        window.location.reload()
    }


    return response
    
    
  };



export async function saveAudioToGaia(entryId,audio){

    const fileName = entryId+"_"+audio[0]
    const data = audio[1]

    const objectToStringify = {
        entryId: entryId,
        fileName: audio[0],
        data: data
    }
    
    let response = await storage.putFile(fileName, JSON.stringify(objectToStringify))

    

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
        console.log(error)
        alert(`File ${audioFileName} does not exist`)
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
        alert("No Entries")
    }

}






