import { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FadeLoader } from 'react-spinners';
import useUploadFile from '../hooks/useUploadFile';
import DropzoneUpload from './DropzoneUpload';

const CreateAlbum = () => {
    const [file, setFile] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [albumTitle, setAlbumTitle] = useState('');

    const handleChangeTitle = (e) => {
        setAlbumTitle(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!file){
            return;
        }
        setLoading(true);
        setUploadFile(file);
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

                            {/* {error && (<Alert variant="danger">{error}</Alert>)} */}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="title">
                                    <Form.Label>Albumtitel</Form.Label>
                                    <Form.Control type="title" value={albumTitle} required onChange={handleChangeTitle}/>
                                    <DropzoneUpload albumTitle={albumTitle}/>
                                    
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

