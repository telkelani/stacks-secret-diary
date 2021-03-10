import React from 'react'
import {NavBar} from './Navbar'
import {Country} from './Country'
export function CovertPage(){

    const BackToTop = () => {
 
        const buttonStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            cursor: 'pointer',
            bottom: '10%',
            right: '5%',
            height: '10%',
            width: '10%',
            background: 'rgba(255,255,255,0.5)',
            borderRadius: '50%',
            boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.5)'
        }
        return (<div style={buttonStyle} onClick={() => window.scrollTo(0,0)}>
            <p>Back To Top</p>
            </div>)
    }

    return (
        <div>
            <NavBar />
            <Country code='us' />
            <Country code='gb' />
            <Country code='pl' />
            <Country code='eg' />
            <Country code='it' />
            <Country code='ru' />
            <Country code='mx' />
            <Country code='co' />
            <Country code='za' />
            <BackToTop />

        </div>
    )
}