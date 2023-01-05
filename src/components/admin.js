import axios from "axios";
import React, { useState,useEffect,Component} from "react";

const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

class TableRow extends Component {
  render() {
      var row = this.props.row;
      return (
          <tr scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">
              {row.map(val => <td  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{val}</td>)}
          </tr>
      )
  }
}

function Admin() {

  const [loading,setLoading]=useState(false)
  const [internalloader,setInternalLoader]=useState(true)
  const [studentAnswers,setStudentAnswers]=useState(false)
  const [listOfStudents,setListOfStudents]=useState(false)
  const [getAllQuestions,setGetAllQuestions]=useState(false)
  const [addQuestions,setAddQuestions]=useState(false)
  
  const [tablebody,setTableBody]=useState('')
  const sapid=60002190091

  async function fetch_all_questions () {
    const url='http://192.168.0.100:8000/admin/questions'
    const resp= await axios.get(url+"?sapid="+sapid);
    setInternalLoader(true);
    // console.log(resp.data)
    await sleep(1000)
    if (resp.data.statuscode===200){
      alert(resp.data.response.status)
      const data=resp.data.response.questions
      setTableBody(data.slice(1))
      setInternalLoader(false)
    }
    else{
      setInternalLoader(false)
    }
  }
  async function fetch_all_student_answers () {
    const url='http://192.168.0.100:8000/admin/answers'
    const resp= await axios.get(url);
    setInternalLoader(true);
    console.log(resp.data)
    await sleep(1000)
    if (resp.data.statuscode===200){
      alert(resp.data.response.status)
      const data=resp.data.response.answers
      setTableBody(data.slice(1))
      setInternalLoader(false)
    }
    else{
      setInternalLoader(false)
    }
  }
  useEffect( () => {
    (async()=>{
      await sleep(500)
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
            <div className="page_heading flex justify-center align-start text-[#D61C4E] font-sans text-[3vw]">
                  Admin
            </div>
            <div className="get_all_questions flex my-5 flex-col container mx-auto w-[100vw] h-[1000vh]">
              <div className="sub_heading flex text-white text-[1.5vw] pt-5">
                All Questions
              </div>
              <hr className="py-2"></hr>
              <div className="get_all_questions flex flex-col justify-start transition duration-150 ease-in-out">
                <button className="flex justify-center px-1 py-1.5 w-[10vw] rounded text-white bg-[#D61C4E] hover:text-[#D61C4E] hover:bg-[white] " 
                onClick={async ()=>{
                  if(!getAllQuestions){
                    await setGetAllQuestions(!getAllQuestions);
                    await fetch_all_questions();
                    await setStudentAnswers(false);

                  }
                  else{
                    await setGetAllQuestions(!getAllQuestions);
                    await setInternalLoader(true)
                    

                  }
                  }}>
                    {!getAllQuestions?"Get all Questions":"Hide all Questions"}
                </button>
              </div>
                  {!getAllQuestions? (""
                  ):
                  (
                    internalloader?(
                      <div className="flex justify-center items-center align-middle h-[80vh] ">
                      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-[#D61C4E] transition ease-in-out" role="status">
                      </div>
                    </div>
                    ):
                  (
                    <>
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden rounded">
                                  <table className="min-w-full bg-[rgba(255,255,255,0.6)]">
                                    <thead className="">
                                      <tr>
                                        <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left w-[5vw]">Question No.</th>
                                        <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">Question</th>
                                        <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">Option A</th>
                                        <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">Option B</th>
                                        <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">Option C</th>
                                        <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">Option D</th>
                                        <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">Answer</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                        {tablebody.map(row => <TableRow row={row} />)}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div> 
                    </>
                  )
                )
                }
              <div className="sub_heading flex text-white text-[1.5vw] pt-5">
                Student Answers
              </div>
              <hr className="py-2"></hr>
              <div className="get_all_questions flex flex-col justify-start transition duration-150 ease-in-out">
                <button className="flex justify-center px-1 py-1.5 w-[10vw] rounded text-white bg-[#D61C4E] hover:text-[#D61C4E] hover:bg-[white] " 
                onClick={async ()=>{
                  if(!studentAnswers){
                    await setStudentAnswers(!studentAnswers);
                    await fetch_all_student_answers();
                    await setGetAllQuestions(false);

                  }
                  else{
                    await setStudentAnswers(!studentAnswers);
                    await setInternalLoader(true)
                    

                  }
                  }}>
                    {!studentAnswers?"Get all Answers":"Hide all Asnwers"}
                </button>
              </div>
                  {!studentAnswers? (""
                  ):
                  (
                    internalloader?(
                      <div className="flex justify-center items-center align-middle h-[80vh] ">
                      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-[#D61C4E] transition ease-in-out" role="status">
                      </div>
                    </div>
                    ):
                  (
                    <>
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden rounded">
                                  <table className="min-w-full bg-[rgba(255,255,255,0.6)]">
                                    <thead className="">
                                      <tr>
                                        <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left w-[10vw]">Question No.</th>
                                        <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">Student ID</th>
                                        <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">Answer</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                        {tablebody.map(row => <TableRow row={row} />)}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div> 
                    </>
                  )
                )
                }

            </div>
            </>
            )}
              {/* <select className="form-select appearance-none flex w-[20vw] px-3 py-1.5 text-base font-sans text-black bg-slate-300 bg-no-repeat border border-solid 
                border-gray-30 rounded transition ease-in-out focus:text-black focus:bg-slate-300 focus:border-none focus:outline-none" 
                aria-label="select">
                  <option selected>Select </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
              </select> */}
            </>
          
    );
  }


  
export default Admin;