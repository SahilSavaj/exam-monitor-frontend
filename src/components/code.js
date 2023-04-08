import React, { useState, useEffect } from "react";
// import '../page-styles/Forms.css
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg_img from "./static/bg.jpg";

const ip_url = process.env.REACT_APP_IP_ADDRESS;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));



const Code = () => {
	let [show, setShow] = useState(false);
	let [button, setButton] = useState(true);
	let [buffer, setbuffer] = useState(false);
	let [loading, setLoading] = useState(false);
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

	const handleSubmit = async (e) => {
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
								Code-instructions
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
												// fetch_question(1, false, e);
											}}
										>
											Start Coding
										</button>
									</div>
								</div>
							</div>
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
						<div className="py-20 text-white">
							<code-runner language="python"></code-runner>
							<script
								src="https://cdn.jsdelivr.net/gh/MarketingPipeline/Code-Runner-Web-Component@main/dist/code-runner-wc.min.js"
								defer
							></script>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Code;
