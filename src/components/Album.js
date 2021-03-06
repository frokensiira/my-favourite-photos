import { useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';
import { useState } from 'react';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Photo from './Photo';
import useAlbum from '../hooks/useAlbum';

const Album = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { albumId } = useParams();
    const { albumTitle, loading, setLoading, photos } = useAlbum(albumId, currentUser.uid);
    const [newAlbumTitle, setNewAlbumTitle] = useState('');
    const [pickedPhotos, setPickedPhotos] = useState([]);
    const [customerLink, setCustomerLink] = useState('');
    const [error, setError ] = useState(null);
    
    const handleCheckBox = (e) => {
        const [image] = photos.filter(photo =>  (photo.id === e.target.id));

        if(e.target.checked === true) {
            setPickedPhotos(photos => [...photos, image]);
        } else {
            const updatedPhotoArray = pickedPhotos.filter(photo =>  (photo.id !== e.target.id))
            setPickedPhotos(updatedPhotoArray);
        }
    }

    const handleEditAlbum = () => {
        navigate(`/albums/edit-album/${albumId}`, {
            state : {
                photos,
                albumTitle
            }
        })        
    }

    const handleDeletePhoto = async (e) => {

        try {
            //check the name of the photo
            const doc = await db.collection('photos').doc(e.target.id).get();

            //check if there are any more copies of the photo in the db
            const querySnapshot = await db.collection("photos")
                .where('name', '==', doc.data().name)
                .where('owner', '==', currentUser.uid)
                .get()
            
            const snapshotPhotos = [];
            querySnapshot.forEach(function(doc) {
                snapshotPhotos.push(doc.id);
            });

            //delete the photo from the db
            await db.collection('photos').doc(e.target.id).delete();

            //if it was the last copy of the photo, delete it from storage as well
            if(snapshotPhotos.length < 2) {
                await storage.ref(doc.data().path).delete();
            }

        } catch (error) {
            setError(error.message);
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
            }

        })

        Promise.all(promises)
            .then(() => {
                db.collection('albums').add(album)
                .then(doc => {
                    setPickedPhotos([]);
                    setNewAlbumTitle('');
                    navigate(`/albums/${doc.id}`);
                });
            }).catch (error => {
                setError(error.message);
            });
    }
    
    return (  
        <div className="text-center">
                <h1 className="text-center album">{albumTitle}</h1>

                {
                    photos.length !== 0 && (
                        <Button className="my-3" onClick={handleGenerateLink} variant="outline-primary">Generera kundlänk</Button>)
                }
                {
                    customerLink && 
                    (
                        <div className="my-4">
                            <a href={customerLink}>{customerLink}</a>
                        </div>
                        
                    )
                }

                { error && (<Alert variant="danger">{error}</Alert>) }

                {
                    loading
                        ? (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
                        
                        : (
                            <SRLWrapper>
                                <Row className="mb-5">
                                    {photos.map(photo => (
                                        <Photo photo={photo} key={photo.id} handleCheckBox={handleCheckBox} handleDeletePhoto={handleDeletePhoto}/>
                                    ))}
                                </Row>
                            </SRLWrapper>
                        )
                }

                {
                    photos.length !== 0 && (
                        <Row>
                            <Col md={{ span: 6, offset: 3}}>
                                <Form>
                                    <Form.Group as={Row}>
                                        <Form.Control type="name" placeholder="Albumtitel" value={newAlbumTitle} onChange={handleInputChange}/>
                                    
                                        <Button className="btn-green" disabled={pickedPhotos.length === 0} onClick={handleSubmit}>Skapa nytt album</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    )
                }
                
                <Row>
                    <Col md={{ span: 6, offset: 3}}>
                            <Button className="my-4" variant="outline-warning" onClick={handleEditAlbum}>Redigera album</Button>
                    </Col>
                </Row>  
                
        </div>
    );
}
 
export default Album;