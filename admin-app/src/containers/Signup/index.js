import React, {useState} from 'react'
import Layout from '../../components/Layout'
import {Container, Form, Button, Row, Col} from 'react-bootstrap'
import Input from '../../components/UI/Input'
import {Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signup } from '../../actions'

/**
* @author
* @function Signup
**/

const Signup = (props) => {

    const auth = useSelector(state=> state.auth);
    const user = useSelector(state=> state.user);
    
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');

    const dispatch = useDispatch();

    const userSignup = (e) => {
        e.preventDefault();
        const user= { firstName, lastName, email, password } ;
        dispatch(signup(user));
    };
    if(auth.authenticate){
        return <Redirect to={'/'} />
    }

    if(user.loading){
        return <p>Loading...!</p>
    }

    return(
    <Layout>
        <Container>
            {user.message}
            <Row style={{marginTop: '50px'}}>
                <Col md={{span: 6, offset: 3}}>
                    <Form onSubmit={userSignup} >
                        <Row>
                            <Col md={6}>
                                <Input
                                    Label="First Name"
                                    placeholder="first name"
                                    value={firstName}
                                    type="text"
                                    onChange={(e)=> {setfirstName(e.target.value)}}
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    Label="Last Name"
                                    placeholder="last name"
                                    value={lastName}
                                    type="text"
                                    onChange={(e)=> {setlastName(e.target.value)}}
                                />
                            </Col>
                        </Row>
                        <Input
                            Label="Email"
                            placeholder="email"
                            value={email}
                            type="email"
                            onChange={(e)=> {setEmail(e.target.value)}}
                        />
                        <Input
                            Label="Password"
                            placeholder="password"
                            value={password}
                            type="password"
                            onChange={(e)=> {setPassword(e.target.value)}}
                        />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </Layout>
   )
}

export default Signup