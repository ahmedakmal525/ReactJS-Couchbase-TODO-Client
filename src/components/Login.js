import React, { Component } from 'react';
import { Container, 
        Row, 
        Col, 
        FormGroup, 
        Input, 
        Label, 
        Button, Alert, Card, CardHeader, CardBody, CardTitle, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
const USER_TOKEN = 'todo_user'

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            redirect: false,
            alert:false
        }
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onUserLoginSuccess = this.onUserLoginSuccess.bind(this)
        this.isUserExists = this.isUserExists.bind(this)
        this.onUserLoginFailed = this.onUserLoginFailed.bind(this)
    }

    onChangeUsername(event){
        this.setState({username : event.target.value})
    }

    onChangePassword(event){
        this.setState({password : event.target.value})
    }

    onUserLogin(){
        axios({
            method: 'post',
            url: 'http://localhost:xxxx/api/login',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        }).then( response => {
            var token = response.data.token
            localStorage.setItem(USER_TOKEN, token)
            this.onUserLoginSuccess()
        })
        .catch(error => {
            this.onUserLoginFailed()
        })
    }

    onUserLoginSuccess(){
        this.setState({redirect:true})
    }

    onUserLoginFailed(){
        this.setState({alert:true})
    }

    isUserExists(){
        return localStorage.getItem(USER_TOKEN)
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        {(this.isUserExists()!=null)?(<Redirect to="/profile"/>):(<div/>)}
                        {(this.state.redirect)?(<Redirect to="/profile"/>):(<div/>)}
                        
                        <Card className="mt-5">
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input 
                                        type="text" 
                                        name="username" 
                                        id="username" 
                                        placeholder="Enter the username"
                                        onChange={this.onChangeUsername} />
                                    <FormText color="muted">Enter your personal username.</FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        placeholder="Enter password" 
                                        onChange={this.onChangePassword}/>
                                    <FormText color="muted">Enter your password.</FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Button 
                                        size="sm"
                                        outline
                                        color="primary"
                                        onClick={this.onUserLogin.bind(this)}
                                        block>Submit</Button>
                                </FormGroup>
                            </CardBody>
                            {(this.state.alert)?(
                            <Alert color="danger">
                                Username / Password Incorrect !!!
                            </Alert>):(<div/>)}
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

export default Login;
