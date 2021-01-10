import { Alert, Button, Card, Col, Form, ProgressBar, Row } from 'react-bootstrap';
import { FadeLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState, useCallback } from 'react';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import useUploadAlbum from '../hooks/useUploadAlbum';

const CreateAlbum = () => {

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [submit, setSubmit] = useState(null);
    
    const [albumTitle, setAlbumTitle] = useState('');
    const { error, loading } = useUploadAlbum(albumTitle, uploadedFiles, submit)

    const handleChangeTitle = (e) => {
        setAlbumTitle(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(uploadedFiles.length === 0){
            return;
        }
        setSubmit(true);
        
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