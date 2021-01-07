import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { FadeLoader } from 'react-spinners';

const CreateAlbum = () => {
    const titleRef = useRef();
    const [error, setError ] = useState(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleFileChange = e => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(false);
        setLoading(true);

        const storageRef = storage.ref();

        const fileRef = storageRef.child(`${titleRef.current.value}/${file.name}`);

        try {
            // Get file url
            const snapshot = await fileRef.put(file);
            const url = await snapshot.ref.getDownloadURL();

            const docRef = await db.collection('albums').add({
                title: titleRef.current.value,
                path: snapshot.ref.fullPath,
                owner: currentUser.uid,
                fileUrl: url, 
                type: file.type,
                size: file.size
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
                                    <Form.Control type="title" ref={titleRef} required/>
                                    <Form.File 
                                        id="upload-file" 
                                        label="Ladda upp foto" 
                                        custom
                                        className="mt-3"
                                        onChange={handleFileChange}
                                    />
                                    
                                </Form.Group>

                                {file && (<p>This is the file: {file.name}, size {file.size}</p>)}

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