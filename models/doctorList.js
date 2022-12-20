const mongoose = require("mongoose");

const doctorListSchema = new mongoose.Schema({
  docName: String,
  email: String,
  degree: String,
  wdays: String,
  fee: Number,
  wIds: { type: Array, default: [] },
});

module.exports = mongoose.model("DoctorList", doctorListSchema);
