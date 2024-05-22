const fs = require("fs");
const { dbPath } = require("./constants");
module.exports = async (data) => {
	return await new Promise(async (resolve, reject) => {
		// console.log(data);

		await fs.readFile(dbPath, "utf-8", (err, content) => {
			if (err) {
				console.log(err);
				resolve(err);
			}
			const dbData = JSON.parse(content);
			const newDBData = dbData.map((item) =>
				item.deviceName === data.deviceName
					? {
							...item,
							configs: item.configs?.length
								? [...item.configs, data.newConfig]
								: [data.newConfig],
					  }
					: item
			);
			fs.writeFile(dbPath, JSON.stringify(newDBData), "utf-8", (err) => {
				if (err) {
					console.log(err);
					resolve(err);
				}
				resolve(JSON.stringify(newDBData));
			});
			console.log(newDBData);
		});
	});
};
