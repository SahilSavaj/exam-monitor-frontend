import React, { useState,useEffect,useRef } from "react";
// import '../page-styles/Forms.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import axios from 'axios';

const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const Register =() => {

    const input_style={
      'borderBottom': '1px solid #445366'
    }
    const [loading,setLoading]=useState(false)

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
    const url='http://192.168.0.100:8000/register'
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

  useEffect( () => {
    (async()=>{
      await sleep(1000)
      // if (webcamRef.current.state.hasUserMedia === true){
      // }
      setLoading(true)
    })();
  },[])

  return (
      <>
      {!loading ? (
            <div className="flex justify-center items-center align-middle h-[80vh]">
              <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-[#D61C4E]" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>) :
            (<>
              <div className="page_heading flex justify-center align-start text-[#D61C4E] font-sans text-[4vw]">
                    Register
              </div>
              <div>
                  <form className="flex felx-col justify-center align-middle items-center mx-auto space-x-10" onSubmit={(e)=>handleSubmit(e)}>
                    <div className="left_side_form flex justify-center h-[70vh] flex-col">
                      <div className="form-group mb-6">
                        <div className="input_field flex align-middle text-white justify-start space-x-2 items-center text-lg ">
                          <label className="w-[6vw]">Name:</label>
                          <input className="form-control border-[#D61C4E] border-solid pl-3 py-1.5 w-[30vw] col-span-10 m-0 bg-transparent 
                          transition ease-in-out text-base focus:text-white focus:bg-transparent focus:border-black focus:outline-none focus:rounded" 
                            style={input_style}
                            type="text" 
                            id="name" 
                            placeholder="Enter your name" 
                            name="name" 
                            onChange={(e) => handleInputChange(e)}></input>
                        </div>
                      </div>
                      <div className="form-group mb-6">
                        <div className="input_field flex align-middle text-white justify-start space-x-2 items-center text-lg ">
                        <label className="w-[6vw]">Username:</label>
                          <input className="form-control border-[#D61C4E] border-solid pl-3 py-1.5 w-[30vw] col-span-10 m-0 bg-transparent 
                          transition ease-in-out text-base focus:text-white focus:bg-transparent focus:border-black focus:outline-none focus:rounded" 
                            style={input_style}
                            type="text" 
                            id="username" 
                            placeholder="Enter your username" 
                            name="username" 
                            onChange={(e) => handleInputChange(e)}></input>
                        </div>
                      </div>
                      <div className="form-group mb-6">
                        <div className="input_field flex align-middle text-white justify-start space-x-2 items-center text-lg ">
                          <label className="w-[6vw]">Password:</label>
                          <input className="form-control border-[#D61C4E] border-solid pl-3 py-1.5 w-[30vw] col-span-10 m-0 bg-transparent 
                          transition ease-in-out text-base focus:text-white focus:bg-transparent focus:border-black focus:outline-none focus:rounded" 
                            style={input_style}
                            type="text" 
                            id="password" 
                            placeholder="Enter your password" 
                            name="password" 
                            onChange={(e) => handleInputChange(e)}></input>
                        </div>
                      </div>
                      <div className="form-group mb-6">
                        <div className="input_field flex align-middle text-white justify-start space-x-2 items-center text-lg ">
                          <label className="w-[6vw]">Email:</label>
                          <input className="form-control border-[#D61C4E] border-solid pl-3 py-1.5 w-[30vw] col-span-10 m-0 bg-transparent 
                          transition ease-in-out text-base focus:text-white focus:bg-transparent focus:border-black focus:outline-none focus:rounded" 
                            style={input_style}
                            type="text" 
                            id="email" 
                            placeholder="Enter you email" 
                            name="email" 
                            onChange={(e) => handleInputChange(e)}></input>
                        </div>
                      </div>
                      <div className="form-group mb-6">
                        <div className="input_field flex align-middle text-white justify-start space-x-2 items-center text-lg ">
                          <label className="w-[6vw]">SapID:</label>
                          <input className="form-control border-[#D61C4E] border-solid pl-3 py-1.5 w-[30vw] col-span-10 m-0 bg-transparent 
                          transition ease-in-out text-base focus:text-white focus:bg-transparent focus:border-black focus:outline-none focus:rounded" 
                            style={input_style}
                            type="number" 
                            id="sapid" 
                            placeholder="Enter your sapid" 
                            name="sapid" 
                            onChange={(e) => handleInputChange(e)}></input>
                        </div>
                      </div>
                      <div className="form-group mb-6">
                        <div className="input_field flex align-middle text-white justify-start space-x-2 items-center text-lg ">
                        <input  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600
                        checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                            type="checkbox"
                            id="hasAgreed"
                            onChange={(e) => handleInputChange(e) }
                            ></input>
                          <label className="form-check-label text-gray-500">{" "}I agree all statements in{" "}<a href="/" className="text-[#D61C4E]">terms of service</a></label>
                        </div>
                      </div>
                      <div className="form-group mb-6">
                        <div className="input_field flex align-middle text-white justify-center space-x-2 items-center text-lg p-t-5">
                          <Link to="/login" className="formFieldLink t-md hover:text-[#D61C4E] transition ease-in-out">
                              Already Registered?
                          </Link>
                        </div>
                      </div>
                      <div className="form-group mb-6">
                        <div className="submit_button flex align-middle text-white justify-center space-x-2 items-center text-xl p-t-5">
                          <button className="formFieldLink t-md hover:text-[#D61C4E] transition ease-in-out bg-[#D61C4E] px-10 py-1.5 rounded-lg hover:bg-white">
                              Register
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="right_side_form flex justify-center align-top h-[50vh]">
                      <div className="web-cam" >
                        <Webcam className=" border-white border-solid rounded-lg transition ease-in-out"
                          audio={false}
                          height={300}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          width={500}
                          videoConstraints={videoConstraints}
                          // onUserMedia={setLoading(true)}
                        />
                        </div>
                    </div>
                  </form>
                </div>
            </>)
}
    </>
    
    );
}
export default Register;