import { useState } from "react";
import "./App.css";
import "axios";
import axios from "axios";

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
	const [microControllerPort, setMicroControllerPort] = useState("com14");
	const [method, setMethod] = useState("rtu");
	const [baudRate, setBaudRate] = useState(9600);
	const [byteSize, setByteSize] = useState(8);
	const [parity, setParity] = useState("N");
	const [stopBits, setStopBits] = useState(1);
	const [waitForMicroResponse, setWaitForMicroResponse] = useState(false);

	const buttonClickHandler = async () => {
		setWaitForMicroResponse(true);

		await axios
			.get(
				`http://localhost:3001/apiservices/${
					method === "rtu" ? "local" : "remote"
				}`,
				{
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
						microControllerPort: microControllerPort,
						method: method,
						baudRate: baudRate,
						byteSize: byteSize,
						parity: parity,
						stopBits: stopBits,
					},
				}
			)
			.then((res) =>
				alert(
					res.data.includes("Error")
						? "Connection Error"
						: "Upload Was Successful"
				)
			)
			.catch((err) => console.log(err))
			.finally(() => setWaitForMicroResponse(false));
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
				<div className="row">
					<div className="col-md-4">
						<h3>Connection Port</h3>
						<input
							className="form-control"
							type="text"
							value={microControllerPort}
							onChange={(e) =>
								setMicroControllerPort(e.target.value)
							}
							placeholder="Enter Connection port"
						/>
					</div>
					<div className="col-md-4">
						<h3>Method</h3>
						<input
							className="form-control"
							type="text"
							value={method}
							onChange={(e) => setMethod(e.target.value)}
							placeholder="Enter Connection Method"
						/>
					</div>
					<div className="col-md-4">
						<h3>Parity</h3>
						<input
							className="form-control"
							type="text"
							value={parity}
							onChange={(e) => setParity(e.target.value)}
							placeholder="Enter Connection Parity"
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
						<h3>BaudRate</h3>
						<input
							className="form-control"
							type="number"
							value={baudRate}
							onChange={(e) => setBaudRate(e.target.value)}
							placeholder="Enter Connection BaudRate"
						/>
					</div>
					<div className="col-md-4">
						<h3>ByteSize</h3>
						<input
							className="form-control"
							type="number"
							value={byteSize}
							onChange={(e) => setByteSize(e.target.value)}
							placeholder="Enter Connection ByteSize"
						/>
					</div>
					<div className="col-md-4">
						<h3>StopBits</h3>
						<input
							className="form-control"
							type="number"
							value={stopBits}
							onChange={(e) => setStopBits(e.target.value)}
							placeholder="Enter Connection StopBits"
						/>
					</div>
				</div>
				<hr className="hr" />
				<h2>LED Settings</h2>
				<hr className="hr" />
				<form>
					<div className="row my-3">
						<div className="col">
							<h5 className="mx-2">Trigger Button</h5>
							<input
								type="checkbox"
								checked={triggerButton}
								onChange={(e) =>
									setTriggerButton(e.target.checked)
								}
							/>
						</div>

						<div className="col">
							<h5 className="mx-2">Trigger sensor</h5>
							<input
								type="checkbox"
								checked={triggerSensor}
								onChange={(e) =>
									setTriggerSensor(e.target.checked)
								}
							/>
						</div>

						<div className="col">
							<h5 className="mx-2">Save</h5>
							<input
								type="checkbox"
								checked={saveState}
								onChange={(e) => setSaveState(e.target.checked)}
							/>
						</div>
					</div>
					<h3>Delay</h3>
					<input
						className="form-control"
						type="number"
						value={delayDuration}
						min={0}
						max={200}
						onChange={(e) => setDelayDuration(e.target.value)}
						placeholder="Delay Value"
					/>
					<div className="row">
						<div className="col md-7">
							<h3>Red LED Current</h3>
							<input
								className="form-control"
								type="number"
								value={redCurrent}
								min={0}
								max={2000}
								onChange={(e) => setRedCurrent(e.target.value)}
								placeholder="Red Led Current Value"
							/>
						</div>
						<div className="col md-7">
							<h3>Red LED Duration</h3>
							<input
								className="form-control"
								type="number"
								min={0}
								max={500}
								placeholder="Red Led Duration Amount"
								value={redDuration}
								onChange={(e) => setRedDuration(e.target.value)}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col md-7">
							<h3>Green LED Current</h3>
							<input
								className="form-control"
								type="number"
								min={0}
								max={2000}
								placeholder="Green Led Current Value"
								value={greenCurrent}
								onChange={(e) =>
									setGreenCurrent(e.target.value)
								}
							/>
						</div>
						<div className="col md-7">
							<h3>Green LED Duration</h3>
							<input
								className="form-control"
								type="number"
								min={0}
								max={500}
								placeholder="Green Led Duration Amount"
								value={greenDuration}
								onChange={(e) =>
									setGreenDuration(e.target.value)
								}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col md-7">
							<h3>Blue LED Current</h3>
							<input
								className="form-control"
								type="number"
								min={0}
								max={2000}
								placeholder="Blue Led Current Value"
								value={blueCurrent}
								onChange={(e) => setBlueCurrent(e.target.value)}
							/>
						</div>
						<div className="col md-7">
							<h3>Blue LED Duration</h3>
							<input
								className="form-control"
								type="number"
								min={0}
								max={500}
								placeholder="Blue Led Duration Amount"
								value={blueDuration}
								onChange={(e) =>
									setBlueDuration(e.target.value)
								}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col md-7">
							<h3>White LED Current</h3>
							<input
								className="form-control"
								type="number"
								min={0}
								max={2000}
								placeholder="White Led Current Value"
								value={whiteCurrent}
								onChange={(e) =>
									setWhiteCurrent(e.target.value)
								}
							/>
						</div>
						<div className="col md-7">
							<h3>White LED Duration</h3>
							<input
								className="form-control"
								type="number"
								min={0}
								max={500}
								placeholder="White Led Duration Amount"
								value={whiteDuration}
								onChange={(e) =>
									setWhiteDuration(e.target.value)
								}
							/>
						</div>
					</div>
				</form>

				<div class="d-grid gap-2">
					<button
						className="btn btn-primary my-5"
						disabled={waitForMicroResponse}
						type="button"
						style={{ widows: "100%" }}
						onClick={buttonClickHandler}
					>
						{waitForMicroResponse ? "Please Wait" : "Upload"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
