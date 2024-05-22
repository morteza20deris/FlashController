import axios from "axios";
import { LocalServerAddress } from "./constants";

async function removeDeviceConfig(selectedConfig, selectedDevice) {
	return await axios
		.get(`${LocalServerAddress}/apiServices/removeDeviceConfig`, {
			params: {
				selectedConfig: selectedConfig,
				selectedDevice: selectedDevice,
			},
		})
		.then((res) => res.data)
		.catch(console.log);
}

export default removeDeviceConfig;
