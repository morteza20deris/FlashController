const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
client.setTimeout(1000);

module.exports = async (parameters) => {
	return new Promise(async (resolve, reject) => {
		await client.connectRTUBuffered(
			parameters.microControllerPort,
			{
				baudRate: parseInt(parameters.baudRate),
				parity: parseInt(parameters.parity),
				bytesize: parseInt(parameters.bytesize),
				stopbits: parseInt(parameters.stopbits),
			},
			(e) => {
				if (e?.toString().includes("Error")) {
					console.log(e.toString());
					resolve(e.toString());
				} else {
					resolve(write());
				}
			}
		);
	});

	function write() {
		client.setID(parseInt(parameters.slave));
		try {
			client
				.writeRegisters(0, [
					parseInt(parameters["0"]),
					parseInt(parameters["2"]),
					parseInt(parameters["4"]),
					parseInt(parameters["6"]),
					parseInt(parameters["8"]),
					parseInt(parameters["10"]),
					parseInt(parameters["12"]),
					parseInt(parameters["14"]),
					parseInt(parameters["16"]),
					parseInt(parameters["18"]),
					parseInt(parameters["20"]),
					parseInt(parameters["22"]),
				])
				.then((res) => {
					console.log(res);
					client.close();
					return res;
				});
		} catch (error) {
			console.log(error);
		}
		return;
	}
};
