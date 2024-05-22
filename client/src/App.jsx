import "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import FormGroup from "react-bootstrap/esm/FormGroup";
import "./App.css";
import addNewDeviceModal from "./Components/addNewDeviceModal";
import addNewDeviceToDB from "./Services/addNewDeviceToDB";
import flashController from "./Services/flashController";
import getDevicesFromDB from "./Services/getDevicesFromDB";
import getLocalPorts from "./Services/getLocalPorts";
import removeDeviceConfig from "./Services/removeDeviceConfig";
import removeDeviceFromDB from "./Services/removeDeviceFromDB";
import trashIcon from "./assets/trash.svg";
import addDeviceConfigModal from "./Components/addDeviceConfigModal";
function App() {
	const [redCurrent, setRedCurrent] = useState(0);
	const [redDuration, setRedDuration] = useState(0);
	const [greenCurrent, setGreenCurrent] = useState(0);
	const [greenDuration, setGreenDuration] = useState(0);
	const [blueCurrent, setBlueCurrent] = useState(0);
	const [blueDuration, setBlueDuration] = useState(0);
	const [whiteCurrent, setWhiteCurrent] = useState(0);
	const [whiteDuration, setWhiteDuration] = useState(0);
	const [delayDuration, setDelayDuration] = useState(0);
	const [triggerButton, setTriggerButton] = useState(true);
	const [triggerSensor, setTriggerSensor] = useState(true);
	const [saveState, setSaveState] = useState(true);
	const [microControllerPort, setMicroControllerPort] = useState("");
	const [method, setMethod] = useState("localFlashController");
	const [baudRate, setBaudRate] = useState(9600);
	const [byteSize, setByteSize] = useState(8);
	const [slave, setSlave] = useState(1);
	const [parity, setParity] = useState("N");
	const [stopBits, setStopBits] = useState(1);
	const [waitForMicroResponse, setWaitForMicroResponse] = useState(false);
	const [localPorts, setLocalPorts] = useState();
	const [validated, setValidated] = useState(false);
	const [remoteIP, setRemoteIP] = useState("192.168.1.16");
	const [remoteIPPort, setRemoteIPPort] = useState(5000);
	const [devicesFromDB, setDevicesFromDB] = useState([]);
	const [selectedDevice, setSelectedDevice] = useState();
	const [showAddNewDeviceModal, setShowAddNewDeviceModal] = useState(false);
	const [newDeviceName, setNewDeviceName] = useState("");
	const [showAddDeviceConfigModal, setShowAddDeviceConfigModal] =
		useState(false);
	const [selectedConfig, setSelectedConfig] = useState("");
	const [newConfig, setNewConfig] = useState();
	const [configName, setConfigName] = useState("");
	const [selectedDeviceIndex, setSelectedDeviceIndex] = useState();

	useEffect(() => {
		setValidated(true);
		async function asyncLocalPorts() {
			await setLocalPorts(await getLocalPorts());
			await setDevicesFromDB(await getDevicesFromDB());
		}
		asyncLocalPorts();
	}, []);

	useEffect(() => {
		setSelectedDevice(devicesFromDB[selectedDeviceIndex]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [devicesFromDB]);

	// eslint-disable-next-line no-unused-vars
	const testButtonClickHandler = () => {
		getDevicesFromDB();
	};

	const buttonClickHandler = async () => {
		setWaitForMicroResponse(true);
		await flashController(newConfig, () => setWaitForMicroResponse(false));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (event.nativeEvent.submitter.name === "submit") {
			const form = event.currentTarget;
			if (form.checkValidity() === false) {
				event.stopPropagation();
				console.log("invalid");
				alert("Some of you'r inputs are invalid");
			} else if (form.checkValidity() === true) {
				console.log("valid");
				setNewConfig({
					name: configName,
					triggerButton: triggerButton ? 1 : 0,
					triggerSensor: triggerSensor ? 1 : 0,
					delayDuration: delayDuration,
					redCurrent: redCurrent,
					redDuration: redDuration,
					blueCurrent: blueCurrent,
					blueDuration: blueDuration,
					whiteCurrent: whiteCurrent,
					whiteDuration: whiteDuration,
					greenCurrent: greenCurrent,
					greenDuration: greenDuration,
					saveState: saveState ? 1 : 0,
					microControllerPort: microControllerPort,
					method: method,
					baudRate: baudRate,
					byteSize: byteSize,
					parity: parity,
					stopBits: stopBits,
					slave: slave,
					remoteIP: remoteIP,
					remoteIPPort: remoteIPPort,
				});
				setShowAddDeviceConfigModal(true);
			}
		}
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
				{addNewDeviceModal({
					showAddNewDeviceModal: showAddNewDeviceModal,
					setShowAddNewDeviceModal: setShowAddNewDeviceModal,
					devicesFromDB: devicesFromDB,
					setDevicesFromDB: setDevicesFromDB,
					addNewDeviceToDB: addNewDeviceToDB,
					newDeviceName: newDeviceName,
					setNewDeviceName: setNewDeviceName,
				})}
				{addDeviceConfigModal({
					buttonClickHandler: buttonClickHandler,
					newConfig: newConfig,
					selectedConfig: selectedConfig,
					selectedDevice: selectedDevice,
					setDevicesFromDB: setDevicesFromDB,
					setShowAddDeviceConfigModal: setShowAddDeviceConfigModal,
					showAddDeviceConfigModal: showAddDeviceConfigModal,
				})}

				<hr className="hr" />
				<h2>Connection Settings</h2>
				<hr className="hr" />
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Row>
						<FormGroup as={Col} md={selectedDevice ? "2" : ""}>
							<Row>
								<h3>Devices</h3>
								{devicesFromDB?.length > 0 &&
									devicesFromDB?.map((device, index) => (
										<div
											className="my-2"
											key={device.deviceName}
										>
											<ButtonGroup>
												<Button
													variant="secondary"
													style={{
														maxWidth: "110px",
														whiteSpace: "nowrap",
														overflow: "hidden",
													}}
													onClick={(e) => {
														setSelectedDevice(
															device
														);
														setSelectedDeviceIndex(
															index
														);
													}}
												>
													{`Edit ${device.deviceName}`}
												</Button>
												<Button
													onClick={async () => {
														setDevicesFromDB(
															await removeDeviceFromDB(
																selectedDevice
															)
														);
													}}
													variant="secondary"
												>
													<img
														src={trashIcon}
														alt="delete"
													/>
												</Button>
											</ButtonGroup>
										</div>
									))}
								<Button
									style={{ width: "100%" }}
									className="mx-2"
									onClick={() =>
										setShowAddNewDeviceModal(true)
									}
								>
									Add New Device
								</Button>
							</Row>
						</FormGroup>
						{selectedDevice && (
							<>
								<FormGroup as={Col} md="8">
									<Row className="mb-3">
										<h3>Config Name</h3>
										<Form.Control
											required
											className="prevent-validation"
											type="text"
											value={configName}
											onChange={(e) =>
												setConfigName(e.target.value)
											}
											placeholder="Enter Config Name"
										/>
										<Form.Control.Feedback type="invalid">
											Config Name is Necessary
										</Form.Control.Feedback>
										<FormGroup
											as={Col}
											md={
												method ===
												"localFlashController"
													? 4
													: ""
											}
										>
											{method ===
											"localFlashController" ? (
												<h3 className="text-wrap w-auto mw-100">
													Port
												</h3>
											) : (
												<h3 className="text-nowrap w-auto mw-100">
													Connection IP & Port
												</h3>
											)}
											{method ===
											"localFlashController" ? (
												<Form.Select
													className="prevent-validation"
													value={
														microControllerPort ||
														localPorts[0]
													}
													onChange={(e) =>
														setMicroControllerPort(
															e.target.value
														)
													}
												>
													{localPorts?.map((item) => (
														<option
															key={item.portName}
															value={
																item.portName
															}
														>
															{item.name}
														</option>
													))}
												</Form.Select>
											) : (
												<InputGroup>
													<Form.Control
														value={remoteIP}
														style={{
															width: "60%",
														}}
														onChange={(e) =>
															setRemoteIP(
																e.target.value
															)
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
														style={{ width: "40%" }}
														required
														placeholder="Port"
														type="number"
														min={0}
														max={65535}
														value={remoteIPPort}
														onChange={(e) =>
															setRemoteIPPort(
																e.target.value
															)
														}
													/>
												</InputGroup>
											)}
										</FormGroup>
										<FormGroup
											as={Col}
											md={
												method ===
												"localFlashController"
													? 4
													: ""
											}
										>
											<h3>Method</h3>
											<Form.Select
												className="prevent-validation"
												value={method}
												onChange={(e) =>
													setMethod(e.target.value)
												}
											>
												<option value="localFlashController">
													Serial Interface
												</option>
												<option value="remoteTCPFlashController">
													TCP/IP
												</option>
												<option value="remoteTelnetFlashController">
													Telnet
												</option>
											</Form.Select>
										</FormGroup>
										{method === "localFlashController" && (
											<FormGroup as={Col} md="4">
												<h3>Parity</h3>
												<Form.Select
													className="prevent-validation"
													onChange={(e) =>
														setParity(
															e.target.value
														)
													}
												>
													<option value="N">
														None
													</option>
													<option value="E">
														Even
													</option>
													<option value="O">
														Odd
													</option>
													<option value="M">
														Mark
													</option>
													<option value="S">
														Space
													</option>
												</Form.Select>
											</FormGroup>
										)}
									</Row>

									{method === "localFlashController" && (
										<Row className="mb-3">
											<FormGroup as={Col} md="4">
												<h3>BaudRate</h3>
												<Form.Control
													className="prevent-validation"
													type="number"
													value={baudRate}
													onChange={(e) =>
														setBaudRate(
															e.target.value
														)
													}
													placeholder="Enter Connection BaudRate"
												/>
											</FormGroup>
											<FormGroup as={Col} md="4">
												<h3>ByteSize</h3>
												<Form.Control
													className="prevent-validation"
													type="number"
													value={byteSize}
													onChange={(e) =>
														setByteSize(
															e.target.value
														)
													}
													placeholder="Enter Connection ByteSize"
												/>
											</FormGroup>
											<FormGroup as={Col} md="4">
												<h3>StopBits</h3>
												<Form.Control
													className="prevent-validation"
													type="number"
													value={stopBits}
													onChange={(e) =>
														setStopBits(
															e.target.value
														)
													}
													placeholder="Enter Connection StopBits"
												/>
											</FormGroup>
										</Row>
									)}
									<h3>Slave ID</h3>
									<Form.Control
										className="prevent-validation"
										type="number"
										value={slave}
										onChange={(e) =>
											setSlave(e.target.value)
										}
										placeholder="Enter Slave ID"
									/>
									<hr className="hr" />
									<h2>LED Settings</h2>
									<hr className="hr" />

									<Row md="3">
										<FormGroup
											as={Col}
											controlId="triggerValidation"
										>
											<h5 className="mx-2">
												Trigger Button
											</h5>
											<Form.Check
												checked={triggerButton}
												onChange={(e) =>
													setTriggerButton(
														e.target.checked
													)
												}
											/>
										</FormGroup>

										<FormGroup as={Col}>
											<h5 className="mx-2">
												Trigger sensor
											</h5>
											<Form.Check
												checked={triggerSensor}
												onChange={(e) =>
													setTriggerSensor(
														e.target.checked
													)
												}
											/>
										</FormGroup>

										<FormGroup as={Col}>
											<h5 className="mx-2">Save</h5>
											<Form.Check
												checked={saveState}
												onChange={(e) =>
													setSaveState(
														e.target.checked
													)
												}
											/>
										</FormGroup>
									</Row>
									<Row>
										<FormGroup
											as={Col}
											controlId="delayValidation"
										>
											<h3>Delay</h3>
											<Form.Control
												isValid={validated}
												required
												type="number"
												value={delayDuration}
												min={0}
												max={200}
												onChange={(e) =>
													setDelayDuration(
														e.target.value
													)
												}
												placeholder="Delay Value"
											/>
											<Form.Control.Feedback type="invalid">
												Please Enter a number Between 0
												and 200
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
												value={redCurrent}
												min={0}
												max={2000}
												onChange={(e) =>
													setRedCurrent(
														e.target.value
													)
												}
												placeholder="Red Led Current Value"
											/>
											<Form.Control.Feedback type="invalid">
												Please Enter a number Between 0
												and 2000
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
												max={
													redCurrent > 999 ? 100 : 200
												}
												placeholder="Red Led Duration Amount"
												value={redDuration}
												onChange={(e) =>
													setRedDuration(
														e.target.value
													)
												}
											/>
											<Form.Control.Feedback type="invalid">
												{`Please Enter a number Between 0 and ${
													redCurrent > 999 ? 100 : 200
												}`}
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
												value={greenCurrent}
												onChange={(e) =>
													setGreenCurrent(
														e.target.value
													)
												}
											/>
											<Form.Control.Feedback type="invalid">
												Please Enter a number Between 0
												and 2000
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
												max={
													greenCurrent > 999
														? 100
														: 200
												}
												placeholder="Green Led Duration Amount"
												value={greenDuration}
												onChange={(e) =>
													setGreenDuration(
														e.target.value
													)
												}
											/>
											<Form.Control.Feedback type="invalid">
												{`Please Enter a number Between 0 and ${
													greenCurrent > 999
														? 100
														: 200
												}`}
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
												value={blueCurrent}
												onChange={(e) =>
													setBlueCurrent(
														e.target.value
													)
												}
											/>
											<Form.Control.Feedback type="invalid">
												Please Enter a number Between 0
												and 2000
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
												max={
													blueCurrent > 999
														? 100
														: 200
												}
												placeholder="Blue Led Duration Amount"
												value={blueDuration}
												onChange={(e) =>
													setBlueDuration(
														e.target.value
													)
												}
											/>
											<Form.Control.Feedback type="invalid">
												{`Please Enter a number Between 0 and ${
													blueCurrent > 999
														? 100
														: 200
												}`}
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
												value={whiteCurrent}
												onChange={(e) =>
													setWhiteCurrent(
														e.target.value
													)
												}
											/>
											<Form.Control.Feedback type="invalid">
												Please Enter a number Between 0
												and 2000
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
												max={
													whiteCurrent > 999
														? 100
														: 200
												}
												placeholder="White Led Duration Amount"
												value={whiteDuration}
												onChange={(e) =>
													setWhiteDuration(
														e.target.value
													)
												}
											/>
											<Form.Control.Feedback type="invalid">
												{`Please Enter a number Between 0 and ${
													whiteCurrent > 999
														? 100
														: 200
												}`}
											</Form.Control.Feedback>
										</FormGroup>
									</Row>
									<div className="d-grid gap-2">
										<button
											className="btn btn-primary my-5"
											disabled={waitForMicroResponse}
											type="submit"
											name="submit"
											style={{ widows: "100%" }}
										>
											{waitForMicroResponse
												? "Please Wait"
												: "Upload"}
										</button>
									</div>
								</FormGroup>
								<FormGroup as={Col} md="2">
									<h3>Saves</h3>
									{devicesFromDB?.length
										? selectedDevice?.configs?.map(
												(config) => (
													<ButtonGroup
														key={config.name}
														className="m-2 "
													>
														<Button
															variant="secondary"
															style={{
																width: "100%",
															}}
															onClick={() => {
																setSelectedConfig(
																	config
																);
																setConfigName(
																	config.name
																);
																setBaudRate(
																	config.baudRate
																);
																setBlueCurrent(
																	config.blueCurrent
																);
																setBlueDuration(
																	config.blueDuration
																);
																setByteSize(
																	config.byteSize
																);
																setDelayDuration(
																	config.delayDuration
																);
																setGreenCurrent(
																	config.greenCurrent
																);
																setGreenDuration(
																	config.greenDuration
																);
																setMethod(
																	config.method
																);
																setMicroControllerPort(
																	config.microControllerPort
																);
																setParity(
																	config.parity
																);
																setRedCurrent(
																	config.redCurrent
																);

																setRedDuration(
																	config.redDuration
																);
																setRemoteIP(
																	config.remoteIP
																);
																setRemoteIPPort(
																	config.remoteIPPort
																);
																setSaveState(
																	config.saveState
																);
																setSlave(
																	config.slave
																);
																setStopBits(
																	config.stopBits
																);
																setTriggerButton(
																	config.triggerButton
																);
																setTriggerSensor(
																	config.triggerSensor
																);
																setWhiteCurrent(
																	config.whiteCurrent
																);
																setWhiteDuration(
																	config.whiteDuration
																);
															}}
														>
															Edit {config.name}
														</Button>
														<Button
															onClick={async () => {
																setDevicesFromDB(
																	await removeDeviceConfig(
																		config,
																		selectedDevice
																	)
																);
															}}
															variant="secondary"
														>
															<img
																src={trashIcon}
																alt="delete"
															/>
														</Button>
													</ButtonGroup>
												)
										  )
										: ""}
								</FormGroup>
							</>
						)}
					</Row>
				</Form>
			</div>
		</div>
	);
}

export default App;
