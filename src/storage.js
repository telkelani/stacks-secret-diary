
import { userSession } from './auth';
import { Storage } from '@stacks/storage';
const storage = new Storage({ userSession });


let fileName = 'new_entries.json'

var jquery = require('jquery')
var bootstrap = require('bootstrap')
var bootbox = require('bootbox')

export const saveEntriesToGaia = async (entry) => {
    
    var reqDialog = bootbox.dialog({
        message: 'Adding Entry....',
        size: 'large',
        closeButton: false
    })
    storage.putFile(fileName, JSON.stringify({ entry }))
    .then(() => {
       reqDialog.modal('hide')
        var successDialog = bootbox.dialog({
            message: 'Entry added. Refreshing page in 3 seconds...',
            size: 'large',
            closeButton: false
        })
        setTimeout(() => {
            window.location.reload()

        }, 3000)
    }).catch(error => {
        
        setTimeout(() => {
            bootbox.dialog(
                {
                message: "NO STORAGE. Entry NOT ADDED. Refreshing page in 3 seconds... ",
                closeButton: false})
            reqDialog.modal('hide')
        
        }, 3000)

        setTimeout(() => window.location.reload(), 5000)

    })
    
    
    
  };

export async function getEntriesFromGaia(){
    try{
    var loadingEntries = bootbox.dialog({
        message: 'Loading Entries...',
        closeButton: false,
        size: 'large'
    })
    const entriesJSON = await storage.getFile(fileName)
        if (entriesJSON){
            loadingEntries.modal('hide')
            const json_promise = JSON.parse(entriesJSON)
            return json_promise
        }
    }

    catch( error ){
        setTimeout(() => {
            loadingEntries.modal('hide')
            bootbox.dialog({
            message:"Currently have no entries",
            size: 'large'}) 
            
        },3000)//This is better because I am not adding an entry that says No entries, the json will just be the entries
    }
        

    



}






