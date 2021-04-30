
import { userSession } from './auth';
import { Storage } from '@stacks/storage';
const storage = new Storage({ userSession });


let fileName = 'new_entries.json'

export const saveEntriesToGaia = async (entry) => {
    

    storage.putFile(fileName, JSON.stringify({ entry }))
    
    
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
        alert("Currently have no entries") //This is better because I am not adding an entry that says No entries, the json will just be the entries
    }
        

    



}






