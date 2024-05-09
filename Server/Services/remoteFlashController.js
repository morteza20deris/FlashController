const dgram = require("dgram");
module.exports = (params) => {
	const client = dgram.createSocket("udp4");
	client.send(JSON.stringify(params), 5000, params.microControllerPort, () =>
		client.close()
	);
};
