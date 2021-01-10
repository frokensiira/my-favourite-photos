import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { FadeLoader } from 'react-spinners';
import { Row } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import Photo from './Photo';
import { SRLWrapper } from 'simple-react-lightbox';
import useAlbum from '../hooks/useAlbum';

const Album = () => {
    const { albumId } = useParams();
    const { albumTitle, loading, photos } = useAlbum(albumId);
    
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