// import '../page-styles/Home.css'
import React from 'react';
import logo_vid from "./static/logo_vid.mp4"
import { useEffect, useRef,useState } from 'react';
const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export default function Home() {

    const ref = useRef(true);
    const [loading,setLoading]=useState(false)

    useEffect( () => {
      
      (async()=>{
        await sleep(1000)
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
            (
            <div className="home-page flex flex-row font-sans align-middle justify-center mx-auto h-[80vh] items-center space-x-10 p-20 ">
              <div className="logo_container flex justify-end transition ease-in-out">
                <video className="logo_vide transition ease-in-out rounded-full border-white border-solid border-2" src={logo_vid} width={300} autoPlay loop muted />
              </div>
              <div className="content_container flex justify-start text-white items-center text-[3.5vw] w-[50vw] transition ease-in-out">
                Online examination monitoring made simple!
              </div>
            </div>
        )
        }

    </>
    );
  }
