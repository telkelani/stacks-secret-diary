import React from 'react'
import {HashLink} from 'react-router-hash-link'
import {Logo} from './Logo'
import './Covert.css'
import {Link} from 'react-router-dom'

export function NavBar(){
    return (
        <div id="container">
            <Logo />
            
            <div className="nav navbar">
                <HashLink to="#us"><h3 className="nav-link">US</h3></HashLink>
                <HashLink to="#gb"><h3 className="nav-link">UK</h3></HashLink>
                <HashLink to="#pl"><h3 className="nav-link">Poland</h3></HashLink>
                <HashLink to="#eg"><h3 className="nav-link">Egypt</h3></HashLink>
                <HashLink to="#it"><h3 className="nav-link">Italy</h3></HashLink>
                <HashLink to="#ru"><h3 className="nav-link">Russia</h3></HashLink>
                <HashLink to="#mx"><h3 className="nav-link">Mexico</h3></HashLink>
                <HashLink to="#co"><h3 className="nav-link">Colombia</h3></HashLink>
                <HashLink to="#za"><h3 className="nav-link">Zambia</h3></HashLink>
            </div>

        </div>
        
        )

}