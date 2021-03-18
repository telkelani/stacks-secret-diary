import React, {useState, createContext} from 'react'

export const EntryContext = createContext();


export function EntryProvider(props){
    const [entries, setEntries] = useState([])
    return (
        <EntryContext.Provider value={[entries,setEntries]}>
            {props.children}
        </EntryContext.Provider>
    )
}