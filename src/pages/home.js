import '../page-styles/Home.css'
import React from 'react';
import logo_vid from '../components/static/logo_vid.mp4'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Home() {
    return (
      <>
      <Container fluid>
      <Row>
      <div className="heading">
      <video className='logo_video' src={logo_vid} autoPlay loop muted/>
      <h1 className='main-text'>Online examination monitoring made simple !</h1>
      </div>
      </Row>
      </Container>

    </>
    );
  }
  
export default Home;