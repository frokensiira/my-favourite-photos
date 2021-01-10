import { Card, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
//import useDeleteFile from '../hooks/useDeleteFile'

const Photo = ({photo}) => {
    //const [deletePhoto, setDeletePhoto] = useState(null);
    //useDeleteFile(deletePhoto);

    const handleDeletePhoto = () => {
        //setDeletePhoto(photo);
    }

    return (  
        <Col sm={6} md={4} lg={3}>                                
            <Card className="mb-3">
                <a href={photo.fileUrl} title="View image" data-attribute="SRL">
                    <Card.Img variant="top" src={photo.fileUrl}/>
                </a>
                <Card.Body>
                    <Button variant="danger" size="sm" onClick={handleDeletePhoto}>Radera</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}
 
export default Photo;