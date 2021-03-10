import React from 'react'
import uwucat from '../../uwucat.jpg'
import $ from 'jquery'
import eraser from '../../jQuery.eraser-master/jquery.eraser.js'
import {secret_path} from '../../components/App'
//This page is supposed to show up on load. 

function redirect(){
    window.location.replace(secret_path)

}
export function Logo(){
    $(function(){
        $('#uwucat').eraser({
            size: 50,
            completeRatio: 0.8,
            completeFunction: redirect
        })
    })

    return (
        <div>
            <img src={uwucat} id="uwucat" height="29%" ></img>
          
        </div>)
}

