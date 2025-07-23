const express = require("express");
const router = express.Router();
const Student = require("../models/student.js");

// POST /api/students - Add new student
router.post("/addstudent", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/students - Get all students
router.get("/getstudents", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
