const fs = require("fs");
const { dbPath } = require("./constants");
module.exports = async () => {
	return await new Promise(async (resolve, reject) => {
		fs.readFile(dbPath, "utf-8", (err, content) => {
			if (err) {
				console.log(err);
				resolve(err);
			}
			resolve(content);
		});
	});
};
