const express = require("express");
const router = express.Router();

const dragonsRoutes = require("./dragons");
const battleRoutes = require("./battle");

router.use("/dragons", dragonsRoutes);
router.use("/battle", battleRoutes);

module.exports = router;
