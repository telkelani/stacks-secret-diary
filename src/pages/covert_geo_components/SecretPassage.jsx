import React from 'react'
import light_ocean from '../../light-ocean.jpg'
import $ from 'jquery'
import eraser from '../../jQuery.eraser-master/jquery.eraser.js'
import {secret_path} from '../../components/App'
import  Button  from 'react-bootstrap/Button'

import { userSession } from '../../auth'
import {Signin} from '../hidden_page_components/Signin'
import {HiddenPage} from '../hidden_page_components/HiddenPage'
import {Route} from 'react-router-dom'



export function redirect(){
    window.location.replace(secret_path)
}
export function SecretPassage(){
    $(function(){
        $('#ocean').eraser({
            size: 20,
            completeRatio: 0.3,
            completeFunction: redirect,
        })
    })
    return (
        <div>
           <img src={light_ocean} id="ocean" width="100vh"></img>
        </div>
            )
}

