const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 200 },
  degree: { type: String, required: true },
  university: { type: String, required: true },
  phone: { type: Number, required: true },
  regNo: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});
module.exports = studentSchema;
