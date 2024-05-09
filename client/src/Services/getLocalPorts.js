import axios from "axios";

export default function getLocalPorts() {
	return axios.get("http://localhost:3001/apiservices/usb").then((e) => {
		// console.log(e.data);
		return e.data;
	});
}
