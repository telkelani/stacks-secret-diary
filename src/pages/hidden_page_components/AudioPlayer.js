import React from 'react'
export function AudioPlayer({fileName,audioFile}) {
    
    return (   
    <div>
        <p>{fileName}</p>
        <audio controls>
        <source src={audioFile} />
        </audio>

    </div>

    )
    }