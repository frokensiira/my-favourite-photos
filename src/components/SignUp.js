import { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError ] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Lösenorden matchar inte');
        }

        setError(null);

        try {
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    return (  
        <div>
            <Row>
                <Col md={{ span: 6, offset: 3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Skapa konto
                            </Card.Title>

                            {error && (<Alert variant="danger">{error}</Alert>)}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required/>
                                </Form.Group>

                                <Form.Group id="password">
                                    <Form.Label>Lösenord</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required/>
                                </Form.Group>

                                <Form.Group id="password-confirm">
                                    <Form.Label>Upprepa lösenord</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} required/>
                                </Form.Group>

                                <Button disabled={loading} type="submit">Skapa konto</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="text-center mt-2">
                        Har du redan ett konto? <Link to="/login">Logga in</Link>
                    </div>
                </Col>
            </Row>
            
        </div>
    );
}
 
export default SignUp;