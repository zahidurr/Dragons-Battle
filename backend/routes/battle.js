const express = require("express");
const dragons = require("../dragons.json");
const validateDragonIds = require("../middleware/validateDragonIds");

const router = express.Router();

let battleHistory = [];

router.post("/", validateDragonIds, (req, res) => {
  try {
    const { dragon1, dragon2 } = req;

    let dragon1Health = 100;
    let dragon2Health = 100;

    while (dragon1Health > 0 && dragon2Health > 0) {
      const dragon1Damage = Math.floor(Math.random() * dragon2.strength);
      const dragon2Damage = Math.floor(Math.random() * dragon1.strength);

      dragon1Health -= dragon1Damage;
      dragon2Health -= dragon2Damage;
    }

    const winner = dragon1Health > 0 ? dragon1.name : dragon2.name;
    battleHistory.push(winner);

    res.json({ winner });
  } catch (error) {
    res.status(500).json({ error: "Failed to process battle" });
  }
});

router.get("/history", (req, res) => {
  try {
    res.json(battleHistory);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch battle history" });
  }
});

router.post("/probability", validateDragonIds, (req, res) => {
  try {
    const { dragon1, dragon2 } = req;
    const totalBattles = battleHistory.length;

    const dragon1Wins = battleHistory.filter(
      (winner) => winner === dragon1.name
    ).length;
    const dragon2Wins = battleHistory.filter(
      (winner) => winner === dragon2.name
    ).length;

    const dragon1Probability =
      totalBattles === 0 ? 0 : (dragon1Wins / totalBattles) * 100;
    const dragon2Probability =
      totalBattles === 0 ? 0 : (dragon2Wins / totalBattles) * 100;

    res.json({
      dragon1Probability,
      dragon2Probability,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate probability" });
  }
});

module.exports = router;
