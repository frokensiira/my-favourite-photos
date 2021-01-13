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
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Lösenorden matchar inte');
        }

        setError(null);

        try {
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
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
                    <Card className="bg-card-signup">
                        <Card.Body>
                            <Card.Title className="card-title">
                                Skapa konto
                            </Card.Title>

                            {error && (<Alert variant="danger">{error}</Alert>)}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="email">Email</Form.Label>
                                    <Form.Control className="card-input-field" type="email" ref={emailRef} id="email" required/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="password">Lösenord</Form.Label>
                                    <Form.Control className="card-input-field" type="password" ref={passwordRef} id="password" required/>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label htmlFor="password-confirm">Upprepa lösenord</Form.Label>
                                    <Form.Control className="card-input-field" type="password" ref={passwordConfirmRef} id="password-confirm" required/>
                                </Form.Group>

                                <Button disabled={loading} className="btn-user my-4 px-5" type="submit">Skapa konto</Button>
                            </Form>
                            <p>Har du redan ett konto? <Link to="/login">Logga in</Link></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </div>
    );
}
 
export default SignUp;