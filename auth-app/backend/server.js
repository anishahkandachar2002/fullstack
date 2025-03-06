const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");


const MONGO_URI = "mongodb+srv://anisha:anisha010@cluster0.iia7z.mongodb.net/auth-app?retryWrites=true&w=majority";
const SECRET_KEY = "your_secure_secret"; 
const PORT = 5000;


const app = express();
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cors());


mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


const UserSchema = new mongoose.Schema({
  srn: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);


const validateSRN = (srn) => {
  const srnPattern = /^PES[0-9](PG|UG)[0-9]{2}[A-Z]{2}[0-9]{3}$/;
  return srnPattern.test(srn);
};


app.post("/register", async (req, res) => {
  try {
    const { srn, email, password } = req.body;

    if (!srn || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validateSRN(srn)) {
      return res.status(400).json({ error: "Invalid SRN format! Example: PES1UG19EC123" });
    }

    const existingUser = await User.findOne({ $or: [{ srn }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        error: existingUser.srn === srn ? "SRN already exists!" : "Email already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ srn, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "🎉 User registered successfully!" });
  } catch (err) {
    console.error("❌ Registration Error:", err);

    if (err.code === 11000) {
      if (err.keyPattern.srn) return res.status(400).json({ error: "SRN already exists!" });
      if (err.keyPattern.email) return res.status(400).json({ error: "Email already exists!" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { srn, password } = req.body;

    if (!srn || !password) {
      return res.status(400).json({ error: "SRN and password are required" });
    }

    const user = await User.findOne({ srn });
    if (!user) {
      return res.status(400).json({ error: "User not found! Please register first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid SRN or password!" });
    }

    const token = jwt.sign({ srn: user.srn, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "✅ Login successful!", token });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/dashboard", dashboardRoutes);

const teacherRoutes = require("./routes/teacherRoutes");
app.use("/teacher", teacherRoutes);


app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
