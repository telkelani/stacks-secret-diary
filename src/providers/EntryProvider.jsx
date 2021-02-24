import React, {useState, createContext} from 'react'

export const EntryContext = createContext();


export function EntryProvider(props){
    const [textEntries, setTextEntry] = useState([])
    return (
        <EntryContext.Provider value={[textEntries,setTextEntry]}>
            {props.children}
        </EntryContext.Provider>
    )
}