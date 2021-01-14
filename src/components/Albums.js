import { FadeLoader } from 'react-spinners';
import { Button, Card, Col, Row } from 'react-bootstrap';
import useAlbums from '../hooks/useAlbums';
import { Link } from 'react-router-dom';
import { db, storage } from '../firebase';
import albumImage from '../assets/image.png';
import { useAuth } from '../contexts/AuthContext';

const Albums = () => {

    const { albums, loading } = useAlbums();
    const { currentUser } = useAuth();

    const handleDeleteAlbum = async (e) => {

        try {
            //get name of album
            const doc = await db.collection('albums').doc(e.target.id).get();

            const snapshotPhotos = [];

            db.collection('photos')
                .where('albumTitle', '==', doc.data().albumTitle)
                .where('owner', '==', currentUser.uid)
                .get()
                    .then(function(querySnapshot) {

                        const batch = db.batch();

                        querySnapshot.forEach(function(doc) {

                            snapshotPhotos.push({
                                ...doc.data()
                            });
                            batch.delete(doc.ref);
                        });

                        // Commit the batch
                        batch.commit();
                    })
                        .then(function() {

                            //delete album from db
                            db.collection('albums').doc(e.target.id).delete().then(() => {
                                
                                //delete the photos in the album in storage
                                const promises = snapshotPhotos.map(async photo => {
                                    const result = await storage.ref(photo.path).delete()
                                    return new Promise((resolve, reject) => {resolve(result)})
                                })

                                Promise.all(promises).then(() => {
                                    console.log('everything deleted!');
                                }).catch(error => {

                                })     
                            })
                        }).catch(error => {
                            console.log(error.message);
                        
                        }); 

        } catch (error) {
            console.log(error.message);
        }

    }

    return (  
        <div>
            <h1 className="text-center albums">Mina album</h1>

            {
                loading
                    ? (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
                    
                    : albums.length === 0 
                        ? (
                            <div className="text-center my-5">
                                <p>Du har inga album för närvarande</p>
                                <Link className="btn btn-primary" to="/albums/create-album">Skapa album</Link>
                            </div>
                            )
                        
                        : (<Row>
                            {albums.map(album => (
                                <Col sm={6} md={4} lg={3} key={album.id}>                                
                                    <Card className="mb-3">
                                        <Card.Img className="p-4" variant="top" src={albumImage}/>
                                        <Card.Body>
                                            <Card.Title className="text-center">{album.albumTitle}</Card.Title>
                                            <Link to={`/albums/${album.id}`} className="btn btn-primary btn-sm mx-2">
                                                Till album
                                            </Link>
                                            <Button id={album.id} onClick={handleDeleteAlbum} variant="danger" size="sm">Radera</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>)
            }
        </div>
    );
}
 
export default Albums;