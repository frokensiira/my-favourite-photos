import { useState } from 'react';
import { FadeLoader } from 'react-spinners';
import { Button, Card, Col, Row } from 'react-bootstrap';
import useAlbums from '../hooks/useAlbums';
import { Link } from 'react-router-dom';

const Albums = () => {

    const { albums, loading } = useAlbums();

    return (  
        <div>
            <h1 className="text-center">Mina album</h1>

            {
                loading
                    ? (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
                    
                    : albums.length === 0 
                        ? (
                            <div className="text-center my-5">
                                <p>Du har inga album för närvarande</p>
                                <Link className="btn btn-primary" to="/albums/create-album">Skapa album</Link>
                            </div>
                            )
                        
                        : (<Row>
                            {albums.map(album => (
                                <Col sm={6} md={4} lg={3} key={album.id}>                                
                                    <Card className="mb-3">
                                        <Card.Img variant="top" src="https://image.shutterstock.com/image-vector/no-image-available-icon-template-600w-1036735678.jpg"/>
                                        <Card.Body>
                                            <Card.Title className="text-center">{album.albumTitle}</Card.Title>
                                            <Card.Text>Länk till kund: 1234</Card.Text>
                                            <Link to={`/albums/${album.id}`}>
                                                <Button variant="primary" size="sm">Till album</Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>)
            }
        </div>
    );
}
 
export default Albums;