import React from 'react'
import  Form from 'react-bootstrap/Form'
import DatePicker from 'react-datepicker'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


// Contains UI of Search functions (Separate component to not clutter TextEntries.js)
import './Entries.css'


export function Search(props){
    return (
        <div>

        <Row>

        <Col>
       
            {/* Preventdefault on submit to stop enter key from refreshing page */}
            <Form className="search" onSubmit={(e) => e.preventDefault()}>

            <Form.Group className="text-search">
                <Form.Label>Search by text</Form.Label>
                <Form.Label>Search results come up automatically while typing</Form.Label>
                <Form.Control style={{height: '20vh' }} placeholder="Search by text" 
                defaultValue={props.query} onChange={(e) => 
                {
                    
                    props.setQuery(e.target.value)
                }
                    } as="textarea"></Form.Control>

            </Form.Group>
            </Form>
        </Col>
    <Col>

    <Row className="search">
        
        <Col  xs={12} md={12}> 
                <p className="date-search">Search by Date and Time</p>
                
                <p>Search results will come up automatically when both dates are specified</p>
        </Col>

        
        <Col>

           
                <Col>
                    <Col>
                        From:
                    </Col>
                   
                   <Col>
                    <DatePicker className="date-search-input" timeFormat="HH:mm:ss" dateFormat="yyyy-MM-dd HH:mm:ss" 
                        showTimeInput 
                        isClearable 
                        selected={props.startDate} onChange={(e) => props.setStartDate(e)} 
                        startDate={props.startDate} endDate={props.endDate}  > </DatePicker>
                   </Col>


                </Col>

            <Col>
                    <Col>
                        To:
                    </Col>
                <Col>
                    <DatePicker className="date-search-input" timeFormat="HH:mm:ss" dateFormat="yyyy-MM-dd HH:mm:ss"  
                    showTimeInput 
                    isClearable  
                    selected={props.endDate} 
                    onChange={(e)=>props.setEndDate(e)} 
                    endDate={props.endDate} 
                    minDate={props.startDate} > </DatePicker>
                
                </Col>
 
            </Col>

         

        </Col>

        
    </Row>

    </Col>

    </Row>
        </div>
    )


}
