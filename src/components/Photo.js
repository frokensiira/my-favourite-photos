import { Button, Card, Col, Form  } from 'react-bootstrap';

const Photo = ({photo, handleCheckBox, handleDeletePhoto}) => {

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

                    <Button variant="danger" size="sm" onClick={handleDeletePhoto} id={photo.id}>Radera</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}
 
export default Photo;