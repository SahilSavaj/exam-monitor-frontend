import React, { useState, useEffect } from "react";
// import '../page-styles/Forms.css
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg_img from "./static/bg.jpg";

const ip_url = process.env.REACT_APP_IP_ADDRESS;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Exam = () => {
	let [show, setShow] = useState(false);
	let [button, setButton] = useState(true);
	let [buffer, setbuffer] = useState(false);
	let [loading, setLoading] = useState(false);
	let [question_no, setQuestion_no] = useState(1);
	let [question, setQuestion] = useState("");
	let [option_a, setOption_a] = useState("");
	let [option_b, setOption_b] = useState("");
	let [option_c, setOption_c] = useState("");
	let [option_d, setOption_d] = useState("");
	let [ans, setAns] = useState("");
	let [message, setMessage] = useState("");

	let [counter, setCounter] = React.useState(null);
	const searchParams = new URLSearchParams(document.location.search);
	const sapid = searchParams.get("sapid");
	let navigate = useNavigate();

	const main_style = {
		background: `url(${bg_img})`,
		opacity: 0.5,
		width: "100vw",
		height: "100vh",
		objectfit: "cover",
	};

	const videoConstraints = {
		width: 1280,
		height: 720,
		facingMode: "user",
	};
	const webcamRef = React.useRef(null);

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		if (id === "option_a") {
			setAns(value);
			document.getElementById("option_b").checked = false;
			document.getElementById("option_c").checked = false;
			document.getElementById("option_d").checked = false;
		} else if (id === "option_b") {
			setAns(value);
			document.getElementById("option_a").checked = false;
			document.getElementById("option_c").checked = false;
			document.getElementById("option_d").checked = false;
		} else if (id === "option_c") {
			setAns(value);
			document.getElementById("option_a").checked = false;
			document.getElementById("option_b").checked = false;
			document.getElementById("option_d").checked = false;
		} else if (id === "option_d") {
			setAns(value);
			document.getElementById("option_a").checked = false;
			document.getElementById("option_b").checked = false;
			document.getElementById("option_c").checked = false;
		}
	};

	const handleSubmit = async (e) => {
		fetch_question(parseInt(question_no), true, e);
		clearAll(window);
	};

	function clearAll(windowObject) {
		let id = Math.max(
			windowObject.setInterval(noop, 1000),
			windowObject.setTimeout(noop, 1000)
		);
		while (id--) {
			windowObject.clearTimeout(id);
			windowObject.clearInterval(id);
		}
		function noop() {}
	}

	async function clear_all_options() {
		document.getElementById("option_a").checked = false;
		document.getElementById("option_b").checked = false;
		document.getElementById("option_c").checked = false;
		document.getElementById("option_d").checked = false;
	}

	async function fetch_question(question_no, submit, e) {
		setLoading(true);
		const url = ip_url + "/exam";
		if (submit) {
			const content = {
				question_no: question_no,
				sapid: sapid,
				ans: ans,
			};
			const response = await axios.post(url, content);
			if (response.data.statuscode !== 200) {
				alert("Something went Wrong. Please Retry Previous question.");
			} else {
				const get_resp = await axios.get(url + "?&sapid=" + sapid);
				setLoading(true);
				if (get_resp.data.response.exam_done === true) {
					alert("All questions are answered. Thankyou");
					clearAll(window);
					navigate("/");
				} else if (get_resp.data.statuscode === 404) {
					alert(get_resp.data.response);
					clearAll(window);
					navigate("/");
				} else {
					setQuestion(get_resp.data.response.question);
					setOption_a(get_resp.data.response.optionA);
					setOption_b(get_resp.data.response.optionB);
					setOption_c(get_resp.data.response.optionC);
					setOption_d(get_resp.data.response.optionD);
					setQuestion_no(get_resp.data.response.question_no);
					// await sleep(1000);
					clear_all_options();
					setAns("");
					setLoading(false);
					fetch_timer();

				}
			}
		} else {
			const get_resp = await axios.get(url + "?&sapid=" + sapid);
			setLoading(true);
			if (get_resp.data.response.exam_done === true) {
				alert(get_resp.data.response.message);
				clearAll(window);
				navigate("/");
			} else if (
				get_resp.data.statuscode === 404 ||
				get_resp.data.statuscode === 400
			) {
				alert(get_resp.data.response);
				clearAll(window);

				navigate("/");
			} else {
				setQuestion(get_resp.data.response.question);
				setOption_a(get_resp.data.response.optionA);
				setOption_b(get_resp.data.response.optionB);
				setOption_c(get_resp.data.response.optionC);
				setOption_d(get_resp.data.response.optionD);
				setQuestion_no(get_resp.data.response.question_no);
				await sleep(2000);
				setLoading(false);
				setAns("");
				clear_all_options();
				fetch_timer();
			}
		}
	}

	async function check_face() {
		if (webcamRef.current) {
			if (webcamRef.current.state.hasUserMedia != false) {
				const url = ip_url + "/capture";
				const content = {
					image: webcamRef.current.getScreenshot(),
				};
				const response = await axios.post(url, content);
				if (response.data.statuscode === 200) {
					setMessage(response.data.response);
				} else {
					alert(response.data.response);
				}
			} else {
				alert("No Webcam Access available.");
				navigate("/");
				clearAll(window);
				return false;
			}
		}
	}

	async function fetch_timer() {
		const url = ip_url + "/gettimer";
		const resp = await axios.get(url);
		if (resp.data.statuscode === 200) {
			if (resp.data.response.timer != 0) {
				setCounter(resp.data.response.timer);
			}
		}
	}

	useEffect(() => {
		(async () => {
			await sleep(1000);
			setbuffer(true);
		})();
	}, []);

	const calculateTimeLeft = () => {
		let difference = counter - 1;
		return difference;
	};

	useEffect(() => {
		if (document.readyState === "complete") {
			if (counter && counter > 0) {
				setTimeout(async () => {
					setCounter(calculateTimeLeft());
					await check_face();
				}, 1000);
			} else if (counter === 0 || counter < 0) {
				handleSubmit();
			}
		}
	}, [counter]);

	// document.addEventListener('contextmenu', event => event.preventDefault());

	return (
		<div id="exam" style={!window.fullScreen ? { hsh: "asd" } : main_style}>
			{!buffer ? (
				<div className="flex justify-center items-center align-middle h-[80vh]">
					<div
						className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-[#D61C4E]"
						role="status"
					></div>
				</div>
			) : (
				<>
					{button && (
						<>
							<div className="page_heading flex justify-center align-start text-[#D61C4E] font-sans text-[2vw]">
								Exam-instructions
							</div>
							<div className="page_heading flex justify-center align-start text-[white] font-sans text-[1vw] space-y-5 py-5">
								<ul className="space-y-3 list-disc">
									<li>You must use a functioning webcam and microphone</li>
									<li>
										No cell phones or other secondary devices in the room or
										test area
									</li>
									<li>
										Your desk/table must be clear or any materials except your
										test-taking device
									</li>
									<li>No one else can be in the room with you</li>
									<li>No talking </li>
									<li>
										The testing room must be well-lit and you must be clearly
										visible
									</li>
									<li>No dual screens/monitors</li>
									<li>Do not leave the camera </li>
									<li>No use of additional applications or internet</li>
								</ul>
							</div>
							<div className="note flex justify-center text-zinc-400 pb-10">
								*Please ensure that your face is perfectly visible. Check your
								camera feed on bottom left of the page.
							</div>
							<div className="start-exam-butn">
								<div className="form-group mb-6">
									<div className="submit_button flex align-middle text-white justify-center space-x-2 items-center text-xl p-t-5">
										<button
											className="formFieldLink t-md hover:text-[#D61C4E] transition ease-in-out bg-[#D61C4E] px-10 py-1.5 rounded-lg hover:bg-white"
											onClick={(e) => {
												// openFullscreen()

												setShow(!show);
												setButton(false);
												fetch_question(1, false, e);
											}}
										>
											Start Exam
										</button>
									</div>
								</div>
							</div>
							{/* <div className="absolute right-3 top-[10vh]" >
                <Webcam className="border-white rounded-lg"
                audio={false}
                height={100}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={175}
                videoConstraints={videoConstraints}
                />
              </div> */}
						</>
					)}
				</>
			)}
			<div className="sapid-display absolute right-2 top-0 text-white font-sans p-2">
				SapID - {sapid}
			</div>
			<div className="absolute right-3 top-[10vh] text-center grid">
				<Webcam
					className="border-white rounded-lg m-2"
					audio={false}
					height={100}
					ref={webcamRef}
					screenshotFormat="image/jpeg"
					width={175}
					videoConstraints={videoConstraints}
				/>
				<span className="camera_message text-white">{message}</span>
				<span className="timer_messange text-white" id="timer">
					{counter}
				</span>
			</div>
			{button ? (
				<></>
			) : (
				<div>
					{loading ? (
						<div className="flex justify-center items-center align-middle h-[80vh]">
							<div
								className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-[#D61C4E]"
								role="status"
							></div>
						</div>
					) : (
						<div className="py-20">
							<div className="page_heading flex justify-center align-start text-[#D61C4E] font-sans text-[2vw]">
								Questions
							</div>
							<form className="flex felx-col justify-center align-middle items-center">
								<div className="question_form w-[90vw] py-20">
									<div className="question flex justify-start text-white text-[1.5vw] p-2 ">
										{question_no}. {question}
									</div>
									<div className="options flex justify-start flex-col text-white text-[1.5vw] p-2 pl-8 space-y-2">
										<div className="form-check">
											<label className="">
												<input
													className="form-check-input appearance-none rounded-full h-3 w-3 border border-gray-300
                            bg-white checked:border-[#D61C4E] focus:outline-none  bg-no-repeat bg-center 
                            bg-contain mr-2 cursor-pointer checked:bg-[#D61C4E]"
													type="radio"
													id="option_a"
													value={option_a}
													onChange={(e) => {
														handleInputChange(e);
													}}
												/>
												{option_a}
											</label>
										</div>
										<div className="form-check">
											<label className="">
												<input
													className="form-check-input appearance-none rounded-full h-3 w-3 border border-gray-300
                            bg-white checked:border-[#D61C4E] focus:outline-none  bg-no-repeat bg-center 
                            bg-contain mr-2 cursor-pointer checked:bg-[#D61C4E]"
													type="radio"
													id="option_b"
													value={option_b}
													onChange={(e) => {
														handleInputChange(e);
													}}
												/>
												{option_b}
											</label>
										</div>
										<div className="form-check">
											<label className="">
												<input
													className="form-check-input appearance-none rounded-full h-3 w-3 border border-gray-300
                            bg-white checked:border-[#D61C4E] focus:outline-none  bg-no-repeat bg-center 
                            bg-contain mr-2 cursor-pointer checked:bg-[#D61C4E]"
													type="radio"
													id="option_c"
													value={option_c}
													onChange={(e) => {
														handleInputChange(e);
													}}
												/>
												{option_c}
											</label>
										</div>
										<div className="form-check">
											<label className="">
												<input
													className="form-check-input appearance-none rounded-full h-3 w-3 border border-gray-300
                            bg-white checked:border-[#D61C4E] focus:outline-none  bg-no-repeat bg-center 
                            bg-contain mr-2 cursor-pointer checked:bg-[#D61C4E]"
													type="radio"
													id="option_d"
													value={option_d}
													onChange={(e) => {
														handleInputChange(e);
													}}
												/>
												{option_d}
											</label>
										</div>
									</div>
									<div className="action_buttons flex py-20 space-x-10">
										<div className="clear_all_butn">
											<button
												type="button"
												className="formFieldLink text-[#D61C4E] hover:text-[white] transition ease-in-out bg-[white] w-[7vw] py-1.5 rounded-lg hover:bg-[#D61C4E]"
												onClick={() => {
													clear_all_options();
												}}
											>
												Clear All
											</button>
										</div>
										<div className="submit_butn">
											<button
												type="button"
												className="formFieldLink text-white hover:text-[#D61C4E] transition ease-in-out bg-[#D61C4E] w-[7vw] py-1.5 rounded-lg hover:bg-white"
												onClick={() => handleSubmit()}
											>
												{question ? "Next" : "Submit"}
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Exam;
