import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { FadeLoader } from 'react-spinners';
import { Row } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import Photo from './Photo';
import { SRLWrapper } from 'simple-react-lightbox';

const Album = () => {
    const { albumId } = useParams();
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [albumTitle, setAlbumTitle] = useState('');
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        //subscribe to album snapshots from firebase to update component whenever something changes
        db.collection('albums')
        .doc(albumId)
        .get().then(doc => {      
            setAlbumTitle(doc.data().albumTitle)
            const unsubscribe = db.collection('photos')
            .where('albumTitle', '==', doc.data().albumTitle)
            .onSnapshot( snapshot => {
                setLoading(true);
                const snapshotPhotos = [];

                snapshot.forEach(doc => {
                    snapshotPhotos.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setPhotos(snapshotPhotos);
                
                setLoading(false);
            })

            return unsubscribe;
        })
        
        
    }, [albumId, currentUser.uid, logout, navigate])
    
    return (  
        <div className="text-center">
            <h1 className="text-center">{albumTitle}</h1>
                {
                    loading
                        ? (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
                        
                        : (
                            <SRLWrapper>
                                <Row className="mb-5">
                                    {photos.map(photo => (
                                        <Photo photo={photo} key={photo.id}/>
                                    ))}
                                </Row>
                            </SRLWrapper>
                        )
                }
        </div>
    );
}
 
export default Album;