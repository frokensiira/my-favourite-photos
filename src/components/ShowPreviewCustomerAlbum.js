import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';
import PreviewPhoto from './PreviewPhoto';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const ShowPreviewCustomerAlbum = () => {
    const { albumId, ownerId } = useParams();
    const { state } = useLocation(); 
    const [loading, setLoading] = useState(true);
    const [error, setError ] = useState(null);
    const navigate = useNavigate();

    const newAlbumTitle = `${state.albumTitle} - kundvalda`;

    const handleSubmitReviewedAlbum = () => {
        const album = {
            albumTitle: newAlbumTitle,
            owner: ownerId,
        }
        
        const promises = state.likedPhotos.map(async likedPhoto => {
            setLoading(true);
            try {
                const photo = {
                    name: likedPhoto.name,
                    albumTitle: newAlbumTitle,
                    path: likedPhoto.path,
                    owner: ownerId,
                    fileUrl: likedPhoto.fileUrl, 
                    type: likedPhoto.type,
                    size: likedPhoto.size
                }

                const result = await db.collection('photos').add(photo);

                return new Promise((resolve, reject) => {resolve(result)})

            } catch(error) {
                setError(error.message);
                console.log('something went wrong', error);
            }

        })

        Promise.all(promises)
            .then(() => {
                db.collection('albums').add(album)
                .then(doc => {
                    setLoading(false);
                    navigate('/confirmation');
                });
            }).catch (error => {
                setError(error.message);
            });
    }

    return (
        <div className="text-center">
            <h1 className="text-center">{newAlbumTitle}</h1>
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
                <Button onClick={handleSubmitReviewedAlbum} variant="secondary">Bekräfta</Button>
            </SRLWrapper>
                    
        </div>
    )
}

export default ShowPreviewCustomerAlbum;
