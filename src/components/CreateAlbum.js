import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext'

const CreateAlbum = () => {
    const titleRef = useRef();
    const [error, setError ] = useState(null);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(`Want to create an album with title ${titleRef.current.value}`);
        console.log(`User is: ${currentUser.uid}`);
        setError(false);
        setLoading(true)

        try {
            const docRef = await db.collection('albums').add({
            title: titleRef.current.value,
            owner: currentUser.uid
        }).then()
            navigate(`/albums/${docRef.id}`);
        } catch (error) {
            setError(error.message)
			setLoading(false)
        }
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
 
export default CreateAlbum;