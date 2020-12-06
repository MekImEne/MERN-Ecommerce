import React, { useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signout } from '../../actions/auth.actions';

/**
* @author
* @function Header
**/

const Header = (props) => {

    const auth  = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout());
    };

    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span onClick={logout} className="nav-link">Signout</span>
                </li>                
            </Nav>
        );  
    };

    const renderNonLoggedInLinks = () => {
        return (
            <Nav>
                {/* <Nav.Link href="/signin">Signin</Nav.Link> */}
                <li className="nav-item">
                    <NavLink to="/signin" className="nav-link">Signin</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                </li>                
            </Nav>
        );
    }; 
  
    return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{zIndex: 1}}>
        <Container fluid >
            <Link to="/" className="navbar-brand">Admin Dashboard</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks() }
            </Navbar.Collapse>
        </Container>    
    </Navbar>
   )

 }

export default Header