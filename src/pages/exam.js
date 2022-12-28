import React, { useState ,useEffect} from "react";
import '../page-styles/Forms.css'
import Webcam from "react-webcam";
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';



const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );


const Exam =() => {
    const [show,setShow]=useState(false);
    const [button,setButton]=useState(true)
    // const [sapid,setSapid]=useState('');
    const [question_no,setQuestion_no]=useState('1');
    // const [image,setImage]=useState('');
    const [question,setQuestion]=useState('');
    const [option_a,setOption_a]=useState('')
    const [option_b,setOption_b]=useState('')
    const [option_c,setOption_c]=useState('')
    const [option_d,setOption_d]=useState('')
    const [ans,setAns]=useState('')
    const [num,setNum]=useState(1)
    let navigate = useNavigate();

    const searchParams = new URLSearchParams(document.location.search)
    const sapid=searchParams.get('sapid')
    // console.log(sapid);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
    const webcamRef = React.useRef(null); 


    const handleInputChange = (e) => {
      const {id , value} = e.target;
      // console.log()
      if(id === "option_a"){
        setAns(value);
        console.log(value)
        // document.getElementById(id).checked=true
        document.getElementById("option_b").checked=false
        document.getElementById("option_c").checked=false
        document.getElementById("option_d").checked=false
      }
      else if(id === "option_b"){
        setAns(value);
        console.log(value)
        // document.getElementById(id).checked=true
        document.getElementById("option_a").checked=false
        document.getElementById("option_c").checked=false
        document.getElementById("option_d").checked=false
      }
      else if(id === "option_c"){
        setAns(value);
        console.log(value)
        // document.getElementById(id).checked=true
        document.getElementById("option_a").checked=false
        document.getElementById("option_b").checked=false
        document.getElementById("option_d").checked=false
      }
      else if(id === "option_d"){
        setAns(value);
        console.log(value)
        // document.getElementById(id).checked=true
        document.getElementById("option_a").checked=false
        document.getElementById("option_b").checked=false
        document.getElementById("option_c").checked=false
      }
    }
    
    
    
    
  const handleSubmit  = async (e) => {
    e.preventDefault();
    console.log(num+1)
    setNum(num+1)
  }

const [loading, setLoading] = useState(false);
const [posts, setPosts] = useState([]);

useEffect(() => {
    const loadPost = async () => {
        setLoading(true);
        const url='http://192.168.0.104:8000/exam'
        // const url='http://172.20.10.2:5000/exam'
        if (num>1){
                const content={
                    question_no:question_no,
                    sapid:sapid,
                    ans:ans
                    }
                const response = await axios.post(url,content);
                // setPosts(response.data.response);
                console.log(response.data)
                if (response.data.statuscode!==200){
                        alert("Something went Wrong. Please Retry Previous question.")
                        setNum(num-1)
                    }
                    
                
                
                else{
                    const get_resp = await axios.get(url+"?question_no="+num+"&sapid="+sapid);
                    console.log(num)
                    setLoading(true);
                    if(get_resp.data.response===false){
                        alert("Exam Over. Thankyou")
                        navigate("/");
                    }
                    else{
                        setQuestion(get_resp.data.response.questions)
                        setOption_a(get_resp.data.response.optionA)
                        setOption_b(get_resp.data.response.optionB)
                        setOption_c(get_resp.data.response.optionC)
                        setOption_d(get_resp.data.response.optionD)
                        setQuestion_no(get_resp.data.response.question_no)
                        // setNum(question_no)

                        // setSapid(sapid)
                        await sleep(1000)
    
                        console.log(get_resp.data.response)
                        setPosts(get_resp.data.response)
                        console.log(posts)
                        // Closed the loading page
                        setLoading(false);
    
                    }
                }
            }
        else {
                const get_resp = await axios.get(url+"?question_no="+num+"&sapid="+sapid);
                console.log(num)
                setLoading(true);
                console.log(get_resp.data);
                if(get_resp.data.response.exam_done===true){
                    alert("Exam Over. Thankyou")
                    navigate("/")
                    
                }
                else{
                    setQuestion(get_resp.data.response.questions)
                    setOption_a(get_resp.data.response.optionA)
                    setOption_b(get_resp.data.response.optionB)
                    setOption_c(get_resp.data.response.optionC)
                    setOption_d(get_resp.data.response.optionD)
                    setQuestion_no(get_resp.data.response.question_no)
                    // setNum(question_no)
                    // setSapid(sapid)
                    await sleep(1000)

                    console.log(get_resp.data.response)
                    setPosts(get_resp.data.response)
                    console.log(posts)
                    // Closed the loading page
                    setLoading(false);

                }   
        }
    }

    // Call the function
    loadPost();
}, [num]);

async function check_face(){
    // console.log(webcamRef.current)
    if (webcamRef.current){
        if(webcamRef.current.state.hasUserMedia !== false){
            // const url='http://192.168.0.104:5000/capture'
        const url='http://172.20.10.2:5000/capture'

            const content={
                image:webcamRef.current.getScreenshot()
                }
            const response = await axios.post(url,content);
            // setPosts(response.data.response);
            console.log(response.data)
        }
        else{
            alert("No Webcam Access available.")
            navigate("/")
        }
    }
    
}



return (
    <>
        {loading ? (
            <h4 class="question">Loading Questions...</h4>) :
            (
      <Container fluid>
        <div className='login-form'>
          <div className="formCenter">
            <form className="formFields" onSubmit={(e)=>handleSubmit(e)}>
            <div className="formHeading">
              <Row>
                  <h1 class='login-form-heading'>Exam</h1>
              </Row>      
              </div>
              <div className="exam-web-cam" >
                <Webcam
                audio={false}
                height={100}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={175}
                videoConstraints={videoConstraints}
                />
            </div>
              {button && <div className="formField">

                All Content here 
              <button className="formFieldButton" onClick={()=>{setShow(!show)
                setButton(false)
                
                    setInterval(()=>{
                        check_face();
                    },1000) 
                    
      
            }
            }>
                {show ? "Start Exam":"Start Exam"}
              </button></div>}
              {show &&
              <div className="hiddenPage">
                <div className="studentId">
                    {sapid}
                </div>
                <div className="formQuestion">
                <Row>
                    <h4 class="question">{question_no}.  {question}</h4>
                </Row>
                </div>

                <div className="formOptions">
                    <Col>
                    <Row>
                        <label>
                        <input
                        className="options"
                            type="radio"
                            id="option_a"
                            value={option_a}
                            // checked={checked}
                            onChange={(e) => {handleInputChange(e)}}
                        />
                         {option_a}
                        </label>
                    </Row>         
                    <Row>
                        <label>
                        <input
                        className="options"
                            type="radio"
                            id="option_b"
                            value={option_b}
                            // checked={checked}
                            onChange={(e) => {handleInputChange(e)}}
                        />
                         {option_b}
                        </label>
                    </Row>   
                    <Row>
                        <label>
                        <input
                        className="options"
                            type="radio"
                            id="option_c"
                            value={option_c}
                            // checked={checked}
                            onChange={(e) => {handleInputChange(e)}}
                        />
                         {option_c}
                        </label>
                    </Row>   
                    <Row>
                        <label>
                        <input
                        className="options"
                            type="radio"
                            id="option_d"
                            value={option_d}
                            // checked={checked}
                            onChange={(e) => {handleInputChange(e)}}
                        />
                         {option_d}
                        </label>
                    </Row>   
                    </Col>
                    
                   
                </div>
                <div className="formField">
                  <button className="formFieldButton" >Next</button>
                </div>
                </div>
                
                }
            </form>
          </div>
        </div>
     
      </Container>
    )}
    </>
   )   ;
}

export default Exam;
