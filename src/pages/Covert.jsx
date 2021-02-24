import React from 'react'
import uwucat from '../uwucat.jpg'
import $ from 'jquery'
import eraser from '../jQuery.eraser-master/jquery.eraser.js'
//This page is supposed to show up on load. 
function redirect(){
    window.location.replace("/"+process.env.REACT_APP_SECRET_ROUTE)
}
export function CovertPage(props){
    $(function(){
        $('#uwucat').eraser({
            size: 80,
            completeRatio: 0.8,
            completeFunction: redirect
        })
    })

    return (
        <div>
            <img src={uwucat} id="uwucat" width="20%" height="20%"></img>
          
        </div>)
}

