const express = require("express");
const { uploadReport, getReports } = require("../controllers/reportController");
const multer = require("multer");

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload XML file and extract data
router.post("/upload", upload.single("xmlFile"), uploadReport);

// Get all reports
router.get("/", getReports);

module.exports = router;
