import React,{Component} from 'react';
import '../assets/index.css';
import {Card,Container,Row,Col,Form} from 'react-bootstrap';
import Process from './process';

class currentParse extends Component{

    constructor(){
        super();
        this.state = {
            value:'',
            available_current:[
                100000,50000,
                20000,10000,
                5000,2000,1000,
                500,100,50
            ],
            validatorText:'',
            result:[]
        }
    }

    invalidInput(value){
        
        let invalidSeparator = value.match(/^(\d{1,3})([,| ]\d{1,3})*(,\d{1,})?(| )$/g)
        let wrongPosition = value.match(/^(\d{1,3})(.\d{1,3})*(,\d{1,2})?( Rp | Rp|Rp|Rp )$/g)
        let missingValue = value.match(/^(Rp|Rp )?$/g)
        
        if(invalidSeparator){
            this.setState({validatorText:'Invalid Separator'})
            return true;
        }else if(wrongPosition){
            this.setState({validatorText:'Valid character in wrong position'})
            return true;
        }else if(missingValue){
            this.setState({validatorText:'Missing Value'})
            return true;
        }else{
            return false;
        }
        
    }

    processValue(value){
        this.setState({result:Process.process(value)});
    }
    
    handleChange(event) {
        event.target.value= event.target.value.replace(/  +/g, ' ');
        this.setState({ value: event.target.value });
    }
    handleKeyPress = (event) => {
        var charCode = (event.charCode) ? event.charCode : ((event.keyCode) ? event.keyCode :
                  ((event.which) ? event.which : 0));
        var allowedCode = [44,46,82,112,32,13]
        if(charCode > 31 && (charCode < 48 || charCode > 57) && (allowedCode.indexOf(charCode) === -1)){
            event.preventDefault();
            return false;
        }else{
            if(event.key ==='Enter'){
           
                if(this.invalidInput(this.state.value)){
                    console.log('Stop')
                }else{
                    console.log('Lanjutkan')
                    this.setState({validatorText:''})
                    let rmRp = this.state.value.replace(/([Rp |Rp])/g,'');
                    if(this.invalidInput(rmRp)){
                        console.log('Stop lagi')
                    }else{
                        let rmTail = rmRp.replace(/(,00)*(,\d{1,})/g,'')
                        let rmDot = rmTail.replace(/\./g,'')
                        if(Number(rmDot) !== isNaN){
                            this.processValue(Number(rmDot))
                        }else{
                            this.setState({validatorText:'Invalid Value'})
                        }
                    }
                }
            }
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
                                    {this.state.validatorText === ''?'Press Enter To Process':<div style={{color:'red'}}>{this.state.validatorText}</div>}
                                </Form.Text>
                            </Form.Group>

                            <Card.Text>
                            Result : { Process.resultview(this.state.result)[2] ===''?
                                Process.resultview(this.state.result)[1]:
                                Process.resultview(this.state.result)[0]}
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