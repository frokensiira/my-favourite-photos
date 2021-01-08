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
        const unsubscribe = db.collection('albums')
            .doc(albumId)
            .onSnapshot(async doc => {
                setLoading(true);
                //make sure the user owns the photo
                if(currentUser.uid === doc.data().owner) {
                    const snapshotPhotos = [];
                    snapshotPhotos.push({
                        id: doc.data().name,
                        url: doc.data().fileUrl,
                        size: doc.data().size, 
                        name: doc.data().name
                    })
                    setAlbumTitle(doc.data().albumTitle);
                    setPhotos(snapshotPhotos);
                    setLoading(false);
                } else {
                    await logout()
                    navigate('/login')
                }
                
        });

        return unsubscribe;
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