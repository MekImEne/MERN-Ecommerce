import React from 'react';
import Layout from '../../components/Layout/index';
import {Jumbotron, Row, Col, Container} from 'react-bootstrap';
import './style.css';
import { NavLink } from "react-router-dom";

/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
    <Layout>
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar" >
            <ul>
              <li> <NavLink to={"/"} >Home</NavLink> </li>
              <li> <NavLink to={"/products"} >Products</NavLink> </li>
              <li> <NavLink to={"/orders"} >Orders</NavLink> </li>
            </ul>
          </Col>
          <Col md={10} style={{ marginLeft: 'auto' }} >Container</Col>
        </Row>
      </Container>
        {/* <Jumbotron style={{margin: '5rem', background: '#fff'}} className="text-center" >
            <h1>Welcome to admin Dashboard !</h1>
            <p>Fugiat dolore commodo incididunt veniam sunt elit mollit consequat officia Lorem nisi. Elit consequat ut id irure proident elit ea et. Ad sint excepteur duis nisi reprehenderit. Sit in ullamco dolor culpa voluptate fugiat. Cillum esse magna ut reprehenderit consectetur officia ipsum sit occaecat fugiat. Quis quis cillum mollit nostrud excepteur esse irure Lorem magna. Qui consectetur Lorem labore nulla sit incididunt duis non tempor consectetur dolor veniam mollit magna.</p>
        </Jumbotron> */}
    </Layout>
   )

 }

export default Home