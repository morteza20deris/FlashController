const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
module.exports = async (params) => {
	return await new Promise((resolve, reject) => {
		client.connectTCP(
			params.remoteIP,
			{ port: parseInt(params.remoteIPPort) },
			() => {
				client.setID(1);
				client
					.writeRegisters(0, [
						parseInt(params.triggerButton),
						parseInt(params.triggerSensor),
						parseInt(params.delayDuration),
						parseInt(params.redCurrent),
						parseInt(params.redDuration),
						parseInt(params.greenCurrent),
						parseInt(params.greenDuration),
						parseInt(params.blueCurrent),
						parseInt(params.blueDuration),
						parseInt(params.whiteCurrent),
						parseInt(params.whiteDuration),
						parseInt(params.saveState),
					])
					.then((res) => {
						client.close();
						resolve(res);
					})
					.catch((err) => {
						client.close();
						resolve(err.name);
					});
			}
		);

		setTimeout(() => {
			client.close();
			resolve("Error: Timeout");
		}, 5000);
	});
};
