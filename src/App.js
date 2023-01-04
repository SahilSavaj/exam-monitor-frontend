import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import './App.css';
import Navbar from './components/navBar';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Exam from './components/exam'
// import Contact from './pages/contact';
import Admin from './components/admin';

import bg_img from "./components/static/bg.jpg"

export default function App() {

  const main_style={
    background:`url(${bg_img})`,
    width:"100vw",
    height:"100vh",
    'objectfit':'cover'
  }
  const mask_style={
    background:"rgba(0,0,0,0.9)"
  }
  return (
    <>
      <div className="main_background" style={main_style}>
        <div className='mask absolute top-0 left-0 w-full h-full overflow-hidden bg-fixed' style={mask_style}>
          <div className="main_rotes">
          <Router>
            <Navbar/>
            <Routes>
                <Route exact path='/' element={<Home />} />
                {/* <Route path='/contact' element={<Contact/>} /> */}
                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/exam' element={<Exam/>}/>
                <Route path='/admin' element={<Admin/>}/>
              </Routes>
          </Router>
          </div>
        </div>
    </div>
    </>
    
  );
}

