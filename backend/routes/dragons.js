const express = require("express");
const dragons = require("../dragons.json");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.json(dragons);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dragons" });
  }
});

module.exports = router;
