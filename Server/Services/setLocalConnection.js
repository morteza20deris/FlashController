const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
client.setTimeout(2000);

module.exports = async (params, callback) => {
	return await new Promise(async (resolve, reject) => {
		await client.connectRTUBuffered(
			params.microControllerPort,
			{
				baudRate: parseInt(params.baudRate),
				parity: parseInt(params.parity),
				bytesize: parseInt(params.bytesize),
				stopbits: parseInt(params.stopbits),
			},
			async (e) => {
				if (e?.toString().includes("Error")) {
					console.log(e.toString());
					resolve(e.toString());
				} else {
					resolve(await callback(client, params));
					client.close();
				}
			}
		);
	});
};
