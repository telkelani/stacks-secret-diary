import React from 'react'
import Card from 'react-bootstrap/Card'
export function UsefulLinks(){
    const usefulLinkStyles = {
    boxShadow: '5px 5px 5px 5px black',
    textAlign:'center',
    marginTop: '7vh',
    marginBottom: '3vh',
    background: '#95b4e6'}
    return (
        <Card style={usefulLinkStyles}>
        <Card.Title>
            Useful Links 🔗
        </Card.Title>

        <Card.Body>
            <a href="https://www.police.uk/forces/">Police UK</a>
            <br />
            <a href="https://www.nationaldahelpline.org.uk/">National Domestic Abuse Helpline</a>
            <br />
            <a href="https://www.womensaid.org.uk/domestic-abuse-directory/">Find Local Aid</a>
            <br />
            <a href="https://uksaysnomore.org/">UK Says No More</a>
        </Card.Body>
        </Card>
        
        )
}