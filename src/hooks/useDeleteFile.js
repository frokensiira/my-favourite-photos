import { useEffect } from 'react';
import { db, storage } from '../firebase';

const useDeleteFile = (photo) => {
    console.log('this is photo', photo);
    useEffect(() => {
        if(!photo) {
            return
        }
        
        console.log('want to delete photo:', photo.id);
        console.log('photo path', photo.path);

        (async () => {
            //storage
            await storage.ref(photo.path).delete();

            //firestore
            await db.collection('albums').doc(photo.id).delete
        })()

    }, [photo])

    return; 
}
 
export default useDeleteFile;