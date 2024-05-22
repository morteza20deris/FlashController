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
				if (e) {
					console.log(e.toString());
					resolve(e.toString());
				} else {
					resolve(write());
				}
			}
		);
	}).catch(console.log);

	function write() {
		client.setID(parseInt(parameters.slave));
		try {
			return client.readHoldingRegisters(0, 12).then(
				(res) => {
					console.log(res);
					client.close();
					return res;
				},
				(err) => {
					client.close();
					return err.name;
				}
			);
		} catch (error) {
			console.log(error);
			client.close();
		}
		return;
	}
};
