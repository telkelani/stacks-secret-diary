import React from 'react'
import { userSession } from './auth';
import { Storage } from '@stacks/storage';
const storage = new Storage({ userSession });
export const defaultEntry = [{
    id: 0,
    date: '',
    entry: ''
} ]


let fileName = 'new_entries.json'

export const saveEntriesToGaia = (entry) => {
    storage.putFile(fileName, JSON.stringify({ entry })).then(result => {console.log(result)})
  };

export async function getEntriesFromGaia(){
    try{


    const entriesJSON = await storage.getFile(fileName)
        if (entriesJSON){
            const json_promise = JSON.parse(entriesJSON)
            return json_promise
        }
    }

    catch( error ){
        const defaultEntry =  {entry: [{text: 'No entries'}]}
        const json_string = JSON.stringify(defaultEntry)
        const json = JSON.parse(json_string)
        return json
    }
        

    



}






