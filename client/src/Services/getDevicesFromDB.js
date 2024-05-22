import axios from "axios";
import { LocalServerAddress } from "./constants";

function getDevicesFromDB() {
	return new Promise((resolve, reject) => {
		axios
			.get(`${LocalServerAddress}/apiServices/getDevices`)
			.then((res) => resolve(res.data));
	});
}

export default getDevicesFromDB;
