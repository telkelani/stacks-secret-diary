import React from 'react'
import light_ocean from './light-ocean.jpg'
import $ from 'jquery'
import eraser from '../../jQuery.eraser-master/jquery.eraser.js'
import {secret_path} from '../../components/App'




export function redirect(){
    window.location.replace(secret_path) //Replaces location history with the secret path (User cannot go back with back button)
}
export function SecretPassage(){
    /**
     * JQuery eraser plugin. Define the image to erase by its element id
     * Then call redirect() function when image erased
     * The image is a .jpg of a color which is the same as the background so image is hidden
     * 
     */
   
    $(function(){
        $('#ocean').eraser({
            size: 20, //Size of eraser brush
            completeRatio: 0.3, //When 30% of image is erased, the callback function is called
            completeFunction: redirect, //This is the callback function to be called
        })
    })
    return (
        <div>
           <img src={light_ocean} id="ocean" width="100vh"></img>
        </div>
            )
}

