import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const useAlbum = (albumId, user) => {

    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [albumTitle, setAlbumTitle] = useState('');
    const [validUser, setValidUser] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        //subscribe to album snapshots from firebase to update component whenever something changes
        db.collection('albums')
        .doc(albumId)
        .get().then(doc => {     
            setAlbumTitle(doc.data().albumTitle)
            const unsubscribe = db.collection('photos')
            .where('albumTitle', '==', doc.data().albumTitle)
            .where('owner', '==', user)
            .onSnapshot( snapshot => {
                //console.log('this is snapshot', snapshot);
                setLoading(true);
                const snapshotPhotos = [];

                snapshot.forEach(doc => {
                    snapshotPhotos.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                //check if the user owns the photos
                if(snapshotPhotos.length !== 0) {
                    setPhotos(snapshotPhotos);
                    setValidUser(true);
                } 
                setLoading(false);
            })

            return unsubscribe;
        })

    }, [albumId, navigate]);

    return { albumTitle, loading, setLoading, photos, validUser };
}
 
export default useAlbum;