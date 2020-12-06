import React from 'react'
import Layout from '../../components/Layout'
import {Container, Form, Button, Row, Col} from 'react-bootstrap'
import Input from '../../components/UI/Input/index'
import { login } from '../../actions'
import { useDispatch } from 'react-redux'

/**
* @author
* @function Signin
**/

const Signin = (props) => {

    const dispatch = useDispatch();

    const userLogin = (e)=> {

        e.preventDefault(); 

        const user = {
            email: 'imene@esi.dz',
            password: 'assemchelli'
        };
        dispatch(login(user)); 
    };

  return(
    <Layout>
        <Container>
            <Row style={{marginTop: '50px'}}>
                <Col md={{span: 6, offset: 3}}>
                    <Form onSubmit={userLogin} >
                        <Input
                            Label="Email"
                            placeholder="email"
                            value=""
                            type="email"
                            onChange={()=> {}}
                        />

                        <Input
                            Label="Password"
                            placeholder="password"
                            value=""
                            type="password"
                            onChange={()=> {}}
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

export default Signin