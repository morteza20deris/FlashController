const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

client.setTimeout(1000);

module.exports = async (params, callback) => {
	return await new Promise(async (resolve, reject) => {
		try {
			await client.connectRTUBuffered(
				params.microControllerPort,
				{
					baudRate: parseInt(params.baudRate),
					parity: params.parity,
					bytesize: parseInt(params.bytesize),
					stopbits: parseInt(params.stopbits),
				},
				async (e) => {
					if (e) {
						console.log(e.toString());
						resolve(e.toString());
					} else {
						try {
							// 	// resolve(await callback(client, params));
							resolve(await callback(client, params));
						} catch (error) {
							console.log(error);
							resolve(error.name);
						}
					}
				}
			);
		} catch (error) {
			resolve(error.toString());
		}
	});
};
