import { Button, Card, Col, Form  } from 'react-bootstrap';
import { useState } from 'react';
//import useDeleteFile from '../hooks/useDeleteFile'

const Photo = ({photo, handleCheckBox}) => {
    //console.log('this is photo', photo);
    return (  
        <Col sm={6} md={4} lg={3}>                                
            <Card className="mb-3">
                <a href={photo.fileUrl} title="View image" data-attribute="SRL">
                    <Card.Img variant="top" src={photo.fileUrl}/>
                </a>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Välj" onChange={(e) => handleCheckBox(e)} id={photo.id}/>
                        </Form.Group>
                    </Form>

                    {/* <Button variant="danger" size="sm" onClick={handleDeletePhoto}>Radera</Button> */}
                </Card.Body>
            </Card>
        </Col>
    );
}
 
export default Photo;