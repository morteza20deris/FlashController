const fs = require("fs");
const { dbPath } = require("./constants");
module.exports = async (data) => {
	// const {
	// 	deviceName,
	// 	connectionMethod,
	// 	connectionIPorPort,
	// 	parity,
	// 	baudRate,
	// 	byteSize,
	// 	stopBits,
	// 	slaveID,
	// 	triggerButton,
	// 	triggerSensor,
	// 	save,
	// 	delay,
	// 	redLedCurrent,
	// 	redLedDuration,
	// 	greenLedCurrent,
	// 	greenLedDuration,
	// 	blueLedCurrent,
	// 	blueLedDuration,
	// 	whiteLedCurrent,
	// 	whiteLedDuration,
	// } = data;

	return await new Promise(async (resolve, reject) => {
		await fs.readFile(dbPath, "utf-8", (err, content) => {
			if (err) {
				console.log(err);
			} else {
				const dbData = content.length ? JSON.parse(content) : null;
				if (
					!dbData?.filter(
						(item) => item.deviceName === data.deviceName
					).length ||
					!dbData.length
				) {
					fs.writeFile(
						"./DataBase/Devices.db",
						JSON.stringify(
							dbData ? [...dbData, data] : [data],
							null,
							2
						),
						"utf-8",
						(err) => {
							if (err) {
								console.log(err);
								resolve(err);
							}
							resolve(
								JSON.stringify(
									dbData ? [...dbData, data] : [data]
								)
							);
						}
					);
				} else {
					console.log("Duplicate Data");
				}
			}
		});
	});
};
