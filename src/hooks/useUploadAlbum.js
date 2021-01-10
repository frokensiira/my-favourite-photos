/* 
import { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const uploadedFilesArray = [];

const useUploadFile = (albumTitle, file) => {
    const [error, setError ] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [albumId, setAlbumId] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        if(!file){
            return;
        }

        const fileRef = storage.ref(`${albumTitle}/${file.name}`);

        const uploadTask = fileRef.put(file);

        uploadTask.then(snapshot => {
            console.log('this is snapshot', snapshot);
            snapshot.ref.getDownloadURL().then(url => {
                console.log('this is url', url);
                db.collection('albums').add({
                    name: file.name,
                    albumTitle,
                    path: snapshot.ref.fullPath,
                    owner: currentUser.uid,
                    fileUrl: url, 
                    type: file.type,
                    size: file.size
                }).then(doc => {
                    //fileRef.updateMetadata({ customMetadata: {firestoreId: doc.id}});
                    setAlbumId(doc.id)
                    console.log('this is doc.id', doc.id);
                });
            });
        }).catch(error=> {
            console.log('this is error', error);
            setError(error.message);
        });

    }, [file]);

    return { error, currentUser, albumId };
}
 
export default useUploadFile; */