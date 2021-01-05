import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError ] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

    }
    
    return (  
        <div>
            <Row>
                <Col md={{ span: 6, offset: 3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Logga in
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

                                <Button disabled={loading} type="submit">Logga in</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="text-center mt-2">
                        Har du inget ett konto? <Link to="/signup">Skapa konto</Link>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
 
export default Login;