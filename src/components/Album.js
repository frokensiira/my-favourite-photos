import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { FadeLoader } from 'react-spinners';
import { Button, Card, Col, Row } from 'react-bootstrap';

const Album = () => {
    const { albumId } = useParams();
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    
    useEffect(() => {
        //subscribe to album snapshots from firebase to update component whenever something changes
        const unsubscribe = db.collection('albums')
            .doc(albumId)
            //.where('owner', '==', currentUser.uid)
            .onSnapshot(doc => {
                console.log('doc.data():', doc.data());
                setLoading(true);
                const snapshotPhotos = [];

                snapshotPhotos.push(doc.data())

                setPhotos(snapshotPhotos);
                setLoading(false);
        });

        return unsubscribe;
    }, [])
    
    return (  
        <div className="text-center">
            <h1 className="text-center">Albumnamn</h1>
            {
                    loading
                        ? (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
                        
                        : (<Row>
                            {photos.map(doc => (
                                <Col sm={6} md={4} lg={3} key="1">                                
                                        <Card className="mb-3">
                                            <Card.Img variant="top" src={doc.photo}/>
                                        </Card>
                                </Col>
                            ))}
                        </Row>)
                }
        </div>
    );
}
 
export default Album;