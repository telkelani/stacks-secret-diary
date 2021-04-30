import React, {useState, createContext} from 'react'

export const EntryContext = createContext();


export function EntryProvider(props){
    const [entries, setEntries] = useState([])
    const [images, setImages] = useState([])
    const [audios, setAudios] = useState([])
    return (
        <EntryContext.Provider value={[entries,setEntries, images, setImages,audios, setAudios]}>
            {props.children}
        </EntryContext.Provider>
    )
}