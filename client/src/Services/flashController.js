import axios from "axios";
import { LocalServerAddress } from "./constants";

async function flashController(params, callback) {
	console.log(params);
	await axios
		.get(`${LocalServerAddress}/apiServices/${params.method}`, {
			params: params,
		})
		.then((res) => {
			// console.log(typeof res.data, res.data);
			if (typeof res.data === "string") {
				alert(res.data.replace(": File not found", "") + "\n\n");
			} else {
				alert(
					`Action Successful \n Address: ${res.data.address} \n Length: ${res.data.length} \n\n`
				);
			}
			callback();
		})
		.catch((err) => console.log(err))
		.finally(() => callback());
}

export default flashController;
