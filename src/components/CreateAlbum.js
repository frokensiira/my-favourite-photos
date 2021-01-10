import { Alert, Button, Card, Col, Form, ProgressBar, Row } from 'react-bootstrap';
import { FadeLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState, useCallback } from 'react';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

//const files = [];

const CreateAlbum = () => {
    //Dropzone
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [message, setMessage] = useState(null);

    //useUploadedAlbum
    const [error, setError ] = useState(null);
    const [albumId, setAlbumId] = useState(null);
    const { currentUser } = useAuth();

    //CreateAlbum
    const [loading, setLoading] = useState(false);
    const [albumTitle, setAlbumTitle] = useState('');
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChangeTitle = (e) => {
        setAlbumTitle(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(uploadedFiles.length === 0){
            return;
        }

        const album = {
            albumTitle,
            owner: currentUser.uid,
        }

        const albumRef = storage.ref(`${albumTitle}`);

        const promises = uploadedFiles.map(async uploadedFile => {

            const fileRef = albumRef.child(`/${uploadedFile.name}`);
            const snapshot = await fileRef.put(uploadedFile);    
            
            const url = await snapshot.ref.getDownloadURL();

            const photo = {
                name: uploadedFile.name,
                albumTitle,
                path: snapshot.ref.fullPath,
                owner: currentUser.uid,
                fileUrl: url, 
                type: uploadedFile.type,
                size: uploadedFile.size
            }

            const result = await db.collection('photos').add(photo);

            return new Promise((resolve, reject) => {resolve(result)})
                
        })

        Promise.all(promises)
            .then(() => {
                db.collection('albums').add(album)
                .then(doc => {
                console.log('this is doc.id for album', doc.id);
                setIsSuccess(true);
                setUploadProgress(null);
                navigate(`/albums/${doc.id}`);
                });
            })
        
    }

    //Dropzone
    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles.length === 0){
            return;
        }
       
        setUploadedFiles(files => [...files, acceptedFiles[0]]);

    }, []);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles, isDragAccept, isDragReject } = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop
    });

    return (  
        <div>

            {
                loading && (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
            }
            

           <Row>
                <Col md={{ span: 6, offset: 3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Skapa album
                            </Card.Title>

                            {error && (<Alert variant="danger">{error}</Alert>)}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="title">
                                    <Form.Label>Albumtitel</Form.Label>
                                    <Form.Control type="title" value={albumTitle} required onChange={handleChangeTitle}/>


                                    <div {...getRootProps()} id="dropzone-wrapper" className={`px-4 py-4 my-3 ${isDragAccept ? `drag-accept` : ``} ${isDragReject ? `drag-reject` : ``}`}>
                                        <input {...getInputProps()} />
                                            {
                                                isDragActive 
                                                    ? isDragAccept 
                                                        ? (<p>Just drop it already</p>) 
                                                        : (<p>Sorry, not the right file type</p>)
                                                    : (<p>Give me some filez</p>) 
                                            }    

                                        {uploadProgress !== null && (<ProgressBar variant="success" animated now={uploadProgress} />)}    
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

                                <Button disabled={loading} type="submit">Skapa album</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
 
export default CreateAlbum;

//All
/* import { Alert, Button, Card, Col, Form, ProgressBar, Row } from 'react-bootstrap';
import { FadeLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState, useCallback } from 'react';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';


const CreateAlbum = () => {
    //Dropzone
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [message, setMessage] = useState(null);

    //useUploadedAlbum
    const [error, setError ] = useState(null);
    const [albumId, setAlbumId] = useState(null);
    const { currentUser } = useAuth();

    //CreateAlbum
    const [loading, setLoading] = useState(false);
    const [albumTitle, setAlbumTitle] = useState('');
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChangeTitle = (e) => {
        setAlbumTitle(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(false);
        setLoading(true);

        navigate(`/albums/${albumId}`);
    }

    useEffect(() => {
		if (error) {
			setMessage({
				error: true,
				text: error,
			});
		} else if (isSuccess) {
			setMessage({
				success: true,
				text: 'Image successfully uploaded!',
			});
			// set file to upload to null to prevent duplicate uploading
			setUploadedFile(null);
		} else {
			setMessage(null);
		}
	}, [error, isSuccess]);


    useEffect(() => {
        if(!uploadedFile){
            return;
        }

        const fileRef = storage.ref(`${albumTitle}/${uploadedFile.name}`);

        const uploadTask = fileRef.put(uploadedFile);

		uploadTask.on('state_changed', taskSnapshot => {
			setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
		});

        uploadTask.then(snapshot => {
            console.log('this is snapshot', snapshot);
            snapshot.ref.getDownloadURL().then(url => {

                const photo = {
                    name: uploadedFile.name,
                    albumTitle,
                    path: snapshot.ref.fullPath,
                    owner: currentUser.uid,
                    fileUrl: url, 
                    type: uploadedFile.type,
                    size: uploadedFile.size
                }

                db.collection('albums').add(photo)
                    .then(doc => {
                    setAlbumId(doc.id);
                    setIsSuccess(true);
                    setUploadProgress(null);
                    console.log('this is doc.id', doc.id);
                });
            });
        }).catch(error=> {
            console.log('this is error', error);
            setError({
				type: "warning",
				msg: `Image could not be uploaded due to an error (${error.code})`
			});
        });

    }, [uploadedFile]);


    //Dropzone
    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles.length === 0){
            return;
        }
        setUploadedFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles, isDragAccept, isDragReject } = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop
    });

    return (  
        <div>

            {
                loading && (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
            }
            

           <Row>
                <Col md={{ span: 6, offset: 3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Skapa album
                            </Card.Title>

                            {error && (<Alert variant="danger">{error}</Alert>)}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="title">
                                    <Form.Label>Albumtitel</Form.Label>
                                    <Form.Control type="title" value={albumTitle} required onChange={handleChangeTitle}/>


                                    <div {...getRootProps()} id="dropzone-wrapper" className={`px-4 py-4 my-3 ${isDragAccept ? `drag-accept` : ``} ${isDragReject ? `drag-reject` : ``}`}>
                                        <input {...getInputProps()} />
                                            {
                                                isDragActive 
                                                    ? isDragAccept 
                                                        ? (<p>Just drop it already</p>) 
                                                        : (<p>Sorry, not the right file type</p>)
                                                    : (<p>Give me some filez</p>) 
                                            }

                                            {
                                                acceptedFiles && (
                                                    <div className="accepted-files mt-2">
                                                        <ul className="list-unstyled">
                                                            {acceptedFiles.map(file => (
                                                                <li key={file.name}>
                                                                    
                                                                    {file.name}
                                                                </li>
                                                            ))}
                                                        </ul>   
                                                    </div>
                                                )
                                            }        

                                        {uploadProgress !== null && (<ProgressBar variant="success" animated now={uploadProgress} />)}    
                                    </div>
                                    
                                </Form.Group>

                                <Button disabled={loading || !isSuccess} type="submit">Skapa album</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
 
export default CreateAlbum; */



//Single
/* import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FadeLoader } from 'react-spinners';
import useUploadAlbum from '../hooks/useUploadAlbum';
import DropzoneUpload from './DropzoneUpload';
import { useNavigate } from 'react-router-dom';

const CreateAlbum = () => {

    const [loading, setLoading] = useState(false);
    const [albumTitle, setAlbumTitle] = useState('');
    const { albumId } = useUploadAlbum();
    const navigate = useNavigate();

    const handleChangeTitle = (e) => {
        setAlbumTitle(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log('this is albumId', albumId);
        //navigate(`/albums/${albumId}`);
    }

    return (  
        <div>

            {
                loading && (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
            }
            

           <Row>
                <Col md={{ span: 6, offset: 3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Skapa album
                            </Card.Title>

                            {error && (<Alert variant="danger">{error}</Alert>)}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="title">
                                    <Form.Label>Albumtitel</Form.Label>
                                    <Form.Control type="title" value={albumTitle} required onChange={handleChangeTitle}/>
                                    <DropzoneUpload albumTitle={albumTitle}/>
                                    
                                </Form.Group>

                                <Button disabled={loading} type="submit">Skapa album</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
 
export default CreateAlbum; */

