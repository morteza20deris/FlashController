const express = require("express");
const test = require("../Services/test");
const remoteFlashController = require("../Services/remoteFlashController");
const setLocalConnection = require("../Services/setLocalConnection");
const localWriteToRegisters = require("../Services/localWriteToRegisters");
const getUSBDevices = require("../Services/getUSBDevices");
const router = express.Router();

router.post("/firstBase", (req, res) =>
	res.send([req.body, req.params, req.query])
);

router.get("/local", async (req, res) =>
	res.send(await setLocalConnection(req.query, localWriteToRegisters))
);
router.get("/remote", async (req, res) =>
	res.send(await remoteFlashController(req.query))
);
router.get("/usb", async (req, res) => res.send(await getUSBDevices()));

module.exports = router;
