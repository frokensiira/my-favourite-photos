import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext'

const CreateAlbum = () => {
    const titleRef = useRef();
    const [error, setError ] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleFileChange = e => {
        setPhoto(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(false);
        setLoading(true);

        const storageRef = storage.ref();

        const photoRef = storageRef.child(`${titleRef.current.value}/${photo.name}`);

        /* const uploadTask = photoRef.put(photo);
        console.log('uploadtask 1:', uploadTask); */

        //get snapshot of the uploaded file
        /* uploadTask.then(snapshot => {
            console.log('this is snapshot', snapshot);
            snapshot.ref.getDownloadURL().then(url => {
                setUploadedImageUrl(url)
            })
        }).catch(error => {
            setError(error.message);
        }) */

        try {
            // Get photo url
            const snapshot = await photoRef.put(photo);
            const url = await snapshot.ref.getDownloadURL();
            setUploadedImageUrl(url);

            const docRef = await db.collection('albums').add({
                title: titleRef.current.value,
                owner: currentUser.uid,
                photo: url
            })

            navigate(`/albums/${docRef.id}`);

        } catch(error) {
            setError(error.message);
        }



        /* try {
            const docRef = await db.collection('albums').add({
            title: titleRef.current.value,
            owner: currentUser.uid
        }).then()
            navigate(`/albums/${docRef.id}`);
        } catch (error) {
            setError(error.message)
			setLoading(false)
        } */
    }

    return (  
        <div>
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
                                    <Form.Control type="title" ref={titleRef} required/>
                                    <Form.File 
                                        id="upload-photo" 
                                        label="Ladda upp foto" 
                                        custom
                                        className="mt-3"
                                        onChange={handleFileChange}
                                    />
                                    
                                </Form.Group>

                                {photo && (<p>This is the file: {photo.name}, size {photo.size}</p>)}

                                {
                                    uploadedImageUrl && (<img src={uploadedImageUrl} className='img-fluid'/>)
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