const scoreController  = require("../controllers/score.js");

const express = require("express");
const router = express.Router();

router.post('/postScore',scoreController.postScore);
router.post('/getLeaderboardData',scoreController.getLeaderboardData);
router.post('/getTopUsers',scoreController.getTopUsers);

module.exports = router;
