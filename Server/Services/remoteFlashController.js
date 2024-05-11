const dgram = require("dgram");
module.exports = async (params) => {
	return await new Promise((resolve, reject) => {
		const client = dgram.createSocket("udp4");
		client.send(
			JSON.stringify(params),
			params.remoteIPPort,
			params.remoteIP,
			() => {
				client.close();
				resolve("Data Sent");
			}
		);
	});
};
