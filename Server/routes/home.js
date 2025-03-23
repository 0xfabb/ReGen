const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("HomePage");
});

router.get("/user", (req, res) => {
  res.json({
    name: "Vansh",
    points: 245,
    rank: "Eco Warrior",
    nextRank: "Sustainability Champion",
    pointsToNextRank: 55,
    wasteStats: {
      recycled: 124,
      composted: 68,
      reduced: 37,
    },
  });
});


module.exports = router;
