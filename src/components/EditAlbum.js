import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FadeLoader } from 'react-spinners';
import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { SRLWrapper } from 'simple-react-lightbox';
import Photo from './Photo';

const EditAlbum = () => {
    const { state } = useLocation();
    console.log('this is photos', state.photos);
    console.log('this is albumTitle', state.albumTitle);

    const [uploadedFiles, setUploadedFiles] = useState([]);
    
    const [newAlbumTitle, setNewAlbumTitle] = useState(state.albumTitle);

    const handleCheckBox = (e) => {
/*         const [image] = photos.filter(photo =>  (photo.id === e.target.id));

        if(e.target.checked === true) {
            setPickedPhotos(photos => [...photos, image]);
        } else {
            const updatedPhotoArray = pickedPhotos.filter(photo =>  (photo.id !== e.target.id))
            setPickedPhotos(updatedPhotoArray);
        } */
    }

    const handleChangeTitle = (e) => {
        setNewAlbumTitle(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(uploadedFiles.length === 0){
            return;
        }
        
    }

    //Dropzone
    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles.length === 0){
            return;
        }
       
        setUploadedFiles(files => [...files, acceptedFiles[0]]);

    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop
    });

    return (  
        <div className="text-center">
            <h1 className="text-center my-4">Redigera album</h1>

            <Row className="my-4">
                <Col md={{ span: 6, offset: 3}}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Ny albumtitel:</Form.Label>
                            <Form.Control type="name" placeholder="Titel" value={newAlbumTitle} onChange={handleChangeTitle}/>

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
                    </Form>
                </Col>
            </Row>

            

            <SRLWrapper>
                <Row className="mb-5">
                    {state.photos.map(photo => (
                        <Photo photo={photo} key={photo.id} onChange={handleCheckBox}/>
                    ))}
                </Row>
            </SRLWrapper>

        </div>
/*         <div className="text-center">

        {
            !validUser && !loading
                ? (<p>You don't have access to this album</p>) 
                : (
                    <>
                        <h1 className="text-center">{albumTitle}</h1>

                        <Button className="my-3" onClick={handleGenerateLink} variant="primary">Generera kundlänk</Button>
                        {
                            customerLink && 
                            (
                                <div className="my-4">
                                    <a href={customerLink}>{customerLink}</a>
                                </div>
                                
                            )
                        }

                        {
                            loading
                                ? (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
                                
                                : (
                                    <SRLWrapper>
                                        <Row className="mb-5">
                                            {photos.map(photo => (
                                                <Photo photo={photo} key={photo.id} handleCheckBox={handleCheckBox}/>
                                            ))}
                                        </Row>
                                    </SRLWrapper>
                                )
                        }

                    
                        <Row>
                            <Col md={{ span: 6, offset: 3}}>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Ange albumets titel:</Form.Label>
                                        <Form.Control type="name" placeholder="Titel" value={newAlbumTitle} onChange={handleInputChange}/>
                                    </Form.Group>
                                    <Button disabled={pickedPhotos.length === 0} onClick={handleSubmit}>Skapa nytt album</Button>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 6, offset: 3}}>
                                <Form>
                                    <Link to={`/albums/edit-album/${albumId}`} className="btn btn-secondary my-4" variant="secondary" >Redigera album</Link>
                                </Form>
                            </Col>
                        </Row>
                    </>
            )
        }

        
            
    </div>
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
        </div> */
    );
}
 
export default EditAlbum;