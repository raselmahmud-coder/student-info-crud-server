const express = require("express");
// const bcrypt = require("bcrypt");
// const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");
const studentSchema = require("../schemas/studentSchema");
const router = express.Router();
const Student = mongoose.model("Student", studentSchema);

router.post("/", async (req, res) => {
  const { name, degree, university, regNo, phone } = req.body;
  if ((name && degree, university && regNo && +phone.length === 11)) {
    try {
      const student = new Student({ ...req.body });
      await student.save();
      res.status(200).send("successfully save your record");
    } catch (error) {
      //   console.log("error occurred", error);
      res.status(500).send("record save was failed");
    }
  } else {
    res.status(404).send("invalid information");
  }
});

// update request by id
router.put("/", async (req, res) => {
  const { id, name, degree, university, regNo, phone } = req.body;
  if ((id || name || degree, university || regNo || phone)) {
    try {
      const result = await Student.findOneAndUpdate(
        { _id: id },
        { $set: { name, degree, university, regNo, phone } },
        { new: true }
      );

      res.status(200).send(result);
    } catch (error) {
      console.log("error occurred", error);
      res.status(500).send("request failed to update");
    }
  } else {
    res.status(404).send("invalid information");
  }
});

// read all students
router.get("/", async (req, res) => {
  try {
    const result = await Student.find({});
    res.status(200).send(result);
  } catch (error) {
    // console.log("error occurred", error);
    res.status(404).send("not found any data");
  }
});
// delete student by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const result = await Student.deleteOne({ _id: id });
      res.status(200).send(result);
    } catch (error) {
      // console.log("error occurred", error);
      res.status(500).send("sorry! can't delete");
    }
  } else {
    res.status(404).send("please give an id");
  }
});

module.exports = router;
