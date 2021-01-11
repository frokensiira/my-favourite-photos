import { useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Photo from './Photo';
import { SRLWrapper } from 'simple-react-lightbox';
import useAlbum from '../hooks/useAlbum';
import { useState } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Album = () => {

    const { albumId } = useParams();
    const { albumTitle, loading, setLoading, photos, validUser } = useAlbum(albumId);
    const [newAlbumTitle, setNewAlbumTitle] = useState('');
    const [pickedPhotos, setPickedPhotos] = useState([]);
    const [customerLink, setCustomerLink] = useState('');

    const [error, setError ] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleCheckBox = (e) => {
        const [image] = photos.filter(photo =>  (photo.id === e.target.id));

        if(e.target.checked === true) {
            setPickedPhotos(photos => [...photos, image]);
        } else {
            const updatedPhotoArray = pickedPhotos.filter(photo =>  (photo.id !== e.target.id))
            setPickedPhotos(updatedPhotoArray);
        }
    }

    const handleInputChange = (e) => {
        setNewAlbumTitle(e.target.value);
    }

    const handleGenerateLink = () => {
        setCustomerLink(`${window.location.origin}/${currentUser.uid}/review/${albumId}`);
    }

    const handleSubmit = async () => {

        if(!newAlbumTitle) {
            return;
        }

        if(pickedPhotos.length === 0){
            return;
        }

        const album = {
            albumTitle: newAlbumTitle,
            owner: currentUser.uid,
        }
        
        const promises = pickedPhotos.map(async pickedPhoto => {
            setLoading(true);
            try {
                const photo = {
                    name: pickedPhoto.name,
                    albumTitle: newAlbumTitle,
                    path: pickedPhoto.path,
                    owner: currentUser.uid,
                    fileUrl: pickedPhoto.fileUrl, 
                    type: pickedPhoto.type,
                    size: pickedPhoto.size
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
                    setPickedPhotos([]);
                    setNewAlbumTitle('');
                    //setCustomerLink(`${window.location.origin}/${currentUser.uid}/review/${doc.id}`);
                    navigate(`/albums/${doc.id}`);
                });
            }).catch (error => {
                setError(error.message);
            });
    }
    
    return (  
        <div className="text-center">

            {
                !validUser && !loading
                    ? (<p>You don't have access to this album</p>) 
                    : (
                        <>
                            <h1 className="text-center">{albumTitle}</h1>

                            <Button className="my-3" onClick={handleGenerateLink} variant="primary">Generera kundlänk</Button>
                            {
                                customerLink && 
                                (
                                    <div className="my-4">
                                        <a href={customerLink}>{customerLink}</a>
                                    </div>
                                    
                                )
                            }

                            {
                                loading
                                    ? (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
                                    
                                    : (
                                        <SRLWrapper>
                                            <Row className="mb-5">
                                                {photos.map(photo => (
                                                    <Photo photo={photo} key={photo.id} handleCheckBox={handleCheckBox}/>
                                                ))}
                                            </Row>
                                        </SRLWrapper>
                                    )
                            }

                        
                            <Row>
                                <Col md={{ span: 6, offset: 3}}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Ange albumets titel:</Form.Label>
                                            <Form.Control type="name" placeholder="Titel" value={newAlbumTitle} onChange={handleInputChange}/>
                                        </Form.Group>
                                        <Button disabled={pickedPhotos.length === 0} onClick={handleSubmit}>Skapa nytt album</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </>
                )
            }

            
                
        </div>
    );
}
 
export default Album;