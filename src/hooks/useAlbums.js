import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

const useAlbums = () => {

    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        //subscribe to album snapshots from firebase to update component whenever something changes
        const unsubscribe = db.collection('albums')
            .where('owner', '==', currentUser.uid)
            .orderBy('albumTitle')
            .onSnapshot(snapshot => {
                setLoading(true);
                const snapshotAlbums = [];

                snapshot.forEach(doc => {
                    snapshotAlbums.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setLoading(false);
                setAlbums(snapshotAlbums);
        });

        return unsubscribe;
    }, [currentUser.uid])

    return { albums, loading };
}
 
export default useAlbums;