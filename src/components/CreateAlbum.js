import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FadeLoader } from 'react-spinners';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';
import useUploadAlbum from '../hooks/useUploadAlbum';

const CreateAlbum = () => {

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [submit, setSubmit] = useState(null);
    
    const [albumTitle, setAlbumTitle] = useState('');
    const { error, loading } = useUploadAlbum(albumTitle, uploadedFiles, submit);


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
            
            <div className="edit-album">
                <h1 className="text-center my-4">Skapa album</h1>

                <Row className="my-4">
                    <Col md={{ span: 6, offset: 3}}>

                        { error && (<Alert variant="danger">{error}</Alert>) }

                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="title">
                                <Form.Label>Albumtitel:</Form.Label>
                                <Form.Control type="title" placeholder="Titel" value={albumTitle} required onChange={handleChangeTitle}/>

                                <div {...getRootProps()} id="dropzone-wrapper" className={`px-4 py-4 my-3 ${isDragAccept ? `drag-accept` : ``} ${isDragReject ? `drag-reject` : ``}`}>
                                    <input {...getInputProps()} />
                                        {
                                            isDragActive 
                                                ? isDragAccept 
                                                    ? (<p>Just drop it already</p>) 
                                                    : (<p>Sorry, not the right file type</p>)
                                                : (<p>Give me some files</p>) 
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

                                <div className="text-center">
                                    <Button disabled={loading} type="submit" className="px-5 btn-green">Skapa album</Button>
                                </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
 
export default CreateAlbum;