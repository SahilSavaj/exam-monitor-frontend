import React, { useState } from "react";
import '../page-styles/Forms.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Alert } from "react-bootstrap";

const Register =() => {


    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    // const [image,setImage]=useState('');
    // const [resp,setResp]=useState('');
    let navigate = useNavigate();
    // console.log(Route.sapid)
    const handleInputChange = (e) => {
      const {id , value} = e.target;
      // console.log()
      if(id === "username"){
        setUsername(value);
      }
      if(id === "password"){
        setPassword(value);
      }

    }
    
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    const webcamRef = React.useRef(null);  
        
  const handleSubmit  = async (e) => {
    e.preventDefault();
    // console.log(webcamRef.current)
    if(webcamRef.current.state.hasUserMedia !== false ){
      let content={
        username:username,
        password:password,
        image:webcamRef.current.getScreenshot(),
      }
    console.log(content);
    // const url='http://127.0.0.1:5000/login'
    const url='http://192.168.0.104:8000/login'
        // const url='http://172.20.10.2:5000/login'
        await axios.post(url, content)
        .then(response => {
          console.log(response.data)
            if (response.data.statuscode===200){
              console.log(response.data.response.sapid)
              alert(response.data.response.status)
              navigate({
                pathname: '/exam',
                search: '?sapid='+response.data.response.sapid,
              })
            }
            else{
              alert(response.data.response)
              navigate("/login")
              }
          }
          )
        .catch(error => {
        console.error('There was an error!', error);
        });
      
    }
    else{
      alert("Webcam Access not available.")
      navigate("/login")
    }
    
    }
    // {console.log(window.innerWidth)}
    
  
  return (
      <>
      <Container fluid> 
        <div className='login-form'>
          <div className="formCenter">
            <form className="formFields" onSubmit={(e)=>handleSubmit(e)}>
              <div className="formHeading">
              <Row>
                  <h1 class='login-form-heading'>Login</h1>
              </Row>      
              </div>
              <div className="formDivision">
                <div className="inputSideForm">
                  <div className="formField">
                    <Col className="form-labels">
                    <label className="formFieldLabel" htmlFor="username">
                      User Name
                    </label>
                    </Col>
                    <Col>
                    <input
                      type="text"
                      id="username"
                      className="formFieldInput"
                      placeholder="Enter your user name"
                      name="username" 
                      // value={this.state.name}
                      onChange={(e) => handleInputChange(e)}
                    /></Col>
                  </div>
                <div className="formField">
                <Col className="form-labels">
                  <label className="formFieldLabel" htmlFor="password">
                    Password
                  </label>
                  </Col>
                  <Col>
                  <input
                    type="password"
                    id="password"
                    className="formFieldInput"
                    placeholder="Enter your password"
                    name="password"
                    // value={this.state.name}
                    onChange={(e) => handleInputChange(e)} 
                  /></Col>
                </div>
                <div className="formField">
                  <button className="formFieldButton">Login</button>
                </div>

                <div className="formField">
                  <Link to="/login" className="formFieldLink">
                      New user?
                  </Link>
                </div>
              </div>
              <Col>
              <div className="web-cam" >
                <Webcam
                  audio={false}
                  height={300}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={640}
                  videoConstraints={videoConstraints}
                />
                </div>
              </Col>
              </div>
            </form>
          </div>
        </div>
     
      </Container>
    </>
    );
}
export default Register;