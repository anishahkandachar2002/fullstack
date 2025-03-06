import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "../models/Teacher.js";

const router = express.Router();

// ✅ Teacher Login API
router.post("/login", async (req, res) => {
  try {
    const { employeeID, password } = req.body;
    const teacher = await Teacher.findOne({ employeeID });

    if (!teacher) return res.status(400).json({ message: "Teacher not found" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: teacher._id }, "your_secret_key", { expiresIn: "1d" });

    res.json({ token, teacher: { _id: teacher._id, name: teacher.name, employeeID: teacher.employeeID } });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

// ✅ Fetch Teacher Details Without Middleware
router.get("/me", async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied" });

    const decoded = jwt.verify(token.split(" ")[1], "your_secret_key"); // Verify Token
    const teacher = await Teacher.findById(decoded.id).select("-password"); // Fetch teacher without password

    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.json(teacher);
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
});

export default router;
