const dgram = require("dgram");
module.exports = async (params) => {
	return await new Promise((resolve, reject) => {
		const client = dgram.createSocket("udp4");
		client.on("error", (error) => {
			resolve(error.toString);
			client.close();
		});
		client.on("message", (msg, info) => {
			resolve(msg.toString("utf-8").slice(2, -3));
			// resolve(msg);
			// client.close();
		});
		client.send(
			JSON.stringify(params),
			params.remoteIPPort,
			params.remoteIP,
			(err) => {
				if (err) {
					client.close();
					resolve(err.toString());
				}
			}
		);

		setTimeout(() => {
			client.close();
			resolve("Error: Connection Timeout");
		}, 5000);
	});
};
