const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  name: String,
  mobilePhone: String,
  pan: String,
  creditScore: Number,
  totalAccounts: Number,
  activeAccounts: Number,
  closedAccounts: Number,
  currentBalance: Number,
  securedAmount: Number,
  unsecuredAmount: Number,
  last7DaysEnquiries: Number,
  creditCards: [String],
  banks: [String],
  addresses: [String],
  accountNumbers: [String],
  amountOverdue: Number,
});

module.exports = mongoose.model("Report", ReportSchema);
