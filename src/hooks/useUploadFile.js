import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const useUploadFile = (albumTitle, file) => {
    const [error, setError ] = useState(null);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!file){
            return;
        }

        const fileRef = storage.ref(`${albumTitle}/${file.name}`);

        // Get file url
        const uploadTask = fileRef.put(file);

        uploadTask.then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                db.collection('albums').add({
                    name: file.name,
                    albumTitle,
                    path: snapshot.ref.fullPath,
                    owner: currentUser.uid,
                    fileUrl: url, 
                    type: file.type,
                    size: file.size
                }).then(doc => {
                    fileRef.updateMetadata({ customMetadata: {firestoreId: doc.id}});
                    navigate(`/albums/${doc.id}`);
                });
            });
        }).catch(error=> {
            console.log(error);
            setError(error.message);
        });

    }, [file]);

    return { error, loading, currentUser };
}
 
export default useUploadFile;