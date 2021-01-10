import { useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Photo from './Photo';
import { SRLWrapper } from 'simple-react-lightbox';
import useAlbum from '../hooks/useAlbum';
import { useState } from 'react';
//import useUploadAlbum from '../hooks/useUploadAlbum';

import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Album = () => {
    const { albumId } = useParams();
    const { albumTitle, loading, photos } = useAlbum(albumId);
    const [newAlbumTitle, setNewAlbumTitle] = useState();
    const [pickedPhotos, setPickedPhotos] = useState([]);
    const [submit, setSubmit] = useState(null);
    const [currentPhotos, setCurrentPhotos] = useState([]);
    //useUploadAlbum(newAlbumTitle, pickedPhotos, submit)

    const [error, setError ] = useState(null);
    //const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const newPhoto = new File(['hej'], 'testfil.jpg', {
        type: 'image/jpg'
    });

    console.log('this is newPhoto', newPhoto);

    const handleCheckBox = (e) => {
        console.log('someone wants to check me out');
        console.log(e.target.checked);
        console.log(e.target.id);

        const [image] = photos.filter(photo =>  (photo.id === e.target.id));

        console.log('this is image', image);
        if(e.target.checked === true) {
            console.log('yes, its checked');
            setPickedPhotos(photos => [...photos, image]);
        } else {
            console.log('now its unchecked');
            const updatedPhotoArray = pickedPhotos.filter(photo =>  (photo.id !== e.target.id))
            setPickedPhotos(updatedPhotoArray);
        }
    }

    const handleInputChange = (e) => {
        //console.log('this is input', e.target.value);
        setNewAlbumTitle( e.target.value);
    }

    const handleSubmit = async () => {
        console.log('someone wants to submit something');
        console.log('this is albumTitle', newAlbumTitle);
        if(!newAlbumTitle) {
            return;
        }

        

        //get a list of the photos shown in the album
        /* db.collection('albums')
        .doc(albumId)
        .get().then(doc => {      
            //setAlbumTitle(doc.data().albumTitle)
            const unsubscribe = db.collection('photos')
            .where('albumTitle', '==', doc.data().albumTitle)
            .onSnapshot( snapshot => {
                console.log('this is snapshot', snapshot);
                //setLoading(true);
                const snapshotPhotos = [];

                snapshot.forEach(doc => {
                    snapshotPhotos.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setCurrentPhotos(snapshotPhotos);
                
                //setLoading(false);
            })

            return unsubscribe;
        }) */

        /* const storageRef = storage.ref();

        const listRef = storageRef.child('Tezzzzt');

        const res = await listRef.listAll();

        res.prefixes.forEach(function(itemRef) {
            // All the items under listRef.
            console.log('this is itemRef', itemRef);
        }); */

        //setSubmit(true);

        if(pickedPhotos.length === 0){
            return;
        }
        //console.log('this is pickedPhotos', pickedPhotos);

        return;

        const album = {
            newAlbumTitle,
            owner: currentUser.uid,
        }

        const albumRef = storage.ref(`${albumTitle}`);

        const promises = pickedPhotos.map(async uploadedFile => {
            //setLoading(true);

            try {

                const fileRef = albumRef.child(`/${uploadedFile.name}`);
                console.log('this is fileRef', fileRef);
                const snapshot = await fileRef.put(uploadedFile);    
                console.log('this is snapshot', snapshot);
                const url = await snapshot.ref.getDownloadURL();
                console.log('this is url', url);

                const photo = {
                    name: uploadedFile.name,
                    albumTitle: newAlbumTitle,
                    path: snapshot.ref.fullPath,
                    owner: currentUser.uid,
                    fileUrl: url, 
                    type: uploadedFile.type,
                    size: uploadedFile.size
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
                    //setLoading(false);
                    console.log('this is doc.id', doc.id);
                    navigate(`/albums/${doc.id}`);
                });
            }).catch (error => {
                setError(error.message);
            });
    }
    
    return (  
        <div className="text-center">
            <h1 className="text-center">{albumTitle}</h1>
            <p>Länk till kund: </p>
                
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
                                        <Form.Control required type="name" placeholder="Titel" onChange={handleInputChange}/>
                                        </Form.Group>
                                    <Button disabled={pickedPhotos.length === 0} onClick={handleSubmit}>Skapa nytt album</Button>
                                </Form>
                            </Col>
                        </Row>
                        
                    
                
        </div>
    );
}
 
export default Album;