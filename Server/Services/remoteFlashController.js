const dgram = require("dgram");
module.exports = (params) => {
	const client = dgram.createSocket("udp4");
	client.send(JSON.stringify(params), 5000, "192.168.1.16", () =>
		client.close()
	);
};
