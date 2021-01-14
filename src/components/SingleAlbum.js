import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import albumImage from '../assets/image.png';

const SingleAlbum = ({album, handleDeleteAlbum}) => {
    return (
        <Col sm={6} md={4} lg={3} key={album.id}>                                
            <Card className="mb-3">
                <Card.Img className="p-4" variant="top" src={albumImage}/>
                <Card.Body>
                    <Card.Title className="text-center">{album.albumTitle}</Card.Title>
                    <Link to={`/albums/${album.id}`} className="btn btn-green btn-sm mx-2">
                        Till album
                    </Link>
                    <Button id={album.id} onClick={handleDeleteAlbum} className="btn-brownred" size="sm">Radera</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default SingleAlbum;
