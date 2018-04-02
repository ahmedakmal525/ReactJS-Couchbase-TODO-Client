import React, { Component } from 'react'
import { Container, 
        Row, 
        Col,
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        Button, 
        FormGroup, 
        Label, 
        Input, 
        FormText,
        Table,Modal, 
        ModalHeader, 
        ModalBody, 
        ModalFooter } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import CRUD from '../api/CRUD'
const USER_TOKEN = 'todo_user'

class Profile extends Component {

    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this)
    this.clearLoginData  = this.clearLoginData.bind(this)
    this.onTODOTitleChange = this.onTODOTitleChange.bind(this)
    this.onTODODateChange = this.onTODODateChange.bind(this)
    this.onTODONoteChange = this.onTODONoteChange.bind(this)
    this.onTODONoteSubmit = this.onTODONoteSubmit.bind(this)
    this.getUserToken = this.getUserToken.bind(this)
    this.modalToggle = this.modalToggle.bind(this)
    this.onEditTitleChange = this.onEditTitleChange.bind(this)
    this.onEditDateChange = this.onEditDateChange.bind(this)
    this.onEditContentChange = this.onEditContentChange.bind(this)
    this.onEditFormSubmit = this.onEditFormSubmit.bind(this)

        this.state = {
            isOpen: false,
            redirect:false,
            modal: false,
            title:'',
            date:'',
            note:'',
            data:[],
            currentData:'',
            editTitle:'',
            editDate:'',
            editNote:''
        }
    }
    componentWillMount(){
        let crud = new CRUD()
        crud.readData(this.getUserToken()).then(response=>{
            console.log(response.data)
            this.setState({data: response.data})
        })
    }
    onTODOTitleChange(event){
        this.setState({title: event.target.value})
    }

    onTODODateChange(event){
        this.setState({date: event.target.value})
    }

    onTODONoteChange(event){
        this.setState({note: event.target.value})
    }

    getUserToken(){
        return localStorage.getItem(USER_TOKEN)
    }

    onTODONoteSubmit(){
        let crud = new CRUD()
        crud.insertData(
            this.state.title, 
            this.state.date, 
            this.state.note, 
            this.getUserToken()).then(response=>{
                (response.data)?(crud.readData(this.getUserToken()).then(res=>{
                    console.log(res)
                    console.log('----------------------')
                    this.setState({data: res.data})
                })):""
            })
    }

    modalToggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    checkExistingUser(){
        return localStorage.getItem(USER_TOKEN)
    }

    clearLoginData(){
        localStorage.clear()
        this.setState({redirect:true})
    }

    setModalDataID(key){
        this.setState({currentData: key})    
    }

    onEditTitleChange(event){
        this.setState({editTitle: event.target.value})
    }

    onEditDateChange(event){
        this.setState({editDate: event.target.value})
    }

    onEditContentChange(event){
        this.setState({editNote: event.target.value})
    }

    onEditFormSubmit(){
        var crud = new CRUD()
        crud.editData(
            this.state.currentData, 
            this.state.editTitle,  
            this.state.editDate, 
            this.state.editNote, 
            this.getUserToken()).then(response=>{
                this.setState({data: response.data})
            })
    }

    onDeleteData(){
        var crud = new CRUD()
        crud.deleteData(
            this.state.currentData, 
            this.getUserToken()).then(response=>{
                this.setState({data: response.data})
            })
    }

    render() {
        console.log(this.state.currentData)
        return (
            <Container>
                <Row>
                    <Col>
                        {(this.state.redirect?(<Redirect to="/"/>):(<div/>))}
                        {(this.checkExistingUser()===null?(<Redirect to="/"/>):(<div/>))}
                    </Col>                  
                </Row> 
                <Row>
                    <Col xs="12">
                        <Navbar color="dark" dark expand="md">
                            <NavbarBrand href="/">TODO App</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Button 
                                            outline
                                            color="warning"
                                            onClick={this.clearLoginData}>Logout</Button>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col xs="4">
                        <Container className="mt-2">
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="title">Title</Label>
                                        <Input 
                                            type="text" 
                                            name="title" 
                                            id="title" 
                                            placeholder="Enter the title"
                                            onChange={this.onTODOTitleChange} />
                                        <FormText color="muted">Provide a title to your TODO note.</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="date">Date</Label>
                                        <Input 
                                            type="date" 
                                            name="date" 
                                            id="date" 
                                            placeholder="Enter the date"
                                            onChange={this.onTODODateChange} />
                                        <FormText color="muted">When you want to execute the task?</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="note">Note</Label>
                                        <Input 
                                            type="textarea" 
                                            name="note" 
                                            id="note" 
                                            placeholder="Enter the note"
                                            onChange={this.onTODONoteChange} />
                                        <FormText color="muted">Enter the content above.</FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button 
                                            color="primary" 
                                            size="lg" block
                                            onClick={this.onTODONoteSubmit}
                                            >Save TODO</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col xs="8">
                        <Container className="mt-2">
                            <Row>
                                <Col>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>#ID</th>
                                                <th>Title</th>
                                                <th>Date</th>
                                                <th>Note</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.data.map((element, key)=>{
                                                return (
                                                    <tr key={key}>
                                                        <td>{element.id}</td>
                                                        <td>{element.TODO.title}</td>
                                                        <td>{element.TODO.date}</td>
                                                        <td>{element.TODO.note}</td>
                                                        <td>
                                                            <Button 
                                                                color="warning"
                                                                onClick={this.modalToggle}
                                                                onMouseUp={this.setModalDataID.bind(this, element.id)}>Edit</Button>
                                                        </td>
                                                        <td>
                                                            <Button 
                                                                color="danger"
                                                                onMouseDown={this.setModalDataID.bind(this, element.id)}
                                                                onMouseUp={this.onDeleteData.bind(this)}
                                                                >Delete</Button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
                    </Col>                    
                </Row>
                <Row>
                    <Col>
                    <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
                        <ModalHeader toggle={this.modalToggle}>Edit TODO Data</ModalHeader>
                        <ModalBody>
                        <FormGroup>
                            <Label for="edittitle">Edit Title</Label>
                            <Input 
                                type="text" 
                                name="edittitle" 
                                id="edittitle"
                                onChange={this.onEditTitleChange}
                                placeholder="Edit the title" />
                            <FormText color="muted">Edit the title of your TODO note.</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="editdate">Edit Date</Label>
                            <Input 
                                type="date" 
                                name="editdate" 
                                id="editdate"
                                onChange={this.onEditDateChange}
                                placeholder="Edit the date"/>
                            <FormText color="muted">When you want to execute the task?</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="editnote">Edit Note</Label>
                            <Input 
                                type="textarea" 
                                name="editnote" 
                                id="editnote"
                                onChange={this.onEditContentChange}
                                placeholder="Edit the note" />
                            <FormText color="muted">Edit the content above.</FormText>
                        </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" 
                                onClick={()=>{
                                    this.onEditFormSubmit()
                                    this.modalToggle()
                                }}
                                >Edit</Button>{' '}
                            <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>                  
                    </Col>                  
                </Row>           
            </Container>
        );
    }
}

export default Profile;