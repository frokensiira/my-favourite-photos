import { SRLWrapper } from 'simple-react-lightbox';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FadeLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAlbum from '../hooks/useAlbum';
import CustomerPhoto from './CustomerPhoto';

const CustomerAlbum = () => {
    const { albumId, ownerId } = useParams();
    const { photos, albumTitle, loading } = useAlbum(albumId, ownerId);
    const navigate = useNavigate();

    const [reviewedPhotos, setReviewedPhotos] = useState(photos);

    useEffect(() => {
        const newPhotos = photos.map(photo => {
            const newPhoto = {
                review: 'like',
                ...photo,
                
            };
            return newPhoto;
        })
        setReviewedPhotos(newPhotos);
    }, [photos]);

    const handleReviewButtons = (review, photoId) => {

        const updatedReviewedPhotos = reviewedPhotos.map(photo =>
            photo.id === photoId ? { ...photo, review: review } : photo
        );

        setReviewedPhotos(updatedReviewedPhotos);

    }

    const handleSubmitToPreview = () => {

        const likedImages = reviewedPhotos.filter(photo =>{
            return photo.review === 'like';
        });

        if(likedImages.length === 0){
            alert('Du måste välja minst ett foto')
            return;
        }

        const dislikedImages = reviewedPhotos.filter(photo =>{
            return photo.review === 'dislike';
        })

        navigate(`/${ownerId}/review/preview/${albumId}`, {state: {likedPhotos: likedImages, dislikedPhotos: dislikedImages, albumTitle, total: photos.length}});
    }

    return (  
        <div className="text-center">
            <h1 className="text-center my-4 text-white">{albumTitle}</h1>
            
                    {
                        loading
                            ? (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
                            
                            : (

                                <SRLWrapper>
                                    <Row className="mb-5">
                                    {photos.map(photo => (
                                            <CustomerPhoto photo={photo} key={photo.id}  handleReviewButtons={handleReviewButtons}/>
                                        ))}
                                    
                                    </Row>
                                </SRLWrapper>

                            )
                    }

                    <Row>
                        <Col md={{ span: 6, offset: 3}}>
                            <Form>
                                <Button onClick={handleSubmitToPreview}>Förhandsgranska</Button>
                            </Form>
                        </Col>
                    </Row>
        </div>
    );
}
 
export default CustomerAlbum;