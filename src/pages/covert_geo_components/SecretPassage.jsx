import React from 'react'
import ocean from '../../ocean.jpg'
import $ from 'jquery'
import eraser from '../../jQuery.eraser-master/jquery.eraser.js'
import {secret_path} from '../../components/App'
import  Button  from 'react-bootstrap/Button'
//This page is supposed to show up on load. 


function redirect(){
    
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
           <img src={ocean} id="ocean" width="100vh"></img>
        </div>
            )
}
// export function SecretPassage(){
//     const style={
//         background: 'rgb(105, 129, 231)',
//         border: 'none',
//         cursor: 'default'
//     }
//     const redirect = (e) => {
//         setTimeout(()=>{
//             window.location.replace(secret_path)
//         },3000)
//     }
//     return (
//         <Button style={style} onMouseOver={redirect}>
//            Passage 
//         </Button>)
// }
