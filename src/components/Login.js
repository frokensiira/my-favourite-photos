import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError ] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch (error) {
            setError(error.message)
			setLoading(false)
        }
    }

    return (  
        <div>
            <Row>
                <Col md={{ span: 6, offset: 3}}>
                    <Card className="bg-card-login">
                        <Card.Body className="card-body">
                            <Card.Title className="card-title-user">
                                Logga in
                            </Card.Title>

                            {error && (<Alert variant="danger">{error}</Alert>)}

                            <Form onSubmit={handleSubmit}>
                                
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2"><FontAwesomeIcon icon={faUser}/></Form.Label>
                                    
                                    <Col className="px-0 mr-5">
                                        <Form.Control className="card-input-field" type="email" ref={emailRef} placeholder="Email" required/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Form.Label column sm="2"><FontAwesomeIcon icon={faUnlockAlt}/></Form.Label>
                                    <Col className="px-0 mr-5">
                                        <Form.Control className="card-input-field" type="password" ref={passwordRef} required placeholder="Lösenord"/>
                                    </Col>
                                </Form.Group>
                                

                                <Button disabled={loading} type="submit" className="btn-user my-4 px-5">Logga in</Button>
                            </Form>
                            <p>Har du inget ett konto? <Link to="/signup">Skapa konto</Link></p>
                        </Card.Body>
                    </Card>
                    <div className="text-center mt-2">
                        
                    </div>
                </Col>
            </Row>
        </div>
    );
}
 
export default Login;