import React from 'react';
import useAlbum from '../hooks/useAlbum';
import { FadeLoader } from 'react-spinners';
import { useParams, Link } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';


const ShowPreviewCustomerAlbum = () => {
    const { albumId } = useParams();
    const { albumTitle, loading, photos } = useAlbum(albumId);
    return (
        <div>
            <h1 className="text-center">{albumTitle}</h1>
            <p>Du har valt X antal bilder av totalt Y</p>
            {
                loading
                    ? (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
                    
                    : (
                        <SRLWrapper>
                            <Row className="mb-5">
                                <h2>Valda bilder</h2>
                                <ul></ul>
                                <h2>Bortvalda bilder</h2>
                                <ul></ul>
                                <Link to={`/review/${albumId}`} className="btn btn-primary">Redigera</Link>
                                <Button variant="secondary">Bekräfta</Button>
                            </Row>
                        </SRLWrapper>
                    )
            }
        </div>
    )
}

export default ShowPreviewCustomerAlbum;
