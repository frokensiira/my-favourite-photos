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
            const photoCopies = [];

            //find all of the all of the photos with the same albumTitle and delete these
            db.collection('photos')
                .where('albumTitle', '==', doc.data().albumTitle)
                .where('owner', '==', currentUser.uid)
                .get()
                    .then((querySnapshot) => {

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
                        .then(() => {

                            //delete album from db
                            db.collection('albums').doc(e.target.id).delete().then(() => {

                                //check if there are more photos in db with the same name 
                                const prom = snapshotPhotos.map(async photo => {
                                    const querySnapshot = await db.collection('photos')
                                    .where('name', '==', photo.name)
                                    .where('owner', '==', currentUser.uid)
                                    .get()
                                        
                                    querySnapshot.forEach(doc => {
                                        photoCopies.push({
                                            ...doc.data()
                                        });
                                    });                  
                                
                                    return new Promise((resolve, reject) => {resolve(querySnapshot)})
                                })
                                
                                Promise.all(prom).then(() => {
                                                                        
                                    const namePhotoCopies = photoCopies.map(photo => photo.name);
                                    const nameSnapshotPhotos = snapshotPhotos.map(photo => photo.name);

                                    const spreaded = [...photoCopies, ...snapshotPhotos];
                                    const lastPhotos = spreaded.filter(el => {
                                        return !(namePhotoCopies.includes(el.name) && nameSnapshotPhotos.includes(el.name));
                                    });
                                    
                                    if(lastPhotos.length === 0) {
                                        console.log('dont want to delete a thing from storage');
                                        return;
                                    }

                                    //delete the photos in the album in storage
                                    const promises = lastPhotos.map(async photo => {
                                        const result = await storage.ref(photo.path).delete()
                                        return new Promise((resolve, reject) => {resolve(result)});
                                    })

                                    Promise.all(promises).then(() => {
                                        console.log('everything deleted!');
                                    }).catch(error => {
                                        console.log(error);
                                    }) 
                
                                }).catch(error => {
                                    console.log(error);
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
                            <div className="text-center my-5 albums">
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