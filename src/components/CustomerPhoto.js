import { ButtonGroup, Card, Col, ToggleButton  } from 'react-bootstrap';
import { useState } from 'react';


const CustomerPhoto = ({photo, handleReviewButtons}) => {

    const [radioValue, setRadioValue] = useState('like');

    const radios = [
        { name: 'Gillar 👍', value: 'like' },
        { name: 'Gillar inte 👎', value: 'dislike' },
    ];

    const handleRadioButtons = (e) => {
        setRadioValue(e.currentTarget.value);
        handleReviewButtons(e.currentTarget.value, e.target.name)
    }
     
    //console.log('inside customerphoto this is photo', photo);
    return (  
        <Col sm={6} md={4} lg={3}>                                
            <Card className="mb-3">
                <a href={photo.fileUrl} title="View image" data-attribute="SRL">
                    <Card.Img variant="top" src={photo.fileUrl}/>
                </a>
                <Card.Body>
                    <ButtonGroup required>
                    {radios.map((radio, id) => (
                        <ToggleButton
                            key={id}
                            type="radio"
                            variant="secondary"
                            name={photo.id}
                            value={radio.value}
                            onChange={handleRadioButtons}
                            checked={radioValue === radio.value}
                        >
                        {radio.name}
                        </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </Col>
    );
}
 
export default CustomerPhoto;