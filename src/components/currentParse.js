import React,{Component} from 'react';
import '../assets/index.css';
import {Card,Container,Row,Col,Form} from 'react-bootstrap';

class currentParse extends Component{

    constructor(){
        super();
        this.state = {
            value:''
        }
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleKeyPress = (event) => {
        if(event.key ==='Enter'){
           
          console.log(Number(this.state.value))
          this.setState({value:''})
        }
    }
    
    render(){
        
        return(<div>

            <Container>
                <Row>
                    <Col md={2}>
                    </Col>
                    <Col className='main-content'>
                        <Card style={{ width: '100%',minHeight:300 }}>
                        <Card.Body className='card-body-custom'>
                            <Card.Title className='text-center m-b-40'>
                                Minimum Number of Rupiahs App
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                Insert Amount
                            </Card.Subtitle>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control 
                                    type="text" 
                                    placeholder="e.g : Rp 100.000"
                                    onKeyPress={this.handleKeyPress}
                                    value={this.state.value}
                                    onChange={this.handleChange.bind(this)}
                                />
                                <Form.Text className="text-muted">
                                    Press Enter To Process
                                </Form.Text>
                            </Form.Group>

                            <Card.Text>
                            Result :
                            </Card.Text>
                            
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2}>
                    </Col>
                    
                </Row>
               
            </Container>
            
        </div>);
    }
}

export default currentParse;