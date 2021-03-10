import React from 'react'


export function Article({article}){
    const style={
        display: 'flex',
        flexFlow: 'row wrap',
        height: '25%',
        marginTop: '5%',
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: '5%',
        background: 'linear-gradient(45deg,rgba(0,0,255,0.5),rgba(255,0,0,0.2))',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '5px 5px rgba(0,0,0,0.2)',
        borderRadius: '10px 23px 10px 23px',
        padding: '20px 20px'
        
    }
    return (
        <div style={style}>
            <h3 style={{fontWeight: '800'}}>{article.title}</h3>
            <p>{article.description}</p>
        
        </div>)
}