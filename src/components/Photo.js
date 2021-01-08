import { Card, Col } from 'react-bootstrap';

const Photo = ({photo}) => {

    return (  
        <Col sm={6} md={4} lg={3}>                                
            <Card className="mb-3">
                <a href={photo.url} title="View image" data-attribute="SRL">
                    <Card.Img variant="top" src={photo.url}/>
                </a>
            </Card>
        </Col>
    );
}
 
export default Photo;