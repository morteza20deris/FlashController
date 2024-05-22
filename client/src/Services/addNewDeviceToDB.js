import axios from "axios";
import { LocalServerAddress } from "./constants";
async function addNewDeviceToDB(deviceName) {
	return await axios
		.get(`${LocalServerAddress}/apiServices/addNewDevice`, {
			params: { deviceName: deviceName },
		})
		.then((res) => JSON.parse(res.data))
		.catch((err) => console.log(err));
}

export default addNewDeviceToDB;
