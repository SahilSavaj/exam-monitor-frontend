import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
// background: rgba(0,0,0,0.5);
height: 50px;
display: flex;
justify-content: end;
z-index: 12;

`;

export const NavLink = styled(Link)`
color: white;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
cursor: pointer;
font-family: 'Montserrat';
font-weight:bolder;
font-size:20px;
&.active {
 color: #D61C4E;
 
}
`;

export const Bars = styled(FaBars)`
display: none;
color: #808080;

@media screen and (max-width: 768px) {
 display: block;
 position: absolute;
 top: 0;
 right: 0;
 transform: translate(-100%, 75%);
 font-size: 1.8rem;
 
 cursor: pointer;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
white-space: nowrap;
@media screen and (max-width: 768px) {
 display: none;
}
`;
