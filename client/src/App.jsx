import "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FormGroup from "react-bootstrap/esm/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import "./App.css";
import getLocalPorts from "./Services/getLocalPorts";
import { LocalServerAddress } from "./Services/constants";

function App() {
	const [redCurrent, setRedCurrent] = useState(500);
	const [redDuration, setRedDuration] = useState(500);
	const [greenCurrent, setGreenCurrent] = useState(500);
	const [greenDuration, setGreenDuration] = useState(500);
	const [blueCurrent, setBlueCurrent] = useState(500);
	const [blueDuration, setBlueDuration] = useState(500);
	const [whiteCurrent, setWhiteCurrent] = useState(500);
	const [whiteDuration, setWhiteDuration] = useState(500);
	const [delayDuration, setDelayDuration] = useState(100);
	const [triggerButton, setTriggerButton] = useState(true);
	const [triggerSensor, setTriggerSensor] = useState(true);
	const [saveState, setSaveState] = useState(true);
	const [microControllerPort, setMicroControllerPort] = useState("");
	const [method, setMethod] = useState("local");
	const [baudRate, setBaudRate] = useState(9600);
	const [byteSize, setByteSize] = useState(8);
	const [slave, setSlave] = useState(1);
	const [parity, setParity] = useState("N");
	const [stopBits, setStopBits] = useState(1);
	const [waitForMicroResponse, setWaitForMicroResponse] = useState(false);
	const [localPorts, setLocalPorts] = useState();
	const [validated, setValidated] = useState(false);
	const [remoteIP, setRemoteIP] = useState("");

	useEffect(() => {
		async function asyncLocalPorts() {
			setLocalPorts(await getLocalPorts());
		}
		asyncLocalPorts();
	}, []);

	const buttonClickHandler = async () => {
		setWaitForMicroResponse(true);

		await axios
			.get(`${LocalServerAddress}/apiServices/${method}`, {
				params: {
					0: triggerButton ? 1 : 0,
					2: triggerSensor ? 1 : 0,
					4: delayDuration,
					6: redCurrent,
					8: redDuration,
					10: blueCurrent,
					12: blueDuration,
					14: whiteCurrent,
					16: whiteDuration,
					18: greenCurrent,
					20: greenDuration,
					22: saveState ? 1 : 0,
					microControllerPort:
						method === "local" ? microControllerPort : remoteIP,
					method: method,
					baudRate: baudRate,
					byteSize: byteSize,
					parity: parity,
					stopBits: stopBits,
					slave: slave,
				},
			})
			.then((res) => {
				// console.log(typeof res.data, res.data);
				if (typeof res.data === "string") {
					alert(res.data.replace(": File not found", "") + "\n\n");
				} else {
					alert(
						`Action Successful \n Address: ${res.data.address} \n Length: ${res.data.length} \n\n`
					);
				}
			})
			.catch((err) => console.log(err))
			.finally(() => setWaitForMicroResponse(false));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
			console.log("invalid");
			alert("Some of you'r inputs are invalid");
		} else if (form.checkValidity() === true) {
			console.log("valid");
			// buttonClickHandler();
			buttonClickHandler();
		}
		setValidated(true);
	};

	return (
		<div className="App">
			<header className="App-header">
				<img
					className="customYellow"
					style={{
						maxHeight: "100px",
						maxWidth: "100px",
					}}
					src={require("./assets/thunder.png")}
					alt="thunder"
				/>
				<h1>Flash Controller</h1>
				<img
					className="customYellow"
					style={{ maxHeight: "100px", maxWidth: "100px" }}
					src={require("./assets/thunder.png")}
					alt="thunder"
				/>
			</header>

			<div className="App-body">
				<hr className="hr" />
				<h2>Connection Settings</h2>
				<hr className="hr" />
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Row className="mb-3">
						<FormGroup as={Col} className="col" md="4">
							{method === "local" ? (
								<h3 className="text-nowrap w-auto mw-100">
									Connection Port
								</h3>
							) : (
								<h3 className="text-nowrap w-auto mw-100">
									Connection IP & Port
								</h3>
							)}
							{method === "local" ? (
								<Form.Select
									className="prevent-validation"
									onChange={(e) =>
										setMicroControllerPort(e.target.value)
									}
								>
									{localPorts?.map((item) => (
										<option
											key={item.portName}
											value={item.portName}
										>
											{item.name}
										</option>
									))}
								</Form.Select>
							) : (
								<InputGroup>
									<Form.Control
										defaultValue={remoteIP}
										style={{ width: "50%" }}
										onChange={(e) =>
											setRemoteIP(e.target.value)
										}
										required
										formNoValidate={true}
										placeholder="Controller IP Address"
										type="text"
										minLength="7"
										maxLength="15"
										size="15"
										pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
									/>

									<Form.Control
										required
										placeholder="Port"
										type="number"
										min={0}
										max={65535}
									/>
								</InputGroup>
							)}
						</FormGroup>
						<FormGroup as={Col} md="4">
							<h3>Method</h3>
							<Form.Select
								className="prevent-validation"
								onChange={(e) => setMethod(e.target.value)}
							>
								<option value="local">Local</option>
								<option value="remote">Remote</option>
							</Form.Select>
						</FormGroup>

						<FormGroup as={Col} md="4">
							<h3>Parity</h3>
							<Form.Select
								className="prevent-validation"
								onChange={(e) => setParity(e.target.value)}
							>
								<option value="N">None</option>
								<option value="E">Even</option>
								<option value="O">Odd</option>
								<option value="M">Mark</option>
								<option value="S">Space</option>
							</Form.Select>
						</FormGroup>
					</Row>

					<Row className="mb-3">
						<FormGroup as={Col} md="4">
							<h3>BaudRate</h3>
							<Form.Control
								className="prevent-validation"
								type="number"
								defaultValue={baudRate}
								onChange={(e) => setBaudRate(e.target.value)}
								placeholder="Enter Connection BaudRate"
							/>
						</FormGroup>
						<FormGroup as={Col} md="4">
							<h3>ByteSize</h3>
							<Form.Control
								className="prevent-validation"
								type="number"
								defaultValue={byteSize}
								onChange={(e) => setByteSize(e.target.value)}
								placeholder="Enter Connection ByteSize"
							/>
						</FormGroup>
						<FormGroup as={Col} md="4">
							<h3>StopBits</h3>
							<Form.Control
								className="prevent-validation"
								type="number"
								defaultValue={stopBits}
								onChange={(e) => setStopBits(e.target.value)}
								placeholder="Enter Connection StopBits"
							/>
						</FormGroup>
					</Row>
					<h3>Slave ID</h3>
					<Form.Control
						className="prevent-validation"
						type="number"
						defaultValue={slave}
						onChange={(e) => setSlave(e.target.value)}
						placeholder="Enter Slave ID"
					/>
					<hr className="hr" />
					<h2>LED Settings</h2>
					<hr className="hr" />

					<Row md="3">
						<FormGroup as={Col} controlId="triggerValidation">
							<h5 className="mx-2">Trigger Button</h5>
							<Form.Check
								checked={triggerButton}
								onChange={(e) =>
									setTriggerButton(e.target.checked)
								}
							/>
						</FormGroup>

						<FormGroup as={Col}>
							<h5 className="mx-2">Trigger sensor</h5>
							<Form.Check
								checked={triggerSensor}
								onChange={(e) =>
									setTriggerSensor(e.target.checked)
								}
							/>
						</FormGroup>

						<FormGroup as={Col}>
							<h5 className="mx-2">Save</h5>
							<Form.Check
								checked={saveState}
								onChange={(e) => setSaveState(e.target.checked)}
							/>
						</FormGroup>
					</Row>
					<Row>
						<FormGroup as={Col} controlId="delayValidation">
							<h3>Delay</h3>
							<Form.Control
								isValid={validated}
								required
								type="number"
								defaultValue={delayDuration}
								min={0}
								max={200}
								onChange={(e) =>
									setDelayDuration(e.target.value)
								}
								placeholder="Delay Value"
							/>
							<Form.Control.Feedback type="invalid">
								Please Enter a number Between 0 and 200
							</Form.Control.Feedback>
						</FormGroup>
					</Row>

					<Row>
						<FormGroup
							as={Col}
							md="6"
							controlId="redCurrentValidation"
						>
							<h3>Red LED Current</h3>
							<Form.Control
								required
								type="number"
								defaultValue={redCurrent}
								min={0}
								max={2000}
								onChange={(e) => setRedCurrent(e.target.value)}
								placeholder="Red Led Current Value"
							/>
							<Form.Control.Feedback type="invalid">
								Please Enter a number Between 0 and 2000
							</Form.Control.Feedback>
						</FormGroup>
						<FormGroup
							as={Col}
							md="6"
							controlId="redDurationValidation"
						>
							<h3>Red LED Duration</h3>
							<Form.Control
								required
								type="number"
								min={0}
								max={500}
								placeholder="Red Led Duration Amount"
								defaultValue={redDuration}
								onChange={(e) => setRedDuration(e.target.value)}
							/>
							<Form.Control.Feedback type="invalid">
								Please Enter a number Between 0 and 500
							</Form.Control.Feedback>
						</FormGroup>
					</Row>
					<Row>
						<FormGroup
							as={Col}
							md="6"
							controlId="greenCurrentValidation"
						>
							<h3>Green LED Current</h3>
							<Form.Control
								required
								type="number"
								min={0}
								max={2000}
								placeholder="Green Led Current Value"
								defaultValue={greenCurrent}
								onChange={(e) =>
									setGreenCurrent(e.target.value)
								}
							/>
							<Form.Control.Feedback type="invalid">
								Please Enter a number Between 0 and 2000
							</Form.Control.Feedback>
						</FormGroup>
						<FormGroup
							as={Col}
							md="6"
							controlId="greenDurationValidation"
						>
							<h3>Green LED Duration</h3>
							<Form.Control
								required
								type="number"
								min={0}
								max={500}
								placeholder="Green Led Duration Amount"
								defaultValue={greenDuration}
								onChange={(e) =>
									setGreenDuration(e.target.value)
								}
							/>
							<Form.Control.Feedback type="invalid">
								Please Enter a number Between 0 and 500
							</Form.Control.Feedback>
						</FormGroup>
					</Row>
					<Row>
						<FormGroup
							as={Col}
							md="6"
							controlId="blueCurrentValidation"
						>
							<h3>Blue LED Current</h3>
							<Form.Control
								required
								type="number"
								min={0}
								max={2000}
								placeholder="Blue Led Current Value"
								defaultValue={blueCurrent}
								onChange={(e) => setBlueCurrent(e.target.value)}
							/>
							<Form.Control.Feedback type="invalid">
								Please Enter a number Between 0 and 2000
							</Form.Control.Feedback>
						</FormGroup>
						<FormGroup
							as={Col}
							md="6"
							controlId="blueDurationValidation"
						>
							<h3>Blue LED Duration</h3>
							<Form.Control
								required
								type="number"
								min={0}
								max={500}
								placeholder="Blue Led Duration Amount"
								defaultValue={blueDuration}
								onChange={(e) =>
									setBlueDuration(e.target.value)
								}
							/>
							<Form.Control.Feedback type="invalid">
								Please Enter a number Between 0 and 500
							</Form.Control.Feedback>
						</FormGroup>
					</Row>
					<Row>
						<FormGroup
							as={Col}
							md="6"
							controlId="whiteCurrentValidation"
						>
							<h3>White LED Current</h3>
							<Form.Control
								required
								type="number"
								min={0}
								max={2000}
								placeholder="White Led Current Value"
								defaultValue={whiteCurrent}
								onChange={(e) =>
									setWhiteCurrent(e.target.value)
								}
							/>
							<Form.Control.Feedback type="invalid">
								Please Enter a number Between 0 and 2000
							</Form.Control.Feedback>
						</FormGroup>
						<FormGroup
							as={Col}
							md="6"
							controlId="whiteDurationValidation"
						>
							<h3>White LED Duration</h3>
							<Form.Control
								required
								type="number"
								min={0}
								max={500}
								placeholder="White Led Duration Amount"
								defaultValue={whiteDuration}
								onChange={(e) =>
									setWhiteDuration(e.target.value)
								}
							/>
							<Form.Control.Feedback type="invalid">
								Please Enter a number Between 0 and 500
							</Form.Control.Feedback>
						</FormGroup>
					</Row>
					<div className="d-grid gap-2">
						<button
							className="btn btn-primary my-5"
							disabled={waitForMicroResponse}
							type="submit"
							style={{ widows: "100%" }}
						>
							{waitForMicroResponse ? "Please Wait" : "Upload"}
						</button>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default App;
