module.exports = async (client, params) => {
	client.setID(parseInt(params.slave));
	return await client
		.writeRegisters(0, [
			parseInt(params["0"]),
			parseInt(params["2"]),
			parseInt(params["4"]),
			parseInt(params["6"]),
			parseInt(params["8"]),
			parseInt(params["10"]),
			parseInt(params["12"]),
			parseInt(params["14"]),
			parseInt(params["16"]),
			parseInt(params["18"]),
			parseInt(params["20"]),
			parseInt(params["22"]),
		])
		.then((res) => {
			console.log(res);
			return res;
		});
};
