import React from 'react'
import { Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


// Contains UI of Search functions (Separate component to not clutter TextEntries.js)

const searchStyles= {
    marginBottom: '5vh',
    paddingLeft:'5%',paddingRight: '5%',paddingBottom:'2vh', boxShadow: '5px 5px 5px 5px black'}

export function Search(props){
    return (
        <div>
        <Form style={searchStyles}>
        <Form.Group>
            <Form.Label>Search entry text</Form.Label>
            <Form.Control defaultValue={props.query} onChange={(e) => props.setQuery(e.target.value)} type="text"></Form.Control>
            
        </Form.Group>
    </Form>

    <Row style={{marginBottom: '5vh'}}>
        <Col xs={12} md={3}> 
            <p>Search by Date and Time</p>
        </Col>
        <Col xs={11} md={4}>
            From:
            <DatePicker timeFormat="HH:mm:ss" dateFormat="yyyy-MM-dd HH:mm:ss" 
            showTimeInput 
            isClearable 
            selected={props.startDate} onChange={(e) => props.setStartDate(e)} 
            startDate={props.startDate} endDate={props.endDate}  > </DatePicker>

        </Col>

        <Col xs={11} md={4}>
        To:
            <DatePicker timeFormat="HH:mm:ss" dateFormat="yyyy-MM-dd HH:mm:ss"  
            showTimeInput 
            isClearable  
            selected={props.endDate} 
            onChange={(e)=>props.setEndDate(e)} 
            endDate={props.endDate} 
            minDate={props.startDate} > </DatePicker>
        </Col>
    </Row>
        </div>
    )


}
