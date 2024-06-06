const express = require("express");
const router = express.Router();

const getPromptDataFree = require("../controllers/freeReportController");
router.post("/getPromptDataFree", getPromptDataFree);

const getPromptDataPaid = require("../controllers/paidReportController");
router.post("/getPromptDataPaid", getPromptDataPaid);

module.exports = router;