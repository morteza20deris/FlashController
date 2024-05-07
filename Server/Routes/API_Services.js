const express = require("express");
const test = require("../Services/test");
const remoteFlashController = require("../Services/remoteFlashController");
const router = express.Router();

router.post("/firstBase", (req, res) =>
	res.send([req.body, req.params, req.query])
);

router.get("/local", async (req, res) => res.send(await test(req.query)));
router.get("/remote", async (req, res) =>
	res.send(await remoteFlashController(req.query))
);

module.exports = router;
