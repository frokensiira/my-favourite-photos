import { Button, Card, Col, Form  } from 'react-bootstrap';

const Photo = ({photo, handleCheckBox, handleDeletePhoto}) => {

    return (  
        <Col sm={6} md={4} lg={3}>                                
            <Card className="mb-3">
                <a href={photo.fileUrl} title="View image" data-attribute="SRL">
                    <Card.Img variant="top" src={photo.fileUrl}/>
                </a>
                <Card.Body>
                    <Form.Row >
                        <Form.Group as={Col}>
                            <Form.Check type="checkbox" label="Välj" onChange={(e) => handleCheckBox(e)} id={photo.id}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button className="btn-brownred" size="sm" onClick={handleDeletePhoto} id={photo.id}>Radera</Button>
                        </Form.Group>
                    </Form.Row>
                </Card.Body>
            </Card>
        </Col>
    );
}
 
export default Photo;