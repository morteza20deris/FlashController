// const USB = require("usb");
const { SerialPort } = require("serialPort");
module.exports = async () => {
	// const devices = USB.getDeviceList();
	// devices.forEach((device) => {
	// 	console.log(`Device: ${device.deviceDescriptor.idVendor}:
	//                      ${device.deviceDescriptor.idProduct}`);
	// 	console.log(`  Type: ${device.deviceDescriptor.iProduct}`);
	// 	console.log(`  Bus: ${device.busNumber}`);
	// 	console.log(`  Address: ${device.deviceAddress}`);
	// 	console.log(`  Ports: ${device.portNumbers}`);
	// 	console.log(`  Manufacturer:
	//     ${device.deviceDescriptor.iManufacturer}`);
	// 	console.log(`  Serial Number:
	//     ${device.deviceDescriptor.iSerialNumber}`);
	// });

	return await SerialPort.list().then(function (data) {
		debugger;

		return data.map((item) => ({
			name: item.friendlyName,
			portName: item.path,
		}));
	});
};
