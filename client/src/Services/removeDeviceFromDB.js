import axios from "axios";
import { LocalServerAddress } from "./constants";

async function removeDeviceFromDB(device) {
	return await axios
		.get(`${LocalServerAddress}/apiServices/removeDevice`, {
			params: device,
		})
		.then((res) => res.data)
		.catch(console.log);
}

export default removeDeviceFromDB;
