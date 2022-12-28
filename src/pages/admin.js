import '../page-styles/admin.css'
import React from 'react';
import logo_vid from '../components/static/logo_vid.mp4'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Admin() {
    return (
      <>
      <Container fluid>
      <Row>
      <div className="heading">
      {/* <video className='logo_video' src={logo_vid} autoPlay loop muted/> */}
      <h1 className='main-text'>Admin page</h1>
      </div>
      </Row>
      </Container>

    </>
    );
  }
  
export default Admin;