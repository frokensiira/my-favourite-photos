import CustomerPhoto from './CustomerPhoto';
import { SRLWrapper } from 'simple-react-lightbox';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import { FadeLoader } from 'react-spinners';

const CustomerAlbum = () => {
    const [loading, setLoading] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const [likedPhotos, setLikedPhotos] = useState();

    const handleReviewButtons = (e) => {
        console.log('this is e.target.value', e.target.value);
        console.log('someone clicked me', e.target.labels[0].id);

        //const [image] = photos.filter(photo => (photo.id === e.target.id));

        if(e.target.value === 'like') {
            console.log('I like this photo');
            //setLikedPhotos(photos => [...photos, image]);
        } else if (e.target.value === 'dislike') {
            console.log('I do not like this photo');
        } else {
            console.log('something went wrong');
        }
    }

    const handleSubmit = () => {

    }

    return (  
        <div>
            {/* <h1 className="text-center">{albumTitle}</h1> */}
            <h1 className="text-center">Kundalbum</h1>
                
                    {
                        loading
                            ? (<div className="d-flex justify-content-center my-5"><FadeLoader color={'#576675'} size={50}/></div>)
                            
                            : (

                                <SRLWrapper>
                                    <Row className="mb-5">
                                        
                                        <CustomerPhoto handleReviewButtons={handleReviewButtons}/>
                                    
                                    </Row>
                                </SRLWrapper>

                                
                            )
                    }
                    <Row>
                        <Col md={{ span: 6, offset: 3}}>
                            <Form>
                                <Button onClick={handleSubmit}>Skicka album till fotograf</Button>
                            </Form>
                        </Col>
                    </Row>
        </div>
    );
}
 
export default CustomerAlbum;