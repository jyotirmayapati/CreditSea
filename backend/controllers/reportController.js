const fs = require("fs");
const xml2js = require("xml2js");
const Report = require("../models/Report");

// Upload and parse XML file
const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const xmlData = req.file.buffer.toString("utf-8");
    const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true });

    parser.parseString(xmlData, async (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error parsing XML" });
      }

      // Ensure correct data extraction
      const reportData = result?.Report || {};
      const basicDetails = reportData?.BasicDetails || {};
      const summary = reportData?.Summary || {};
      const creditAccounts = reportData?.CreditAccounts || {};

      const extractedData = {
        name: basicDetails?.Name || "N/A",
        mobilePhone: basicDetails?.MobilePhone || "N/A",
        pan: basicDetails?.PAN || "N/A",
        creditScore: parseInt(reportData?.CreditScore) || 0,
        totalAccounts: parseInt(summary?.TotalAccounts) || 0,
        activeAccounts: parseInt(summary?.ActiveAccounts) || 0,
        closedAccounts: parseInt(summary?.ClosedAccounts) || 0,
        currentBalance: parseInt(summary?.CurrentBalance) || 0,
        securedAmount: parseInt(summary?.SecuredAmount) || 0,
        unsecuredAmount: parseInt(summary?.UnsecuredAmount) || 0,
        last7DaysEnquiries: parseInt(summary?.Last7DaysEnquiries) || 0,
        creditCards: creditAccounts?.CreditCard?.map((c) => c.Bank) || [],
        banks: creditAccounts?.CreditCard?.map((c) => c.Bank) || [],
        addresses: creditAccounts?.Address || [],
        accountNumbers: creditAccounts?.AccountNumber || [],
        amountOverdue: parseInt(creditAccounts?.AmountOverdue) || 0,
      };

      // Save to MongoDB
      const report = new Report(extractedData);
      await report.save();

      res.json({ message: "File uploaded and data saved successfully", data: report });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reports
const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadReport, getReports };
