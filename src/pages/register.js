import React, { useState } from "react";
import '../page-styles/Forms.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const Register =() => {

    const [name,setName]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [sapid,setSapid]=useState('');
    // const [image,setImage]=useState('');
    // const [user_type,setUser]=useState('');
    // const [resp,setResp]=useState('');
    let navigate = useNavigate();


    const handleInputChange = (e) => {
      const {id , value} = e.target;
      // console.log()
      if(id === "name"){
        setName(value);
      }
      if(id === "username"){
        setUsername(value);
      }
      if(id === "email"){
          setEmail(value);
      }
      if(id === "password"){
        setPassword(value);
      }
      if(id === "sapid"){
        setSapid(value);
      }
      // if(id === "admin"){
      //   setUser(value)
      // }
      // if(id === "student"){
      //   setUser(value)
        
      // }
      // let content={
      //   name:name,
      //   username:username,
      //   password:password,
      //   email:email,
      //   sapid:sapid,
      //   image:image,
      //   is_admin:true
      // }
      // console.log(content)

    }
    
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    const webcamRef = React.useRef(null);
  const handleSubmit  = async (e) => {
    e.preventDefault();
    if( webcamRef.current.state.hasUserMedia === false ){
      alert("Webcam Access not available.")
      navigate("/register")
    }
    else{
      let content={
        name:name,
        username:username,
        password:password,
        email:email,
        sapid:sapid,
        image:webcamRef.current.getScreenshot(),
        is_admin:true 
      }
    console.log(content);
    await sleep(3000)
      // const url='http://127.0.0.1:5000/register'
    const url='http://192.168.0.104:8000/register'
    // const url='http://172.20.10.2:5000/register'


        await axios.post(url, content,{headers:{
          // 'Access-Control-Allow-Origin':'*',
          // 'Content-type':'application/json'
        }})
        .then(response => {

        
          console.log(response.data)
          if (response.data.statuscode===200){
              alert(response.data.response)
              navigate("/login",{sapid:sapid})
          }
          else{
            alert(response.data.response)
            navigate("/register")
          }
        }
          // setResp(response.data)
          )
        .catch(error => {
        console.error('There was an error!', error);
        });
    }
  }

  return (
      <>
      <Container fluid> 
        <div className='login-form'>
          <div className="formCenter">
            <form className="formFields" onSubmit={(e)=>handleSubmit(e)}>
              <div className="formHeading">
              <Row>
                  <h1 class='login-form-heading'>Register</h1>
              </Row>      
              </div>
              <div className="formDivision">
                <div className="inputSideForm">
                  <div className="formField">
                    <Col className="form-labels">
                    <label className="formFieldLabel" htmlFor="name">
                      Name
                    </label>
                    </Col>
                    <Col>
                    <input
                      type="text"
                      id="name"
                      className="formFieldInput"
                      placeholder="Enter your name"
                      name="name" 
                      // value={this.state.name}
                      onChange={(e) => handleInputChange(e)}
                    /></Col>
                  </div>
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
              <Col className="form-labels">
                <label className="formFieldLabel" htmlFor="email">
                  Email
                </label>
                </Col>
                <Col>
                <input
                  type="email"
                  id="email"
                  className="formFieldInput"
                  placeholder="Enter your email"
                  name="email" 
                  // value={this.state.name}
                  onChange={(e) => handleInputChange(e)}
                /></Col>
              </div>

              <div className="formField">
              <Col className="form-labels">
                <label className="formFieldLabel" htmlFor="sapid">
                  SAP ID
                </label>
                </Col>
                <Col>
                <input
                  type="number"
                  id="sapid"
                  className="formFieldInput"
                  placeholder="Enter your Institute ID"
                  name="sapid" 
                  // value={this.state.name}
                  onChange={(e) => handleInputChange(e)}
                /></Col>
              </div>
              <div className="formField">
              <Col>
                <label className="formFieldLabel" htmlFor="terms">
                <input
                   className="formFieldCheckbox"
                   type="checkbox"
                   name="hasAgreed"
            //  value={this.state.hasAgreed}
                   onChange={(e) => handleInputChange(e)}
                />{" "}
              I agree all statements in{" "}
              <a href="/" className="formFieldTermsLink">
                {/* add href above */}
                terms of service
              </a>
                </label>
                </Col>
              </div>
                <div className="formField">
                  <button className="formFieldButton">Register</button>
                </div>

                <div className="formField">
                  <Link to="/login" className="formFieldLink">
                      Already Registered?
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