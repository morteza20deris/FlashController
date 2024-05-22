const fs = require("fs");
const { dbPath } = require("./constants");
module.exports = (data) => {
	return new Promise(async (resolve, reject) => {
		console.log(data);

		await fs.readFile(dbPath, (err, content) => {
			if (err) {
				console.log(err);
				resolve(err);
			} else {
				const dbData = JSON.parse(content);
				const newDBData = dbData.filter(
					(item) => item.deviceName !== data.deviceName
				);
				console.log(dbData);
				fs.writeFile(
					dbPath,
					JSON.stringify(newDBData, null, 2),
					"utf-8",
					(err) => {
						if (err) {
							console.log(err);
							resolve(err);
						}
						resolve(JSON.stringify(newDBData, null, 2));
					}
				);
			}
		});
	});
};
