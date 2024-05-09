const dgram = require("dgram");
module.exports = (params) => {
	const client = dgram.createSocket("udp4");
	client.send(
		JSON.stringify(params),
		params.remoteIPPort,
		params.remoteIP,
		() => client.close()
	);
};
