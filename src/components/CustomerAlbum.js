import CustomerPhoto from './CustomerPhoto';
import { SRLWrapper } from 'simple-react-lightbox';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FadeLoader } from 'react-spinners';
import { Navigate, useParams } from 'react-router-dom';
import useAlbum from '../hooks/useAlbum';
import { useNavigate } from 'react-router-dom';

const CustomerAlbum = () => {
    const { ownerId, albumId } = useParams();
    const [loading, setLoading] = useState(false);
    const { photos } = useAlbum(albumId, ownerId);

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
        let dislikedPhotos = [];
        likedPhotos.forEach(likedPhoto => {
            dislikedPhotos = photos.filter(photo =>  likedPhoto.id !== photo.id)
        })

        console.log('this is dislikedPhotos', dislikedPhotos);
        setDisLikedPhotos(dislikedPhotos);
        Navigate('/')
    }

    return (  
        <div className="text-center">
            {/* <h1 className="text-center">{albumTitle}</h1> */}
            <h1 className="text-center">Kundalbum</h1>
                
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