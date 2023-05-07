import React from "react";
// import { Nav, NavLink, NavMenu } from "./navBarElements";
import {  Link } from "react-router-dom";
import logo from './static/logo.png' 
import logo_vid from "./static/logo_vid.mp4"

// import "./navBar.css"

export default function Navbar(){
return (
	<>
		<header className="bg-transparent text-[#D61C4E]">
			{/* style={{width:"fit-content;"}} */}
			<div className="flex container font-sans items-center ">
				<nav className="title-font font-medium text-white mr-2">
					<Link to="/" className="">
						<img className="logo-top" src={logo} width={60} alt=""></img>
					</Link>
				</nav>
				<nav className=" py-1 pl-4 md:border-l md:border-gray-500 flex flex-row items-center text-lg justify-center">
					<Link to="/" className="mr-5 hover:text-white ">
						Home
					</Link>
					<Link to="/login" className="mr-5 hover:text-white ">
						Login
					</Link>
					<Link to="/register" className="mr-5 hover:text-white ">
						Register
					</Link>
					<Link
						to="/admin?admin_id=60002190086"
						className="mr-5 hover:text-white "
					>
						Admin
					</Link>
					<Link to="/exam?sapid=60002190091" className="mr-5 hover:text-white">
						Exam
					</Link>
					{/* <Link to="/code?sapid=1234567" className="mr-5 hover:text-white">
						Code
					</Link> */}
				</nav>
			</div>
		</header>
	</>
);
};

