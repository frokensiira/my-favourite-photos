import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { FadeLoader } from 'react-spinners';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Album = () => {
    const { albumId } = useParams();
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [albumTitle, setAlbumTitle] = useState('');
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        //subscribe to album snapshots from firebase to update component whenever something changes
        const unsubscribe = db.collection('albums')
            .doc(albumId)
            .onSnapshot(async doc => {
                setLoading(true);
                
                //make sure the user owns the photo
                if(currentUser.uid === doc.data().owner) {
                    const snapshotPhotos = [];
                    snapshotPhotos.push(doc.data().fileUrl);
                    setAlbumTitle(doc.data().title);
                    setPhotos(snapshotPhotos);
                    setLoading(false);
                } else {
                    await logout()
                    navigate('/login')
                }
                
        });

        return unsubscribe;
    }, [])
    
    return (  
        <div className="text-center">
            <h1 className="text-center">{albumTitle}</h1>
            {
                    loading
                        ? (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
                        
                        : (<Row>
                            {photos.map(photo => (
                                <Col sm={6} md={4} lg={3} key="1">                                
                                        <Card className="mb-3">
                                            <Card.Img variant="top" src={photo}/>
                                        </Card>
                                </Col>
                            ))}
                        </Row>)
                }
        </div>
    );
}
 
export default Album;