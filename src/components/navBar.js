import React from "react";
import { Nav, NavLink, NavMenu }
from "./navBarElements";
import logo from './static/logo.png' 
import "./navBar.css"

const Navbar = () => {
return (
    <>
    <Nav>
        <NavLink to="/" activeStyle>
        <img className="logo-top" href="/" src={logo} alt=''></img>
        </NavLink>
        <NavMenu>
            <NavLink to="/" activeStyle>
            Home
            </NavLink>
            <NavLink to="/login" activeStyle>
            Login
            </NavLink>
            <NavLink to="/register" activeStyle>
            Register
            </NavLink>
            {/* <NavLink to="/exam" activeStyle>
            Exam
            </NavLink> */}
            {/* <NavLink to="/contact" activeStyle>
            Contact Us
            </NavLink> */}
        </NavMenu>
    </Nav>
    </>
);
};

export default Navbar;
