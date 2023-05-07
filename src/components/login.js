import React, { useState,useEffect} from "react";
// import '../page-styles/Forms.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import axios from 'axios';

const ip_url=process.env.REACT_APP_IP_ADDRESS


const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const Login =() => {

  const input_style={
    'borderBottom': '1px solid #445366'
  }
    const [loading,setLoading]=useState(false)
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    let navigate = useNavigate();
    const handleInputChange = (e) => {
      const {id , value} = e.target;
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
    if(webcamRef.current.state.hasUserMedia !== false ){
      let content={
        username:username,
        password:password,
        image:webcamRef.current.getScreenshot(),
      }
    console.log(ip_url);
    const url=ip_url+"/login"
        await axios.post(url, content)
        .then(response => {
          // console.log(response.data)
            if (response.data.statuscode===200){
				// console.log(response.data.response.sapid)
				if(response.data.response.is_admin){
				alert("Admin Login Successful!")
				navigate({
					pathname: '/admin',
					search: '?admin_id='+response.data.response.sapid,
					})
				}
				else{
					alert(response.data.response.status)
          if(response.data.response.exam_type==="objective"){
							navigate({
							pathname: '/exam',
							search: '?sapid='+response.data.response.sapid,
						})
					}
          else{
							navigate({
							pathname: '/code',
							search: '?sapid='+response.data.response.sapid,
						})
					}
				
				}
              
            }
            else{
              alert(response.data.response)
              navigate("/login")
              }
          }
          )
        .catch(error => {
          alert('There was an error!');
        // console.error('There was an error!', error);
        });
      
    }
    else{
      alert("Webcam Access not available.")
      navigate("/login")
    }
    
    }

    useEffect( () => {
      (async()=>{
        await sleep(1000)
        setLoading(true)
      })();
    },[])
  
  return (
    <>
    {!loading ? (
          <div className="flex justify-center items-center align-middle h-[80vh] ">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-[#D61C4E] transition ease-in-out" role="status">
            </div>
          </div>) :
          (<>
            <div className="page_heading flex justify-center align-start text-[#D61C4E] font-sans text-[4vw]">
                  Login
            </div>
            <div>
                <form className="flex felx-col justify-center align-middle items-center mx-auto space-x-10" onSubmit={(e)=>handleSubmit(e)}>
                  <div className="left_side_form flex justify-center h-[70vh] flex-col">
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
                          type="password" 
                          id="password" 
                          placeholder="Enter your password" 
                          name="password" 
                          onChange={(e) => handleInputChange(e)}></input>
                      </div>
                    </div>
                    <div className="form-group mb-6">
                      <div className="input_field flex align-middle text-white justify-center space-x-2 items-center text-lg p-t-5">
                        <Link to="/login" className="formFieldLink t-md hover:text-[#D61C4E] transition ease-in-out">
                            New user?
                        </Link>
                      </div>
                    </div>
                    <div className="form-group mb-6">
                        <div className="submit_button flex align-middle text-white justify-center space-x-2 items-center text-xl p-t-5">
                          <button className="formFieldLink t-md hover:text-[#D61C4E] transition ease-in-out bg-[#D61C4E] px-10 py-1.5 rounded-lg hover:bg-white">
                              Login
                          </button>
                        </div>
                      </div>
                  </div>
                  <div className="right_side_form flex justify-center align-top">
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
export default Login;