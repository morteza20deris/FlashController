import axios from "axios";
import { LocalServerAddress } from "./constants";

export default function getLocalPorts() {
	return axios.get(`${LocalServerAddress}/apiServices/usb`).then((e) => {
		return e.data;
	});
}
