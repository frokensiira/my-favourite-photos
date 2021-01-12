import CustomerPhoto from './CustomerPhoto';
import { SRLWrapper } from 'simple-react-lightbox';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FadeLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import useAlbum from '../hooks/useAlbum';
import { useNavigate } from 'react-router-dom';

const CustomerAlbum = () => {
    const { albumId, ownerId } = useParams();
    //const [loading, setLoading] = useState(true);
    const { photos, albumTitle, loading } = useAlbum(albumId, ownerId);
    const navigate = useNavigate();

    const [likedPhotos, setLikedPhotos] = useState(photos);
    const [disLikedPhotos, setDisLikedPhotos] = useState([]);

    useEffect(() => {
        setLikedPhotos(photos);
    }, [photos]);

    const handleReviewButtons = (review, photoId) => {

        if(review === 'dislike') {
            const updatedPhotos = likedPhotos.filter(photo => photo.id !== photoId);
            setLikedPhotos(updatedPhotos);
        }

    }

    const handleSubmitToPreview = () => {

        if(likedPhotos.length === 0){
            alert('Du måste välja minst ett foto')
            console.log('You have to choose at least one photo');
            return;
        }

        const spreaded = [...likedPhotos, ...photos];
        const dislikedPhotos = spreaded.filter(el => {
            return !(likedPhotos.includes(el) && photos.includes(el));
        });

        setDisLikedPhotos(dislikedPhotos);

        navigate(`/${ownerId}/review/preview/${albumId}`, {state: {likedPhotos, dislikedPhotos, albumTitle, total: photos.length}});
    }

    return (  
        <div className="text-center">
            <h1 className="text-center my-4">{albumTitle}</h1>
            
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