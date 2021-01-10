import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const useUploadAlbum = (albumTitle, uploadedFiles, submit) => {
    //console.log('this is albumTitle', albumTitle);
    console.log('this is uploadedFiles', uploadedFiles);
    //console.log('this is submit', submit);

    const [error, setError ] = useState(null);
    const [loading, setLoading] = useState(false);
    const [customerLink, setCustomerLink] = useState('');
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        if(uploadedFiles.length === 0){
            return;
        }

        const album = {
            albumTitle,
            owner: currentUser.uid,
        }

        const albumRef = storage.ref(`${albumTitle}`);

        const promises = uploadedFiles.map(async uploadedFile => {
            setLoading(true);

            try {

                const fileRef = albumRef.child(`/${uploadedFile.name}`);
                const snapshot = await fileRef.put(uploadedFile);    
                
                const url = await snapshot.ref.getDownloadURL();
                console.log('this is url', url);

                const photo = {
                    name: uploadedFile.name,
                    albumTitle,
                    path: snapshot.ref.fullPath,
                    owner: currentUser.uid,
                    fileUrl: url, 
                    type: uploadedFile.type,
                    size: uploadedFile.size
                }

                const result = await db.collection('photos').add(photo);

                return new Promise((resolve, reject) => {resolve(result)})

            } catch(error) {
                setError(error.message);
            }

        })

        Promise.all(promises)
            .then(() => {
                db.collection('albums').add(album)
                .then(doc => {
                    setLoading(false);
                    console.log('this is doc.id', doc.id);
                    navigate(`/albums/${doc.id}`);
                });
            }).catch (error => {
                setError(error.message);
            });

    }, [submit]);

    return { error, loading };
}

export default useUploadAlbum;
