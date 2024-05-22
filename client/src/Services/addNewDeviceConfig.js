import axios from "axios";
import { LocalServerAddress } from "./constants";

async function addNewDeviceConfig(deviceName, newConfig) {
	return await axios
		.get(`${LocalServerAddress}/apiServices/addNewDeviceConfig`, {
			params: { deviceName: deviceName, newConfig: newConfig },
		})
		.then((res) => res.data)
		.catch(console.log);
}

export default addNewDeviceConfig;
