const express = require("express");
const setLocalConnection = require("../Services/setLocalConnection");
const localWriteToRegisters = require("../Services/localWriteToRegisters");
const getUSBDevices = require("../Services/getUSBDevices");
const addNewDeviceToDB = require("../Services/addNewDeviceToDB");
const removeDeviceFromDB = require("../Services/removeDeviceFromDB");
const getDevicesFromDB = require("../Services/getDevicesFromDB");
const addNewDeviceConfig = require("../Services/addNewDeviceConfig");
const removeDeviceConfig = require("../Services/removeDeviceConfig");
const remoteTCPFlashController = require("../Services/remoteTCPFlashController");
const remoteTelnetFlashController = require("../Services/remoteTelnetFlashController");
const router = express.Router();

router.post("/firstBase", (req, res) =>
	res.send([req.body, req.params, req.query])
);

router.get("/localFlashController", async (req, res) =>
	res.send(await setLocalConnection(req.query, localWriteToRegisters))
);
router.get("/remoteTCPFlashController", async (req, res) =>
	res.send(await remoteTCPFlashController(req.query))
);

router.get("/remoteTelnetFlashController", async (req, res) =>
	res.send(await remoteTelnetFlashController(req.query))
);

router.get("/usb", async (req, res) => res.send(await getUSBDevices()));

router.get("/addNewDevice", async (req, res) =>
	res.json(await addNewDeviceToDB(req.query))
);

router.get("/removeDevice", async (req, res) =>
	res.send(await removeDeviceFromDB(req.query))
);

router.get("/addNewDeviceConfig", async (req, res) =>
	res.send(await addNewDeviceConfig(req.query))
);

router.get("/removeDeviceConfig", async (req, res) =>
	res.send(await removeDeviceConfig(req.query))
);

router.get("/getDevices", async (req, res) =>
	res.send(await getDevicesFromDB())
);

module.exports = router;
