const fs = require("fs");
const { dbPath } = require("./constants");
const { config } = require("process");
module.exports = async ({ selectedDevice, selectedConfig }) => {
	return await new Promise(async (resolve, reject) => {
		await fs.readFile(dbPath, "utf-8", (err, content) => {
			if (err) {
				console.log(err);
			}
			const dbData = JSON.parse(content);
			const newDBData = dbData.map((device) =>
				device.deviceName === selectedDevice.deviceName
					? {
							...device,
							configs: device.configs.filter(
								(config) => config.name !== selectedConfig.name
							),
					  }
					: device
			);
			fs.writeFile(
				dbPath,
				JSON.stringify(newDBData, null, 2),
				"utf-8",
				(err) => {
					if (err) {
						console.log(err);
					}
					resolve(JSON.stringify(newDBData, null, 2));
				}
			);
		});
	});
};
