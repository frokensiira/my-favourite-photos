
import { Card, Col, Form  } from 'react-bootstrap';

const PreviewPhoto = ({photo}) => {

    return (  
        <Col sm={6} md={4} lg={3}>                                
            <Card className="mb-3">
                <a href={photo.fileUrl} title="View image" data-attribute="SRL">
                    <Card.Img variant="top" src={photo.fileUrl}/>
                </a>
            </Card>
        </Col>
    );
}

export default PreviewPhoto;
