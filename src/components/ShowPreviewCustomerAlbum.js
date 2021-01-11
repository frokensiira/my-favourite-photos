import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';
import PreviewPhoto from './PreviewPhoto';

const ShowPreviewCustomerAlbum = () => {
    const { albumId, ownerId } = useParams();
    const { state } = useLocation(); 

    const newTitle = `${state.albumTitle} - kundvalda`;

    return (
        <div className="text-center">
            <h1 className="text-center">{newTitle}</h1>
            <p>Du har valt {state.likedPhotos.length} {state.likedPhotos.length > 1 ? 'bilder' : 'bild'} av totalt {state.total}</p>

            <SRLWrapper>
                <h2>Valda bilder</h2>
                <Row className="mb-5">
                        
                        {
                            state.likedPhotos.map(photo => (
                                <PreviewPhoto photo={photo} key={photo.id} />
                        ))}    
                        
                </Row>
                        <h2>Bortvalda bilder</h2>
                <Row className="mb-5">
                        {
                            state.dislikedPhotos.map(photo => (
                                <PreviewPhoto photo={photo} key={photo.id} />
                        ))}  
                        

                </Row>
                <Link to={`/${ownerId}/review/${albumId}`} className="btn btn-primary">Redigera</Link>
                <Button variant="secondary">Bekräfta</Button>
            </SRLWrapper>
                    
        </div>
    )
}

export default ShowPreviewCustomerAlbum;
