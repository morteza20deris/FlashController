module.exports = async (client, params) => {
	client.setID(parseInt(params.slave));
	return await client
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
			return res;
		})
		.catch((err) => {
			client.close();
			return err.name;
		});
};
