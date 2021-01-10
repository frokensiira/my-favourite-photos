import { ButtonGroup, Card, Col, Form, ToggleButton  } from 'react-bootstrap';
import { useState } from 'react';


const CustomerPhoto = ({handleReviewButtons}) => {
     
 
    return (  
        <Col sm={6} md={4} lg={3}>                                
            <Card className="mb-3">
                <a href="http://thecatandthedog.com/wp-content/uploads/2020/11/105992231-1561667465295gettyimages-521697453-768x432.jpeg" title="View image" data-attribute="SRL">
                    <Card.Img variant="top" src="http://thecatandthedog.com/wp-content/uploads/2020/11/105992231-1561667465295gettyimages-521697453-768x432.jpeg"/>
                </a>
                <Card.Body>
                    <ButtonGroup toggle>
                        
                        <ToggleButton
                            type="radio"
                            variant="secondary"
                            name="review"
                            value="like"
                            onChange={handleReviewButtons}
                            id="http://thecatandthedog.com/wp-content/uploads/2020/11/105992231-1561667465295gettyimages-521697453-768x432.jpeg"
                        >
                            Gillar 👍
                        </ToggleButton>
                        <ToggleButton
                            type="radio"
                            variant="secondary"
                            name="review"
                            value="dislike"
                            onChange={handleReviewButtons}
                            id="http://thecatandthedog.com/wp-content/uploads/2020/11/105992231-1561667465295gettyimages-521697453-768x432.jpeg"
                        >
                            Gillar inte 👎
                        </ToggleButton>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </Col>
    );
}
 
export default CustomerPhoto;