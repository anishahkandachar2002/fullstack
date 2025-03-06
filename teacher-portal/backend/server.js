const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); // ✅ Require path at the top
const connectDB = require("./config");
const teacherRoutes = require("./routes");
const subjectRoutes = require("./routes/subjects"); 
const noteRoutes = require("./routes/notes");


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static files (Fixes Cannot GET /public/... error)
app.use("/public", express.static(path.join(__dirname, "public")));

// Teacher Routes
app.use("/api/teachers", teacherRoutes);

// Subject Routes
app.use("/api/subjects", subjectRoutes);

// ✅ Notes Routes
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
