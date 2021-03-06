import React from "react";
import { Menu as Nav, Icon, Button } from "element-react";
import { NavLink } from 'react-router-dom';

const Navbar = ({ user, handleSignout }) => (
    <Nav mode="horizontal" theme='dark' defaultActive='1'>
        <div className="nav-container">
            <Nav.Item index="1">    
                <NavLink to="/" className="nav-link">
                    <span className="app-title">
                        <img style={{paddingRight:"0.5rem"}} src="https://icon.now.sh/account_balance/f90" alt="App Icon"/>
                        Amplify Shop
                    </span>
                </NavLink>  
            </Nav.Item>
            {/* NavBar Items */}

            <div className="nav-items">
                <Nav.Item index="2">
                    <span className="app-user">Hello, {user.username}</span>
                </Nav.Item>
                <Nav.Item index="3">
                    <NavLink to="/profile" className="nav-link">
                        <Icon name="setting" />
                    </NavLink>
                </Nav.Item>
                <Nav.Item index="4">
                    <Button type="warning" onClick={handleSignout}>Sign Out</Button>
                </Nav.Item>
            </div>
        </div> 
    </Nav>
)

export default Navbar;
