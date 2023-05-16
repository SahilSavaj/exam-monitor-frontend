import axios from "axios";
import React, { useState, useEffect, Component } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
const customStyles = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	  width:"70%",
	},
  };

//   Modal.setAppElement('#theorypdf');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ip_url = process.env.REACT_APP_IP_ADDRESS;
const searchParams = new URLSearchParams(document.location.search);
const admin_id = searchParams.get("admin_id");




function Admin() {
	let navigate = useNavigate();

	const input_style = {
		borderBottom: "1px solid #445366",
	};

	const header_style = {
		border: "1px solid #000000",
	};

	const [loading, setLoading] = useState(false);
	const [questions_internalloader, setQuestions_internalloader] = useState(true);
	const [student_marks_internalloader, setStudentMarks_internalloader] = useState(true);
	const [answers_internalloader, setAnswers_internalloader] = useState(true);
	const [subjective_internalloader, setSubjective_internalloader] = useState(true);

	const [timer_internalloader, setTimer_internalloader] = useState(true);
	const [marks_internalloader, setMarks_internalloader] = useState(true);
	const [theorymarks_internalloader, setThoeryMarks_internalloader] = useState(true);
	const [studentAnswers, setStudentAnswers] = useState(false);
	const [listOfStudents, setListOfStudents] = useState(false);
	const [getAllQuestions, setGetAllQuestions] = useState(false);
	const [getSubjectiveAns, setGetSubjectiveAns] = useState(false);

	const [addQuestions, setAddQuestions] = useState(false);
	const [tablebody, setTableBody] = useState("");
	const sapid = 60002190091;

	const [question, setQuestion] = useState("");
	const [option_a, setOption_a] = useState("");
	const [option_b, setOption_b] = useState("");
	const [option_c, setOption_c] = useState("");
	const [option_d, setOption_d] = useState("");
	const [answer, setAnswer] = useState("");

	const [timer, setTimer] = useState("");
	const [marksconfig, setMarksConfig] = useState("");
	const [theorymarksconfig, setTheoryMarksConfig] = useState();

	const [file, setFile] = useState();
	const [fileType, setFileType] = useState("");


	let subtitle;
	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = '#f00';
	}

	function closeModal() {
		setIsOpen(false);
	}
	const handleInputChange = (e) => {
		const { id, value } = e.target;
		// console.log()
		if (id === "question") {
			setQuestion(value);
		}
		if (id === "option_a") {
			setOption_a(value);
		}
		if (id === "option_b") {
			setOption_b(value);
		}
		if (id === "option_c") {
			setOption_c(value);
		}
		if (id === "option_d") {
			setOption_d(value);
		}
		if (id === "answer") {
			setAnswer(value);
		}
		if (id === "timer") {
			setTimer(value);
		}
		if (id === "marksconfig") {
			setMarksConfig(value);
		}
		if (id == 'theorymarksconfig') {
			setTheoryMarksConfig(value)
		}
	};

	class TableRowQuestions extends Component {
		render() {
			let row = this.props.row;
			// console.log(row)
			return (
				<tr
					scope="col"
					className="text-md text-gray-900 px-6 py-4 text-center"
					id={row[0]}
					key={row[0]}
				>
					{row.map((currElement, index) => (
						<td
							className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
							style={{ border: "1px solid black" }}
							key={index}
						>
							{currElement}{" "}
						</td>
					))}
					<td
						className="px-6 whitespace-nowrap text-sm text-blue-900"
						style={{ border: "1px solid black" }}
					>
						{" "}
						<button className="bg-sky-300 rounded-full w-[50px] p-1 hover:bg-white hover:text-sky-500">
							Edit
						</button>
					</td>
					<td
						className="px-6 whitespace-nowrap text-sm text-red-900"
						style={{ border: "1px solid black" }}
					>
						{" "}
						<button
							className="bg-rose-300 rounded-full w-[70px] p-1 hover:bg-white hover:text-red-500"
							onClick={(e) => deleteQuestion(e, row[0])}
						>
							Delete
						</button>
					</td>
				</tr>
			);
		}
	}

	class TableRowAnswers extends Component {
		render() {
			let row = this.props.row;
			return (
				<tr scope="col" className="text-md text-gray-900 px-6 py-4 text-center">
					{row.map((currElement, index) => (
						<td
							className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
							style={{ border: "1px solid black" }}
							key={index}
						>
							{currElement}
						</td>
					))}
				</tr>
			);
		}
	}

	class TableRowMarks extends Component {
		render() {
			let row = this.props.row;
			return (
				<tr scope="col" className="text-md text-gray-900 px-6 py-4 text-center">
					{row.map((currElement, index) => (
						<td
							className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
							style={{ border: "1px solid black" }}
							key={index}
						>
							{currElement}
						</td>
					))}
				</tr>
			);
		}
	}

	class TableRowStudents extends Component {
		render() {
			let row = this.props.row;
			console.log(row)
			return (
				<tr scope="col" key={row.id} className="text-md text-gray-900 px-6 py-4 text-center">
					<td
						className="text-sm text-gray-900 "
						style={{ border: "1px solid black" }}
					>
						<img src={row.image} className="mx-auto" width={110}></img>
					</td>
					<td
						className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
						style={{ border: "1px solid black" }}
					>
						{row.name}
					</td>
					<td
						className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
						style={{ border: "1px solid black" }}
					>
						{row.sapid}
					</td>
					<td
						className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
						style={{ border: "1px solid black" }}
					>
						<button className="flex justify-center px-1 py-1.5 w-fit mx-auto rounded text-white bg-[#D61C4E] hover:text-[#D61C4E] hover:bg-[white] "
						onClick={()=>{
							openModal()
						}}>Show Pdf</button>
						{/* {row.subjectivepdf} */}
						<Modal
							id={"modal_"+row.sapid}
							isOpen={modalIsOpen}
							onAfterOpen={afterOpenModal}
							onRequestClose={closeModal}
							style={customStyles}
							contentLabel="Theory Answer"
						>	
							<iframe src={row.subjectivepdf} width="100%" height="800px" style={{ "object-fit": "cover" }} />
							<button className="flex justify-center px-1 py-1.5 w-fit mx-auto rounded text-white bg-[#D61C4E] hover:text-[#D61C4E] hover:bg-[white] my-2 "
						onClick={()=>{
							closeModal()

						}}> Close</button>
						</Modal>
					</td>
					<td
						className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
						style={{ border: "1px solid black" }}
					>
						{row.objectivemarks}
					</td>
					<td
						className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
						style={{ border: "1px solid black" }}
					>
						{row.subjectivemarks}
					</td>
					<td
						className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
						style={{ border: "1px solid black" }}
					>
						{row.totalmarks}
					</td>
	
				</tr>
			);
		}
	}


	async function fetch_all_questions(alert_flag) {
		setQuestions_internalloader(true);
		const searchParams = new URLSearchParams(document.location.search);
		const admin_id = searchParams.get("admin_id");
		const url = ip_url + "/admin/questions";
		const resp = await axios.get(
			url + "?sapid=" + sapid + "&admin_id=" + admin_id
		);
		// console.log(resp.data)
		await sleep(1000);
		if (resp.data.statuscode === 200) {
			if (alert_flag) {
				alert(resp.data.response.status);
			}
			const data = resp.data.response.questions;

			setTableBody(data.slice(1));
			setQuestions_internalloader(false);
		} else {
			setGetAllQuestions(false);
			setQuestions_internalloader(false);
		}
	}

	async function fetch_all_student_answers() {
		setAnswers_internalloader(true);
		const searchParams = new URLSearchParams(document.location.search);
		const admin_id = searchParams.get("admin_id");
		const url = ip_url + "/admin/answers";
		const resp = await axios.get(url + "?admin_id=" + admin_id);
		console.log(resp.data);
		await sleep(1000);
		if (resp.data.statuscode === 200) {
			alert(resp.data.response.status);
			const data = resp.data.response.answers;
			if (data) {
				console.log("a,bsda,sbnd,a");
				console.log(data.slice(1));
				setTableBody(data.slice(1));
				setAnswers_internalloader(false);
			} else {
				setStudentAnswers(false);
				setAnswers_internalloader(false);
			}
		} else {
			setStudentAnswers(false);
			setAnswers_internalloader(false);
		}
	}

	async function fetch_student_marks() {
		setStudentMarks_internalloader(true);
		const searchParams = new URLSearchParams(document.location.search);
		const admin_id = searchParams.get("admin_id");
		const url = ip_url + "/admin/students";
		const resp = await axios.get(url + "?admin_id=" + admin_id);
		console.log(resp.data);
		await sleep(1000);
		if (resp.data.statuscode === 200) {
			alert(resp.data.response.status);
			const data = resp.data.response.students;
			if (data) {
				console.log(data);
				setTableBody(data);
				setStudentMarks_internalloader(false);
			} else {
				setListOfStudents(false);
				setStudentMarks_internalloader(false);
			}
		} else {
			setListOfStudents(false);
			setStudentMarks_internalloader(false);
		}
	}

	async function deleteQuestion(e, to_delete_question_no) {
		e.preventDefault();
		console.log(to_delete_question_no);
		setQuestions_internalloader(true);
		// await sleep(2000)
		const searchParams = new URLSearchParams(document.location.search);
		const admin_id = searchParams.get("admin_id");
		const url = ip_url + "/admin/deletequestion";
		const content = {
			to_delete_question_no: to_delete_question_no,
			admin_id: admin_id,
		};
		const resp = await axios.post(url, content);
		console.log(resp.data);
		await sleep(1000);
		alert(resp.data.response);
		setQuestions_internalloader(false);
		await fetch_all_questions(false);
	}

	async function handleSubmit(e) {
		setGetAllQuestions(false);
		setStudentAnswers(false);
		e.preventDefault();
		const searchParams = new URLSearchParams(document.location.search);
		const admin_id = searchParams.get("admin_id");
		let content = {
			questions: question,
			optionA: option_a,
			optionB: option_b,
			optionC: option_c,
			optionD: option_d,
			answer: answer,
			admin_id: admin_id,
		};
		console.log(content);
		const url = ip_url + "/admin/addquestion";
		await axios
			.post(url, content)
			.then((response) => {
				console.log(response.data);
				if (response.data.statuscode === 200) {
					alert(response.data.response);
					// navigate(
					//   {
					//     pathname: '/admin',
					//     search: '?admin_id='+response.data.response.admin_id
					//   })
				} else {
					alert(response.data.response);
					navigate("/admin", { admin_id: admin_id });
				}
			})
			.catch((error) => {
				console.error("There was an error!", error);
			});
	}



	const handleFileChange = async (e) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
			setFileType(e.target.files[0].type)
		}
	};

	async function handleFileUpload(e) {
		console.log(fileType, file)
		setGetAllQuestions(false);
		setStudentAnswers(false);
		e.preventDefault();
		const searchParams = new URLSearchParams(document.location.search);
		const admin_id = searchParams.get("admin_id");
		let headers = {
			"Content-type": "application/json",
			"admin-id": admin_id,
			'file-type': fileType
		};
		let data = new FormData();
		if (fileType === "application/pdf") {
			const convertBase64 = (file) => {
				return new Promise((resolve, reject) => {
					const fileReader = new FileReader();
					fileReader.readAsDataURL(file)
					fileReader.onload = () => {
						resolve(fileReader.result);
					}
					fileReader.onerror = (error) => {
						reject(error);
					}
				})
			}
			const base64 = await convertBase64(file)
			console.log(base64)
			const data = {
				"pdf": base64
			}
			const url = ip_url + "/admin/addquestion/pdffile";
			const resp = await axios.post(url, data, { headers });
			console.log(resp.data);
			if (resp.data.statuscode === 200) {
				alert(resp.data.response);
			} else {
				alert(resp.data.response);
				navigate("/admin", { admin_id: admin_id });
			}
		}
		else {
			data.append("data", file); console.log(data)
			const url = ip_url + "/admin/addquestion/file";

			// data.append("data", base64); console.log(data)
			const resp = await axios.post(url, data, { headers });
			console.log(resp.data);
			if (resp.data.statuscode === 200) {
				alert(resp.data.response);
			} else {
				alert(resp.data.response);
				navigate("/admin", { admin_id: admin_id });
			}
		}



	}

	async function updateTimer(e) {
		e.preventDefault();
		await setTimer_internalloader(false);
		console.log(timer);
		const searchParams = new URLSearchParams(document.location.search);
		const admin_id = searchParams.get("admin_id");
		let content = {
			admin_id: admin_id,
			timer: timer,
		};
		console.log(content);
		const url = ip_url + "/admin/settimer";
		await axios
			.post(url, content)
			.then((response) => {
				console.log(response.data);
				if (response.data.statuscode === 200) {
					alert(response.data.response);
					// setTimer(timer)
					setTimer_internalloader(true);
				} else {
					alert(response.data.response);
					navigate("/admin", { admin_id: admin_id });
				}
			})
			.catch((error) => {
				console.error("There was an error!", error);
			});
	}

	async function updateAllmarks(e) {
		e.preventDefault();
		setMarks_internalloader(false);
		console.log(marksconfig);
		const searchParams = new URLSearchParams(document.location.search);
		const admin_id = searchParams.get("admin_id");
		let content = {
			admin_id: admin_id,
			marks: marksconfig,
		};
		console.log(content);
		const url = ip_url + "/admin/seteachmarks";
		await axios
			.post(url, content)
			.then((response) => {
				console.log(response.data);
				if (response.data.statuscode === 200) {
					alert(response.data.response);
					// setTimer(timer)
					setMarks_internalloader(true);
				} else {
					alert(response.data.response);
					navigate("/admin", { admin_id: admin_id });
				}
			})
			.catch((error) => {
				console.error("There was an error!", error);
			});
	}

	async function updateTheorymarks(e) {
		e.preventDefault();
		setThoeryMarks_internalloader(false);
		console.log(marksconfig);
		const searchParams = new URLSearchParams(document.location.search);
		const admin_id = searchParams.get("admin_id");
		let content = {
			admin_id: admin_id,
			marks: theorymarksconfig,
		};
		console.log(content);
		const url = ip_url + "/admin/settheorymarks";
		await axios
			.post(url, content)
			.then((response) => {
				console.log(response.data);
				if (response.data.statuscode === 200) {
					alert(response.data.response);
					// setTimer(timer)
					setThoeryMarks_internalloader(true);
				} else {
					alert(response.data.response);
					navigate("/admin", { admin_id: admin_id });
				}
			})
			.catch((error) => {
				console.error("There was an error!", error);
			});
	}

	useEffect(() => {
		(async () => {
			await sleep(1000);
			const searchParams = new URLSearchParams(document.location.search);
			const admin_id = searchParams.get("admin_id");
			// console.log(admin_id)
			if (admin_id) {
				const url = ip_url + "/admin";
				const get_resp = await axios.get(url + "?admin_id=" + admin_id);
				// console.log(get_resp.data.response)
				if (get_resp.data.statuscode === 200) {
					// alert(get_resp.data.response)
					setLoading(true);
					setTimer(get_resp.data.response.timer);
					if (get_resp.data.response.is_common_marks === true) {
						setMarksConfig(get_resp.data.response.marks)
						setTheoryMarksConfig(get_resp.data.response.theorymarks)
					}

				} else {
					alert(get_resp.data.response);
					navigate("/");
				}
			} else {
				alert("Invalid Access");
				navigate("/");
			}
			// setLoading(true)
		})();
	}, []);

	return (
		<div className="" id="admin">
			{!loading ? (
				<div className="flex justify-center items-center align-middle h-[100vh]">
					<div
						className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-[#D61C4E] transition ease-in-out"
						role="status"
					></div>
				</div>
			) : (
				<>
					<div className="page_heading flex justify-center align-start text-[#D61C4E] font-sans text-[3vw]">
						Admin
					</div>
					<div className="main_content flex my-10 flex-col container mx-auto w-[100vw] h-[fit-content] space-y-5">
						<div className="configs flex flex-col justify-start space-y-5">
							<div className="timer-content flex flex-row align-middle space-x-5 items-center">
								<div className="timer_settings text-[1.5vw] text-white hover:cursor-default">
									Timer for each question -
								</div>
								<div className="timer_display space-x-1 flex flex-row py-1.5">
									<input
										className="timer w-[4vw] bg-white h-8 text-white text-lg p-2 placeholder:text-white bg-transparent"
										style={input_style}
										type="number"
										name="timer"
										id="timer"
										value={timer}
										placeholder={timer}
										onChange={(e) => handleInputChange(e)}
									></input>
									<span className="text-[1.2vw] text-white hover:cursor-default">
										secs
									</span>
								</div>

								<button
									className="flex w-[fit-content] align-middle py-1.5 px-5 text-lg rounded text-white bg-[#D61C4E] hover:text-[#D61C4E] hover:bg-[white]"
									onClick={(e) => updateTimer(e)}
								>
									Change
								</button>
								{!timer_internalloader ? (
									<div className="flex justify-center items-center align-middle">
										<div
											className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full text-[#D61C4E] transition ease-in-out"
											role="status"
										></div>
									</div>
								) : (
									""
								)}
							</div>
							<div className="marks-content flex flex-row align-middle space-x-5 items-center">
								<div className="marks_settings text-[1.5vw] text-white hover:cursor-default">
									Marks for each question -
								</div>
								<div className="marks_display space-x-1 flex flex-row py-1.5">
									<input
										className="marks w-[4vw] bg-white h-8 text-white text-lg p-2 placeholder:text-white bg-transparent"
										style={input_style}
										type="number"
										name="marksconfig"
										id="marksconfig"
										value={marksconfig}
										placeholder={marksconfig}
										onChange={(e) => handleInputChange(e)}
									></input>
									<span className="text-[1.2vw] text-white hover:cursor-default">
										mks
									</span>
								</div>

								<button
									className="flex w-[fit-content] align-middle py-1.5 px-5 text-lg rounded text-white bg-[#D61C4E] hover:text-[#D61C4E] hover:bg-[white]"
									onClick={(e) => updateAllmarks(e)}
								>
									Change
								</button>
								{!marks_internalloader ? (
									<div className="flex justify-center items-center align-middle">
										<div
											className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full text-[#D61C4E] transition ease-in-out"
											role="status"
										></div>
									</div>
								) : (
									""
								)}
							</div>
							<div className="marks-content flex flex-row align-middle space-x-5 items-center">
								<div className="marks_settings text-[1.5vw] text-white hover:cursor-default">
									Marks for Theory question -
								</div>
								<div className="marks_display space-x-1 flex flex-row py-1.5">
									<input
										className="marks w-[4vw] bg-white h-8 text-white text-lg p-2 placeholder:text-white bg-transparent"
										style={input_style}
										type="number"
										name="theorymarksconfig"
										id="theorymarksconfig"
										value={theorymarksconfig}
										placeholder={theorymarksconfig}
										onChange={(e) => handleInputChange(e)}
									></input>
									<span className="text-[1.2vw] text-white hover:cursor-default">
										mks
									</span>
								</div>

								<button
									className="flex w-[fit-content] align-middle py-1.5 px-5 text-lg rounded text-white bg-[#D61C4E] hover:text-[#D61C4E] hover:bg-[white]"
									onClick={(e) => updateTheorymarks(e)}
								>
									Change
								</button>
								{!theorymarks_internalloader ? (
									<div className="flex justify-center items-center align-middle">
										<div
											className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full text-[#D61C4E] transition ease-in-out"
											role="status"
										></div>
									</div>
								) : (
									""
								)}
							</div>
						</div>

						<div className="all_questions">
							<div className="sub_heading flex text-white text-[1.5vw]">
								All Questions
							</div>
							<hr className="py-2"></hr>
							<div className="get_all_questions flex flex-col justify-start transition duration-150 ease-in-out">
								<button
									className="flex justify-center px-1 py-1.5 w-[10vw] rounded text-white bg-[#D61C4E] hover:text-[#D61C4E] hover:bg-[white] "
									onClick={async () => {
										if (!getAllQuestions) {
											setGetAllQuestions(!getAllQuestions);
											await fetch_all_questions(true);
											setStudentAnswers(false);
											setListOfStudents(false);
										} else {
											setGetAllQuestions(!getAllQuestions);
											setQuestions_internalloader(true);
										}
									}}
								>
									{!getAllQuestions
										? "Get all Questions"
										: "Hide all Questions"}
								</button>
							</div>
							{!getAllQuestions ? (
								""
							) : questions_internalloader ? (
								<div className="flex justify-center items-center align-middle h-[80vh] ">
									<div
										className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-[#D61C4E] transition ease-in-out"
										role="status"
									></div>
								</div>
							) : (
								<>
									<div className="flex flex-col">
										<div className="overflow-auto">
											<div className="py-2 inline-block min-w-fit">
												<div className="overflow-auto max-h-[50vh]">
													<table className="min-w-fit bg-[rgba(255,255,255,0.6)] table-auto border-black rounded-lg">
														<thead className="">
															<tr className="uppercase">
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center w-[1vw] font-extrabold"
																	style={header_style}
																>
																	Question No.
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Question
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Option A
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Option B
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Option C
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Option D
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Answer
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Edit
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Delete
																</th>
															</tr>
														</thead>
														<tbody>
															{tablebody.map((row) => (
																<TableRowQuestions row={row} key={row[0]} />
															))}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</>
							)}
						</div>

						<div className="student_marks">
							<div className="sub_heading flex text-white text-[1.5vw] pt-5">
								Student Marks
							</div>
							<hr className="py-2"></hr>
							<div className="get_student_marks flex flex-col justify-start transition duration-150 ease-in-out">
								<button
									className="flex justify-center px-1 py-1.5 w-[10vw] rounded text-white bg-[#D61C4E] hover:text-[#D61C4E] hover:bg-[white] "
									onClick={async () => {
										if (!listOfStudents) {
											setListOfStudents(!listOfStudents);
											await fetch_student_marks();
											setStudentAnswers(false);
											setGetAllQuestions(false);

										} else {
											setListOfStudents(!listOfStudents);
											setStudentMarks_internalloader(true);
										}
									}}
								>
									{!listOfStudents
										? "Get all Marks"
										: "Hide all Marks"}
								</button>
							</div>
							{!listOfStudents ? (
								""
							) : student_marks_internalloader ? (
								<div className="flex justify-center items-center align-middle h-[80vh] ">
									<div
										className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-[#D61C4E] transition ease-in-out"
										role="status"
									></div>
								</div>
							) : (
								<>
									<div className="flex flex-col">
										<div className="overflow-auto">
											<div className="py-2 inline-block min-w-fit">
												<div className="overflow-auto max-h-[50vh]">
													<table className="min-w-fit bg-[rgba(255,255,255,0.6)] table-auto border-black rounded-lg">
														<thead className="">
															<tr className="uppercase">
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Photo
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center w-[1vw] font-extrabold"
																	style={header_style}
																>
																	Student Name
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Sapid
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Subjective PDF
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Objective Marks
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Subjective Marks

																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Total Marks
																</th>
															</tr>
														</thead>
														<tbody>
															{tablebody.map((row) => (
																<TableRowStudents row={row} key={row[0]} />
															))}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</>
							)}
						</div>

						<div className="Student-answers">
							<div className="sub_heading flex text-white text-[1.5vw] pt-5">
								Student Answers
							</div>
							<hr className="py-2"></hr>
							<div className="get_all_questions flex flex-col justify-start transition duration-150 ease-in-out">
								<button
									className="flex justify-center px-1 py-1.5 w-[10vw] rounded text-white bg-[#D61C4E] hover:text-[#D61C4E] hover:bg-[white] "
									onClick={async () => {
										if (!studentAnswers) {
											setStudentAnswers(!studentAnswers);
											await fetch_all_student_answers();
											setGetAllQuestions(false);
											setListOfStudents(false);
										} else {
											setStudentAnswers(!studentAnswers);
											setAnswers_internalloader(true);
										}
									}}
								>
									{!studentAnswers ? "Get all Answers" : "Hide all Answers"}
								</button>
							</div>
							{!studentAnswers ? (
								""
							) : answers_internalloader ? (
								<div className="flex justify-center items-center align-middle h-[80vh] ">
									<div
										className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-[#D61C4E] transition ease-in-out"
										role="status"
									></div>
								</div>
							) : (
								<>
									<div className="flex flex-col">
										<div className="overflow-auto ">
											<div className="py-2 inline-block min-w-fit">
												<div className="overflow-auto max-h-[50vh]">
													<table className="min-w-fit bg-[rgba(255,255,255,0.6)] rounded-lg">
														<thead className="">
															<tr>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-left w-[10vw] font-extrabold"
																	style={header_style}
																>
																	Question No.
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Student ID
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Answer
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Result
																</th>
																<th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Correct Answer
																</th>
																{/* <th
																	scope="col"
																	className="text-md text-gray-900 px-6 py-4 text-center font-extrabold"
																	style={header_style}
																>
																	Total Marks
																</th> */}
															</tr>
														</thead>
														<tbody>
															{console.log(tablebody)}
															{tablebody.map((row) => (
																<TableRowAnswers row={row} key={row[0]} />
															))}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</>
							)}
						</div>

						<div className="add_questions ">
							<div className="sub_heading flex text-white text-[1.5vw] pt-5">
								Add Questions
							</div>
							<hr className="py-2"></hr>
							<div className="AddQuestions_main_frame flex flex-row space-x-1 justify-center">
								<div className="add_questions_form flex flex-col justify-start transition duration-150 ease-in-out text-[1vw]">
									<form className="w-[100%]" onSubmit={(e) => handleSubmit(e)}>
										<div className="subheading text-white text-[1.3vw] py-5 flex justify-center">
											Single Question
										</div>
										<div className="form-group mb-6">
											<div className="input_field flex align-middle text-white justify-start space-x-2 items-center text-lg ">
												<label className="w-[6vw]">Question :</label>
												<input
													className="form-control border-solid pl-3 py-1.5 w-[30vw] col-span-10 m-0 bg-transparent 
                    									transition ease-in-out text-base focus:text-white focus:bg-transparent focus:border-black focus:outline-none focus:rounded"
													style={input_style}
													type="text"
													id="question"
													placeholder="Enter the question"
													name="question"
													onChange={(e) => handleInputChange(e)}
												></input>
											</div>
										</div>
										<div className="form-group mb-6">
											<div className="input_field flex align-middle text-white justify-start space-x-2 items-center text-lg ">
												<label className="w-[6vw]">Option A :</label>
												<input
													className="form-control border-solid pl-3 py-1.5 w-[30vw] col-span-10 m-0 bg-transparent 
														transition ease-in-out text-base focus:text-white focus:bg-transparent focus:border-black focus:outline-none focus:rounded"
													style={input_style}
													type="text"
													id="option_a"
													placeholder="Enter option A"
													name="option_a"
													onChange={(e) => handleInputChange(e)}
												></input>
											</div>
										</div>
										<div className="form-group mb-6">
											<div className="input_field flex align-middle text-white justify-start space-x-2 items-center text-lg ">
												<label className="w-[6vw]">Option B :</label>
												<input
													className="form-control border-solid pl-3 py-1.5 w-[30vw] col-span-10 m-0 bg-transparent 
														transition ease-in-out text-base focus:text-white focus:bg-transparent focus:border-black focus:outline-none focus:rounded"
													style={input_style}
													type="text"
													id="option_b"
													placeholder="Enter option B"
													name="option_b"
													onChange={(e) => handleInputChange(e)}
												></input>
											</div>
										</div>
										<div className="form-group mb-6">
											<div className="input_field flex align-middle text-white justify-start space-x-2 items-center text-lg ">
												<label className="w-[6vw]">Option C :</label>
												<input
													className="form-control border-solid pl-3 py-1.5 w-[30vw] col-span-10 m-0 bg-transparent 
														transition ease-in-out text-base focus:text-white focus:bg-transparent focus:border-black focus:outline-none focus:rounded"
													style={input_style}
													type="text"
													id="option_c"
													placeholder="Enter option C"
													name="option_c"
													onChange={(e) => handleInputChange(e)}
												></input>
											</div>
										</div>
										<div className="form-group mb-6">
											<div className="input_field flex align-middle text-white justify-start space-x-2 items-center text-lg ">
												<label className="w-[6vw]">Option D :</label>
												<input
													className="form-control border-solid pl-3 py-1.5 w-[30vw] col-span-10 m-0 bg-transparent 
														transition ease-in-out text-base focus:text-white focus:bg-transparent focus:border-black focus:outline-none focus:rounded"
													style={input_style}
													type="text"
													id="option_d"
													placeholder="Enter option D"
													name="option_d"
													onChange={(e) => handleInputChange(e)}
												></input>
											</div>
										</div>
										<div className="form-group mb-6">
											<div className="input_field flex align-middle text-white justify-start space-x-2 items-center text-lg ">
												<label className="w-[6vw]">Answer :</label>
												<input
													className="form-control border-solid pl-3 py-1.5 w-[30vw] col-span-10 m-0 bg-transparent 
                          									transition ease-in-out text-base focus:text-white focus:bg-transparent focus:border-black focus:outline-none focus:rounded"
													style={input_style}
													type="text"
													id="answer"
													placeholder="Enter the answer"
													name="answer"
													onChange={(e) => handleInputChange(e)}
												></input>
											</div>
										</div>
										<div className="form-group mb-6">
											<div className="submit_button flex align-middle text-white justify-start space-x-2 items-center text-[1.2vw] p-t-5">
												<button className="formFieldLink t-md hover:text-[#D61C4E] transition ease-in-out bg-[#D61C4E] px-5 py-1.5 rounded-lg hover:bg-white">
													Add
												</button>
											</div>
										</div>
									</form>
								</div>

								{/* // Section 2 */}
								<form
									className="upload_file space-y-10 w-[50%]"
									onSubmit={(e) => handleFileUpload(e)}
								>
									<div className="subheading text-white text-[1.3vw] py-5 flex justify-center">
										Multiple Questions
									</div>
									<div className="form-group mb-6 space-y-5">
										<div className="input_field flex flex-col align-middle justify-center text-white space-y-10 items-center text-2xl ">
											<label className="w-[fit-content]">Upload the csv</label>
											<input
												className="form-control border-solid pl-3 py-1.5 m-0 bg-transparent 
                    									transition ease-in-out text-base focus:text-white focus:bg-transparent focus:border-black focus:outline-none focus:rounded"
												style={input_style}
												type="file"
												id="file"
												name="file"
												accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
												onChange={(e) => handleFileChange(e)}
											></input>
										</div>
										<div className="form-group mb-6">
											<div className="submit_button flex align-middle text-white justify-center space-x-2 items-center text-[1.2vw] p-t-5">
												<button className="formFieldLink t-md hover:text-[#D61C4E] transition ease-in-out bg-[#D61C4E] px-5 py-1.5 rounded-lg hover:bg-white">
													Upload
												</button>
											</div>
										</div>
									</div>
								</form>

								<form
									className="upload_file space-y-10 w-[50%]"
									onSubmit={(e) => handleFileUpload(e)}
								>
									<div className="subheading text-white text-[1.3vw] py-5 flex justify-center">
										Add Theory Questions
									</div>
									<div className="form-group mb-6 space-y-5">
										<div className="input_field flex flex-col align-middle justify-center text-white space-y-10 items-center text-2xl ">
											<label className="w-[fit-content]">Upload the pdf</label>
											<input
												className="form-control border-solid pl-3 py-1.5 m-0 bg-transparent 
                    									transition ease-in-out text-base focus:text-white focus:bg-transparent focus:border-black focus:outline-none focus:rounded"
												style={input_style}
												type="file"
												id="file"
												name="file"
												accept=".pdf"
												onChange={(e) => handleFileChange(e)}
											></input>
										</div>
										<div className="form-group mb-6">
											<div className="submit_button flex align-middle text-white justify-center space-x-2 items-center text-[1.2vw] p-t-5">
												<button className="formFieldLink t-md hover:text-[#D61C4E] transition ease-in-out bg-[#D61C4E] px-5 py-1.5 rounded-lg hover:bg-white">
													Upload
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Admin;
