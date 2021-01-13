import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const useAlbum = (albumId, user) => {

    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [albumTitle, setAlbumTitle] = useState('');
    const navigate = useNavigate();
    //console.log('validUser is', validUser);

    useEffect(() => {
        //subscribe to album snapshots from firebase to update component whenever something changes
        db.collection('albums')
        .doc(albumId)
        .get().then(doc => {     
            //console.log('this is doc.data()', doc.data());
            if(doc.data().owner !== user) {
                console.log('you are not a valid user');
                navigate('/403');
                return;

            }
            setAlbumTitle(doc.data().albumTitle)
            const unsubscribe = db.collection('photos')
            .where('albumTitle', '==', doc.data().albumTitle)
            .where('owner', '==', user)
            .onSnapshot( snapshot => {
                console.log('this is snapshot', snapshot);
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

    }, [albumId]);

    return { albumTitle, loading, setLoading, photos };
}
 
export default useAlbum;