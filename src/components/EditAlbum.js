import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FadeLoader } from 'react-spinners';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { SRLWrapper } from 'simple-react-lightbox';
import Photo from './Photo';


const EditAlbum = () => {
    const { state } = useLocation();
    const { albumId } = useParams();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newAlbumTitle, setNewAlbumTitle] = useState(state.albumTitle);
    const { currentUser } = useAuth();
    const [error, setError ] = useState(null);
    const navigate = useNavigate();
    console.log('this is albumId', albumId);

    const handleCheckBox = (e) => {
/*         const [image] = photos.filter(photo =>  (photo.id === e.target.id));

        if(e.target.checked === true) {
            setPickedPhotos(photos => [...photos, image]);
        } else {
            const updatedPhotoArray = pickedPhotos.filter(photo =>  (photo.id !== e.target.id))
            setPickedPhotos(updatedPhotoArray);
        } */
    }

    const handleChangeTitle = (e) => {
        setNewAlbumTitle(e.target.value);
    }

    const handleSaveChanges = async (e) => {

        if(newAlbumTitle !== state.albumTitle) {
            try {
                console.log('inside try');
                await db.collection('albums').doc(albumId).update({
                    albumTitle: newAlbumTitle
                });
    
                Promise.all(state.photos.map(photo => {
                    db.collection('photos').doc(photo.id).update({
                        albumTitle: newAlbumTitle
                    });
                }))

                navigate(`/albums/${albumId}`);
    
            } catch (error) {
                console.log(error.message);
            }
        }
            
        if(uploadedFiles.length !==0) {

            console.log('I have a file to upload');

            const albumRef = storage.ref(`${newAlbumTitle}`);

            const promises = uploadedFiles.map(async uploadedFile => {
                setLoading(true);
    
                try {
    
                    const fileRef = albumRef.child(`/${uploadedFile.name}`);
                    const snapshot = await fileRef.put(uploadedFile);    
                    
                    const url = await snapshot.ref.getDownloadURL();
    
                    const photo = {
                        name: uploadedFile.name,
                        albumTitle: newAlbumTitle,
                        path: snapshot.ref.fullPath,
                        owner: currentUser.uid,
                        fileUrl: url, 
                        type: uploadedFile.type,
                        size: uploadedFile.size
                    }

                    await db.collection('photos').add(photo);
                    navigate(`/albums/${albumId}`);
                    return;
    
                } catch(error) {
                    setError(error.message);
                }
    
            })
            
        }
        
        navigate(`/albums/${albumId}`);
    }

    //Dropzone
    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles.length === 0){
            return;
        }
       
        setUploadedFiles(files => [...files, acceptedFiles[0]]);

    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop
    });

    return (  
        <div>
            <h1 className="text-center my-4">Redigera album</h1>

            <Row className="my-4">
                <Col md={{ span: 6, offset: 3}}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Ny albumtitel:</Form.Label>
                            <Form.Control type="name" placeholder="Titel" value={newAlbumTitle} onChange={handleChangeTitle}/>

                            <div {...getRootProps()} id="dropzone-wrapper" className={`px-4 py-4 my-3 ${isDragAccept ? `drag-accept` : ``} ${isDragReject ? `drag-reject` : ``}`}>
                                <input {...getInputProps()} />
                                    {
                                        isDragActive 
                                            ? isDragAccept 
                                                ? (<p>Just drop it already</p>) 
                                                : (<p>Sorry, not the right file type</p>)
                                            : (<p>Give me some filez</p>) 
                                    }      
                            </div>

                            
                        </Form.Group>

                        {
                                uploadedFiles && uploadedFiles.length !== 0 && (
                                    <div className="accepted-files mt-2">
                                        <ul className="list-unstyled">
                                            {uploadedFiles.map(file => (
                                                <li key={file.name}>
                                                    {file.name}
                                                </li>
                                            ))}
                                        </ul>   
                                    </div>
                                )
                            } 
                    </Form>
                </Col>
            </Row>

            <SRLWrapper>
                <Row className="mb-5">
                    {state.photos.map(photo => (
                        <Photo photo={photo} key={photo.id} onChange={handleCheckBox}/>
                    ))}
                </Row>
            </SRLWrapper>


            <div className="text-center">
                <Button className="px-5" onClick={handleSaveChanges}>Spara</Button>
            </div>
                                
        </div>

    );
}
 
export default EditAlbum;